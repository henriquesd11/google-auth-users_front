<script setup lang="ts">
import '../styles/register.scss';
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '../stores/users.js';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { formatCpf, unmaskCpf } from '../utils/formatters.js';

// Instanciações
const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

// Acessa os parâmetros da query string
const email = route.query.email as string;
const googleId = route.query.google_id as string;

// Redireciona se email ou googleId estiverem ausentes
if (!email || !googleId) {
  router.push('/');
}

// Estado do formulário
const form = ref({
  name: '',
  birth_date: '',
  cpf: '',
});

// Métodos
const getDefaultBirthDate = () => {
  const today = new Date();
  const defaultDate = new Date(today.setFullYear(today.getFullYear() - 18));
  return defaultDate.toISOString().split('T')[0];
};

const submitForm = async () => {
  try {
    const payload = {
      ...form.value,
      cpf: unmaskCpf(form.value.cpf),
      email,
      google_id: googleId,
    };
    await userStore.createUser(payload, router);
    if (userStore.error) {
      return;
    }
    router.push('/users');
  } catch (error) {
    console.error('Erro ao cadastrar:', error);
  }
};

const handleCpfInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  form.value.cpf = formatCpf(input.value);
};
</script>

<template>
  <div class="register">
    <loading-spinner :isLoading="userStore.loading" />
    <div class="header">
      <h1>Complete seu Cadastro</h1>
    </div>
    <div class="card">
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label>Nome:</label>
          <input v-model="form.name" type="text" placeholder="Nome completo" required />
          <span v-if="userStore.error?.errors?.name" class="error">
            <div class="error" v-for="error in userStore.error?.errors?.name" :key="error">
              {{ error }}
            </div>
          </span>
        </div>
        <div class="form-group">
          <label>Email:</label>
          <input v-model="email" type="text" placeholder="Email" disabled />
          <span v-if="userStore.error?.errors?.email" class="error">
            <div class="error" v-for="error in userStore.error?.errors?.email" :key="error">
              {{ error }}
            </div>
          </span>
        </div>
        <div class="form-group">
          <label>Data de Nascimento:</label>
          <input v-model="form.birth_date" type="date" :max="getDefaultBirthDate()" required />
          <span v-if="userStore.error?.errors?.birth_date" class="error">
            <div class="error" v-for="error in userStore.error?.errors?.birth_date" :key="error">
              {{ error }}
            </div>
          </span>
        </div>
        <div class="form-group">
          <label>CPF:</label>
          <input
            v-model="form.cpf"
            type="text"
            placeholder="000.000.000-00"
            @input="handleCpfInput"
            maxlength="14"
            required
          />
          <span v-if="userStore.error?.errors?.cpf" class="error">
            <div class="error" v-for="error in userStore.error?.errors?.cpf" :key="error">
              {{ error }}
            </div>
          </span>
        </div>
        <button type="submit" class="submit-btn">Cadastrar</button>
      </form>
    </div>
  </div>
</template>
