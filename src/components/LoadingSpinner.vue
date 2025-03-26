<script setup lang="ts">
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

<style lang="scss" scoped>
$loading-background: rgba(0, 0, 0, 0.5);
$loading-spinner-color: #fff;
$border-spinner-color: rgba(255, 255, 255, 0.3);

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $loading-background;
  color: $loading-spinner-color;
  font-size: 1rem;
  z-index: 1000;

  .spinner {
    border: 6px solid $border-spinner-color;
    border-top: 6px solid $loading-spinner-color;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    animation: spin 1s linear infinite;
    margin-right: 10px;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
