<script setup>
import '../styles/table.scss';
import { defineProps, defineEmits } from "vue";
import { formatCpf, formatDate } from '@/utils/formatters';

defineProps({
  headers: Array,
  data: Array,
  pagination: Object,
});
const emit = defineEmits(["fetch-data"]);

const changePage = (page) => {
  emit("fetch-data", page);
};
</script>

<template>
  <div class="table-container">
    <table>
      <thead>
      <tr>
        <th v-for="header in headers" :key="header.value">{{ header.text }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in data" :key="index">
        <td v-for="header in headers" :key="header.value">
          {{ header.value === 'cpf' ? formatCpf(item[header.value]) : header.value === 'birth_date' ? formatDate(item[header.value]) : item[header.value] }}
        </td>
      </tr>
      </tbody>
    </table>
    <div class="pagination">
      <button @click="changePage(pagination.current_page - 1)" :disabled="pagination.current_page === 1">Anterior</button>
      <span>Página {{ pagination.current_page }} de {{ pagination.last_page }}</span>
      <button @click="changePage(pagination.current_page + 1)" :disabled="pagination.current_page === pagination.last_page">Próximo</button>
    </div>
  </div>
</template>

