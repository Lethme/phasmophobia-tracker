<template></template>

<script lang="ts" setup>
import {onMounted} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();

onMounted(() => {
    localStorage.setItem("phasmotracker:show_config_params", "true");
    router.push("/");
});
</script>