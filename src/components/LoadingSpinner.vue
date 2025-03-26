<script setup lang="ts">
import '../styles/loadingSpinner.scss';
import { defineProps } from 'vue';
const props = defineProps<{
  isLoading: boolean;
}>();

</script>

<template>
  <div class="loading" v-if="props.isLoading">
    <div class="spinner"></div> Carregando...
  </div>
</template>
