<template>
    <div class="home flex flex-col gap-4 py-4">
        <div class="container w-full flex flex-row justify-center gap-6 pb-4">
            <p class="text-5xl font-bold tracking-tight text-center">Phasmophobia Evidence Tracker</p>
        </div>
        <div v-if="showParams" class="container w-full flex flex-col gap-4">
            <div class="container flex flex-col gap-4">
                <DataTable :value="params">
                    <Column header="Parameter">
                        <template #body="{ data }">
                            <span>{{ data[0] }}</span>
                        </template>
                    </Column>
                    <Column header="State">
                        <template #body="{ data }">
                            <InputSwitch :modelValue="data[1].value"
                                         @click="params.get(data[0]).value = !data[1].value"></InputSwitch>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
        <div class="container w-full flex flex-col md:flex-row gap-6">
            <div class="container w-full md:w-1/2 flex flex-col gap-4">
                <DataTable :value="Object.keys(evidenceNames)" tableStyle="width: 100%"
                           :row-class="evidenceTableRowClass">
                    <Column header="Evidence">
                        <template #body="{ data }">
                            <span>{{ evidenceNames[data] }}</span>
                        </template>
                    </Column>
                    <Column header="Confirmed">
                        <template #body="{ data }">
                            <Checkbox
                                @change="selectedEvidenceChange(+data)"
                                :modelValue="selectedEvidences.includes(+data)"
                                :binary="true"
                                :disabled="(ghostsBySelectedEvidence.length && ghostsBySelectedEvidence.every(g => !g.evidence.includes(+data))) || ruledOutEvidences.includes(+data)"
                            ></Checkbox>
                        </template>
                    </Column>
                    <Column header="Ruled Out">
                        <template #body="{ data }">
                            <Checkbox
                                @change="ruledOutEvidenceChange(+data)"
                                :modelValue="ruledOutEvidences.includes(+data)"
                                :binary="true"
                                :disabled="(ghostsBySelectedEvidence.length && ghostsBySelectedEvidence.every(g => !g.evidence.includes(+data))) || selectedEvidences.includes(+data)"
                            ></Checkbox>
                        </template>
                    </Column>
                </DataTable>
                <Button
                    @click="selectedEvidences = []; ruledOutEvidences = []"
                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Reset
                </Button>
                <div class="timer flex w-full">
                    <Button
                        :icon="{
                            'pi': true,
                            'pi-play': !timerState,
                            'pi-stop': timerState,
                        }"
                        aria-label="Submit"
                        class="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        @click="timerState = !timerState"
                    />
                    <p class="text-2xl font-bold tracking-tight m-0 p-0 ml-3" style="line-height: unset">{{ timerTime }}</p>
                </div>
            </div>
            <div class="container flex flex-col gap-4 w-full md:w-1/2">
                <p class="text-4xl font-bold tracking-tight">{{ selectedGhost.name }}</p>
                <div class="description">
                    <p class="text-1xl tracking-tight" v-for="descLine in selectedGhost.description" :key="descLine">
                        {{ descLine }}
                    </p>
                </div>
                <p class="text-4xl font-bold tracking-tight">Strength</p>
                <div class="strength">
                    <p class="text-1xl tracking-tight" v-for="strengthLine in selectedGhost.strength" :key="strengthLine">
                        {{ strengthLine }}
                    </p>
                </div>
                <p class="text-4xl font-bold tracking-tight">Weakness</p>
                <div class="weakness">
                    <p class="text-1xl tracking-tight" v-for="weakLine in selectedGhost.weakness" :key="weakLine">
                        {{ weakLine }}
                    </p>
                </div>
                <p class="text-4xl font-bold tracking-tight">Speed</p>
                <div class="speed">
                    <p class="text-1xl tracking-tight" v-if="selectedGhost.speed.min === selectedGhost.speed.max">
                        {{ selectedGhost.speed.min.toPrecision(2) }} m/s
                    </p>
                    <p class="text-1xl tracking-tight" v-else>
                        <span>{{ selectedGhost.speed.min.toPrecision(2) }} m/s</span>
                        &nbsp;-&nbsp;
                        <span>{{ selectedGhost.speed.max.toPrecision(2) }} m/s</span>
                    </p>
                </div>
            </div>
        </div>
        <div class="container w-full flex flex-col gap-4">
            <span class="p-input-icon-left flex flex-row w-full">
                <i class="pi pi-search"/>
                <InputText
                    :model-value="ghostNameSearch"
                    @update:modelValue="updateGhostNameSearch"
                    :pt="{
                        root: { class: 'w-full' }
                    }"
                    placeholder="Start typing ghost name..."
                />
            </span>
        </div>
        <div class="container w-full">
            <DataTable v-model:selection="selectedGhost" selectionMode="single" dataKey="name" :metaKeySelection="false"
                       :value="ghosts" tableStyle="width: 100%" :row-class="ghostTableRowClass">
                <Column header="Ghost">
                    <template #body="{ data }">
                        <span v-if="params.get('useCheckIconsForGhostEvidence').value"
                              v-tooltip.top="data.evidence.map(e => evidenceNames[e]).join('\n')">{{ data.name }}</span>
                        <span v-else>{{ data.name }}</span>
                    </template>
                </Column>
                <Column v-for="evidence in Object.keys(evidenceNames)" :key="evidence"
                        :header="evidenceNames[evidence]">
                    <template #body="{ data }">
                        <i
                            v-if="params.get('useCheckIconsForGhostEvidence').value && data.evidence.includes(+evidence)"
                            v-tooltip.top="evidenceNames[evidence]"
                            :class="{
                                'p-highlight': selectedEvidences.includes(+evidence),
                                'pi': true,
                                'pi-check': true,
                                'ghost-evidence': true,
                            }"
                        ></i>
                        <span
                            v-if="!params.get('useCheckIconsForGhostEvidence').value && data.evidence.includes(+evidence)"
                            :class="{
                                'p-highlight': selectedEvidences.includes(+evidence),
                                'ghost-evidence': true,
                            }"
                        >
                            {{ evidenceNames[evidence] }}
                        </span>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {EvidenceNames, IGhost, Evidence} from "@/store/modules/ghost-types/types";
import evidenceEnum from "@/store/modules/ghost-types/types/evidence.enum";
import {computed, onMounted, Ref, ref, watch} from "vue";
import {useStore} from "vuex";

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from "primevue/button";
import Checkbox from 'primevue/checkbox';
import InputSwitch from 'primevue/inputswitch';
import InputText from "primevue/inputtext";
import {debounce} from "@/utils/debounce";

const store = useStore();

const ghostNameSearch = ref("");
const updateGhostNameSearch = debounce((ghostName: string) => {
    ghostNameSearch.value = ghostName;
}, 300);

const showParams = computed(() => localStorage.getItem("phasmotracker:show_config_params") == "true");

const params = new Map<string, Ref<boolean>>([
    ["useCheckIconsForGhostEvidence", ref(localStorage.getItem("phasmotracker:useCheckIconsForGhostEvidence") == "true")],
    ["sortGhostsByEvidenceMatch", ref(localStorage.getItem("phasmotracker:sortGhostsByEvidenceMatch") == "true")],
]);

for (const [key, param] of params.entries()) {
    watch(() => param.value, (v) => {
        localStorage.setItem(`tracker:${key}`, String(v));
    });
}

const ghosts = computed<Array<IGhost>>(() => {
    const g = (store.getters.ghosts as Array<IGhost>).sort((a, b) => a.name.localeCompare(b.name));

    if (params.get("sortGhostsByEvidenceMatch")?.value) {
        g.sort((a, b) => {
            const aCondition = selectedEvidences.value.some(e => !a.evidence.includes(e)) || ruledOutEvidences.value.some(e => a.evidence.includes(e)) || !a.name.toLowerCase().includes(ghostNameSearch.value.toLowerCase());
            const bCondition = selectedEvidences.value.some(e => !b.evidence.includes(e)) || ruledOutEvidences.value.some(e => b.evidence.includes(e)) || !b.name.toLowerCase().includes(ghostNameSearch.value.toLowerCase());

            if (aCondition && !bCondition) {
                return 1; // Move ghost 'a' up
            } else if (!aCondition && bCondition) {
                return -1; // Move ghost 'b' up
            } else {
                // Both ghosts have the same number of selected evidences, sort alphabetically
                return a.name.localeCompare(b.name);
            }
        });
    }

    return g;
});

const ghostsBySelectedEvidence = computed(() => {
    return (store.getters.ghosts as Array<IGhost>)
        .filter(g => !selectedEvidences.value.some(e => !g.evidence.includes(e)))
});

const evidenceNames = computed<EvidenceNames>(() => store.getters.evidenceNames);
const selectedEvidences = ref<Array<Evidence>>([]);
const ruledOutEvidences = ref<Array<Evidence>>([]);

const selectedEvidenceChange = (evidence: Evidence) => {
    if (!selectedEvidences.value.includes(evidence)) {
        selectedEvidences.value = [...selectedEvidences.value, evidence];
    } else {
        selectedEvidences.value = selectedEvidences.value.filter(e => e !== evidence);
    }
}

const ruledOutEvidenceChange = (evidence: Evidence) => {
    if (!ruledOutEvidences.value.includes(evidence)) {
        ruledOutEvidences.value = [...ruledOutEvidences.value, evidence];
    } else {
        ruledOutEvidences.value = ruledOutEvidences.value.filter(e => e !== evidence);
    }
}

const selectedGhost = ref<IGhost>(ghosts.value[0]);
const previousSelectedGhost = ref<IGhost>(selectedGhost.value);

watch(() => selectedGhost.value, (ghost) => {
    if (ghost) {
        previousSelectedGhost.value = ghost;
    } else {
        selectedGhost.value = previousSelectedGhost.value;
    }
});

const ghostTableRowClass = (ghost: IGhost) => {
    return {
        "evidence-mismatch": selectedEvidences.value.some(e => !ghost.evidence.includes(e)) || ruledOutEvidences.value.some(e => ghost.evidence.includes(e)) || !ghost.name.toLowerCase().includes(ghostNameSearch.value.toLowerCase()),
    }
}

const evidenceTableRowClass = (evidence: Evidence) => {
    return {
        "evidence-mismatch": ghostsBySelectedEvidence.value.length && ghostsBySelectedEvidence.value.every(g => !g.evidence.includes(+evidence))
    }
}

function formatTimeUnits(unit: number) {
    return unit < 10 ? '0' + unit : unit;
}

function getFormattedTime(duration: number) {
    const hours = formatTimeUnits(Math.floor(duration / 3600));
    const minutes = formatTimeUnits(Math.floor((duration % 3600) / 60));
    const seconds = formatTimeUnits(Math.round(duration % 60)); // Round seconds to the nearest integer

    return `${hours}:${minutes}:${seconds}`;
}

function calculateTimeDifference(startDate: Date, endDate: Date) {
    const diffInSeconds = Math.abs((endDate.getTime() - startDate.getTime()) / 1000);
    return getFormattedTime(diffInSeconds);
}

const timerState = ref(false);
const timerIntervalId = ref<number | null>(null);
const timerTimestamp = ref<Date | null>(null);
const timerTime = ref("00:00:00");

const startTimer = async () => {
    timerTimestamp.value = new Date();
    timerTime.value = "00:00:00";
    timerIntervalId.value = setInterval(() => {
        timerTime.value = calculateTimeDifference(timerTimestamp.value!, new Date())
    }, 1000);
}

const stopTimer = async () => {
    if (timerIntervalId.value) {
        timerTimestamp.value = null;
        clearInterval(timerIntervalId.value);
    }
}

watch(() => timerState.value, (state) => state ? startTimer() : stopTimer());

const log = console.log;
</script>

<style lang="less">
tr {
    transition: opacity .2s ease;

    &.evidence-mismatch {
        opacity: .3;
    }

    &:not(.evidence-mismatch) .ghost-evidence.p-highlight {
        color: #b19df7;
    }
}
</style>
