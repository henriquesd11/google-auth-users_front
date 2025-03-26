<script setup>
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

<style lang="scss" scoped>
$primary-color: #3498db;
$secondary-color: #2ecc71;
$background-color: #f5f5f5;
$table-header-bg: #f4f4f4;
$table-border-color: #ddd;
$table-row-hover-bg: #e9e9e9;
$button-bg: $primary-color;
$button-color: #fff;
$button-hover-bg: $primary-color;
$button-disabled-bg: $primary-color;

// Mixin for table styles
@mixin table-styles {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  th, td {
    padding: 10px;
    border: 1px solid $table-border-color;
    text-align: left;
  }

  th {
    background-color: $table-header-bg;
    color: $primary-color;
    font-weight: bold;
  }

  tr {
    &:hover {
      background-color: $table-row-hover-bg;
    }
  }
}

.table-container {
  overflow-x: auto;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  table {
    @include table-styles;
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;

    button {
      background-color: $button-bg;
      color: $button-color;
      border: none;
      padding: 10px 20px;
      margin: 0 5px;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: $button-hover-bg;
      }

      &:disabled {
        background-color: $button-disabled-bg;
        cursor: not-allowed;
      }
    }

    span {
      margin: 0 10px;
      color: $primary-color;
    }
  }
}
</style>

