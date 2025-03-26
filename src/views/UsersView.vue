<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useUserStore } from '../stores/users.ts';
import LoadingSpinner from "@/components/LoadingSpinner.vue";

export default defineComponent({
  name: 'UsersView',
  components: {LoadingSpinner},
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  data() {
    return {
      filters: {
        name: '',
        cpf: '',
      },
    };
  },
  mounted() {
    this.userStore.fetchUsers();
  },
  methods: {
    filterUsers(withParams = false) {
      if (!withParams) {
        this.filters.name = '';
        this.filters.cpf = '';
      }
      this.userStore.filterUsers(this.filters.name, this.filters.cpf);
    },
  },
});
</script>

<template>
  <div class="users">
    <h1>Usuários Cadastrados</h1>
    <div class="filters">
      <input v-model="filters.name" placeholder="Filtrar por nome"/>
      <input v-model="filters.cpf" placeholder="Filtrar por CPF"/>
      <button type="button" class="recording-btn" @click="filterUsers(true)">Pesquisar</button>
      <button type="button" class="recording-btn" @click="filterUsers()">Limpar</button>
    </div>
    <loading-spinner :isLoading="userStore.loading" />
    <table v-if="!userStore.loading">
      <thead>
      <tr>
        <th>Nome</th>
        <th>Data de Nascimento</th>
        <th>CPF</th>
        <th>Email</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in userStore.users.data.data" :key="user.id">

        <td>{{ user.name }}</td>
        <td>{{ user.birth_date }}</td>
        <td>{{ user.cpf }}</td>
        <td>{{ user.email }}</td>

      </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.users {
  padding: 20px;

  .filters {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;

    input {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 10px;
      border: 1px solid #ddd;
      text-align: left;
    }

    th {
      background-color: #f4f4f4;
    }
  }
}
</style>
