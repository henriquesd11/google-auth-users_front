<script setup lang="ts">
import '../styles/user.scss';
import { ref, onMounted } from 'vue';
import { useUserStore } from '../stores/users.js';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import Table from '@/components/Table.vue';

// Instanciações
const userStore = useUserStore();

// Estado dos filtros
const filters = ref({
  name: '',
  cpf: '',
});

// Cabeçalhos da tabela
const headers = [
  { text: 'Nome', value: 'name' },
  { text: 'Data de Nascimento', value: 'birth_date' },
  { text: 'CPF', value: 'cpf' },
  { text: 'Email', value: 'email' },
];

// Métodos
const filterUsers = (withParams = false, page: number = 1) => {
  if (!withParams) {
    filters.value.name = '';
    filters.value.cpf = '';
  }
  userStore.filterUsers(filters.value.name, filters.value.cpf, page);
};

const pagination = (page: number) => {
  filterUsers(true, page);
};

// Carrega os usuários ao montar o componente
onMounted(() => {
  userStore.fetchUsers();
});
</script>

<template>
  <div class="users">
    <loading-spinner :isLoading="userStore.loading" />
    <div class="header">
      <h1>Usuários Cadastrados</h1>
    </div>
    <div class="filters">
      <input v-model="filters.name" placeholder="Filtrar por nome" />
      <input v-model="filters.cpf" placeholder="Filtrar por CPF" />
      <button type="button" class="recording-btn" @click="filterUsers(true)">Pesquisar</button>
      <button type="button" class="recording-btn" @click="filterUsers()">Limpar</button>
    </div>
    <div class="total-records">
      Total de Registros: {{ userStore.users.total }}
    </div>
    <Table
      v-if="!userStore.loading"
      :headers="headers"
      :data="userStore.users.data"
      :pagination="userStore.users"
      @fetch-data="pagination($event)"
    ></Table>
  </div>
</template>

<style lang="scss" scoped>
$primary-color: #3498db;
$secondary-color: #2ecc71;
$input-border-color: #ccc;
$input-border-radius: 4px;

.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  input {
    width: 50%;
    padding: 8px;
    border: 1px solid $input-border-color;
    border-radius: $input-border-radius;
    flex: 1;
  }
}
.total-records {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-size: 1.2rem;
  color: $primary-color;
}
</style>
