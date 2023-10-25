<template>
    <div class="home flex flex-col gap-4">
        <div class="container w-full flex flex-row justify-center gap-6 pb-4">
            <p class="text-5xl font-bold tracking-tight">Phasmophobia Evidence Tracker</p>
        </div>
        <div class="container w-full flex flex-col gap-4">
            <div class="container flex flex-col gap-4">
                <DataTable :value="params">
                    <Column header="Parameter">
                        <template #body="{ data }">
                            <span>{{ data[0] }}</span>
                        </template>
                    </Column>
                    <Column header="State">
                        <template #body="{ data }">
                            <InputSwitch :modelValue="data[1].value" @click="params.get(data[0]).value = !data[1].value"></InputSwitch>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
        <div class="container w-full flex flex-row gap-6">
            <div class="container w-1/2 flex flex-col gap-4">
                <DataTable :value="Object.keys(evidenceNames)" tableStyle="width: 100%" :row-class="evidenceTableRowClass">
                    <Column header="Evidence">
                        <template #body="{ data }">
                            <span>{{ evidenceNames[data] }}</span>
                        </template>
                    </Column>
                    <Column header="Selected">
                        <template #body="{ data }">
                            <Checkbox
                                @change="selectedEvidenceChange(+data)"
                                :modelValue="selectedEvidences.includes(+data)"
                                :binary="true"
                                :disabled="ghostsBySelectedEvidence.length && ghostsBySelectedEvidence.every(g => !g.evidence.includes(+data))"
                            ></Checkbox>
                        </template>
                    </Column>
                </DataTable>
                <Button
                    @click="selectedEvidences = []"
                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Clear
                </Button>
            </div>
            <div class="container flex flex-col gap-4 w-1/2">
                <p class="text-4xl font-bold tracking-tight">{{ selectedGhost.name }}</p>
                <div class="description">
                    <p class="text-1xl tracking-tight" v-for="descLine in selectedGhost.description" :key="descLine">{{ descLine }}</p>
                </div>
                <p class="text-4xl font-bold tracking-tight">Strength</p>
                <div class="strength">
                    <p class="text-1xl tracking-tight" v-for="strengthLine in selectedGhost.strength" :key="strengthLine">{{ strengthLine }}</p>
                </div>
                <p class="text-4xl font-bold tracking-tight">Weakness</p>
                <div class="weakness">
                    <p class="text-1xl tracking-tight" v-for="weakLine in selectedGhost.weakness" :key="weakLine">{{ weakLine }}</p>
                </div>
            </div>
        </div>
        <div class="container w-full">
            <DataTable v-model:selection="selectedGhost" selectionMode="single" dataKey="name" :metaKeySelection="false" :value="ghosts" tableStyle="width: 100%" :row-class="ghostTableRowClass">
                <Column header="Ghost">
                    <template #body="{ data }">
                        <span v-if="params.get('useCheckIconsForGhostEvidence').value" v-tooltip.top="data.evidence.map(e => evidenceNames[e]).join('\n')">{{ data.name }}</span>
                        <span v-else>{{ data.name }}</span>
                    </template>
                </Column>
                <Column v-for="evidence in Object.keys(evidenceNames)" :key="evidence" :header="evidenceNames[evidence]">
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

const store = useStore();

const ghosts = computed<Array<IGhost>>(() => (store.getters.ghosts as Array<IGhost>).sort((a, b) => {
    const aSelectedEvidenceCount = selectedEvidences.value.filter(e => a.evidence.includes(e)).length;
    const bSelectedEvidenceCount = selectedEvidences.value.filter(e => b.evidence.includes(e)).length;

    if (aSelectedEvidenceCount > bSelectedEvidenceCount) {
        return -1; // Move ghost 'a' up
    } else if (aSelectedEvidenceCount < bSelectedEvidenceCount) {
        return 1; // Move ghost 'b' up
    } else {
        // Both ghosts have the same number of selected evidences, sort alphabetically
        return a.name.localeCompare(b.name);
    }
}));

const ghostsBySelectedEvidence = computed(() => (store.getters.ghosts as Array<IGhost>).filter(g => !selectedEvidences.value.some(e => !g.evidence.includes(e))));

const evidenceNames = computed<EvidenceNames>(() => store.getters.evidenceNames);
const selectedEvidences = ref<Array<Evidence>>([]);
const selectedEvidenceChange = (evidence: Evidence) => {
    if (!selectedEvidences.value.includes(evidence)) {
        selectedEvidences.value = [...selectedEvidences.value, evidence];
    } else {
        selectedEvidences.value = selectedEvidences.value.filter(e => e !== evidence);
    }
}

const selectedGhost = ref<IGhost>(ghosts.value[0]);
const previousSelectedGhost = ref<IGhost>(selectedGhost.value);

const useCheckIconsForGhostEvidence = ref(true);

const params = new Map<string, Ref<boolean>>([
    ["useCheckIconsForGhostEvidence", ref(true)],
]);

watch(() => selectedGhost.value, (ghost) => {
    if (ghost) {
        previousSelectedGhost.value = ghost;
    } else {
        selectedGhost.value = previousSelectedGhost.value;
    }
});

const ghostTableRowClass = (ghost: IGhost) => {
    return {
        "evidence-mismatch": selectedEvidences.value.some(e => !ghost.evidence.includes(e)),
    }
}

const evidenceTableRowClass = (evidence: Evidence) => {
    return {
        "evidence-mismatch": ghostsBySelectedEvidence.value.length && ghostsBySelectedEvidence.value.every(g => !g.evidence.includes(+evidence))
    }
}

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
