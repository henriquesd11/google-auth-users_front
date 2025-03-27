<script setup lang="ts">
import '../styles/user.scss';
import { ref, onMounted } from 'vue';
import { useUserStore } from '../stores/users.js';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import Table from '@/components/Table.vue';
import { formatCpf, unmaskCpf } from '../utils/formatters.js';

// Instanciacoes
const userStore = useUserStore();

// Estado dos filtros
const filters = ref({
  name: '',
  cpf: '',
});

// Cabecalhos da tabela
const headers = [
  { text: 'Nome', value: 'name' },
  { text: 'Data de Nascimento', value: 'birth_date' },
  { text: 'CPF', value: 'cpf' },
  { text: 'Email', value: 'email' },
];

// Metodos
const filterUsers = (withParams = false, page: number = 1) => {
  if (!withParams) {
    filters.value.name = '';
    filters.value.cpf = '';
  }
  userStore.filterUsers(filters.value.name, unmaskCpf(filters.value.cpf), page);
};

const pagination = (page: number) => {
  filterUsers(true, page);
};

const handleCpfInput = (event: Event) => {
  console.log('teste')
  const input = event.target as HTMLInputElement;
  filters.value.cpf = formatCpf(input.value);
}

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
      <input
        v-model="filters.name"
        placeholder="Filtrar por nome"
      />
      <input
        v-model="filters.cpf"
        @input="handleCpfInput"
        placeholder="Filtrar por CPF"
      />
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
