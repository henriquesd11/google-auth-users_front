<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '../stores/users.ts';
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import { formatCpf, unmaskCpf } from '@/utils/formatters';

export default defineComponent({
  name: 'RegisterView',
  components: {LoadingSpinner},
  data() {
    return {
      form: {
        name: '',
        birth_date: '',
        cpf: '',
      },
    };
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const userStore = useUserStore();

    // Acessa os parametros da query string
    const email = route.query.email as string;
    const googleId = route.query.google_id as string;

    if (!email || !googleId) {
      router.push('/');
    }

    return { email, googleId, router, userStore };
  },
  methods: {
    getDefaultBirthDate(): string {
      const today = new Date();
      const defaultDate = new Date(today.setFullYear(today.getFullYear() - 18));
      return defaultDate.toISOString().split('T')[0];
    },
    async submitForm() {
      try {
        const payload = {
          ...this.form,
          cpf: unmaskCpf(this.form.cpf),
          email: this.email,
          google_id: this.googleId,
        };
        await this.userStore.createUser(payload, this.router);
        if (this.userStore.error) {
          return;
        }
        this.router.push('/users');
      } catch (error) {
        console.error('Erro ao cadastrar:', error);
      }
    },
    handleCpfInput(event: Event) {
      const input = event.target as HTMLInputElement;
      this.form.cpf = formatCpf(input.value);
    },
  },
});
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
          <span v-if="userStore.error?.name" class="error">
            <div class="error" v-for="errors in userStore.error?.name">
              {{ errors }}
            </div>
          </span>
        </div>
        <div class="form-group">
          <label>Nome:</label>
          <input v-model="email" type="text" placeholder="Email" disabled />
          <span v-if="userStore.error?.email" class="error">
            <div class="error" v-for="errors in userStore.error?.email">
              {{ errors }}
            </div>
          </span>
        </div>
        <div class="form-group">
          <label>Data de Nascimento:</label>
          <input v-model="form.birth_date" type="date" :max="getDefaultBirthDate()" required />
          <span v-if="userStore.error?.birth_date" class="error">
            <div class="error" v-for="errors in userStore.error?.birth_date">
              {{ errors }}
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
          <span v-if="userStore.error?.cpf" class="error">
            <div class="error" v-for="errors in userStore.error?.cpf">
              {{ errors }}
            </div>
          </span>
        </div>
        <button type="submit" class="submit-btn">Cadastrar</button>
      </form>
    </div>

  </div>
</template>

<style lang="scss" scoped>
$primary-color: #3498db;
$input-border-color: #ccc;
$input-border-radius: 4px;

.register {
  p {
    text-align: center;
    color: $primary-color;
    font-size: 1.1rem;
    margin-bottom: 20px;
  }
  .card {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid $input-border-color;
    border-radius: $input-border-radius;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 15px;

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 5px;

      label {
        font-weight: bold;
        color: $primary-color;
      }

      input {
        padding: 10px;
        border: 1px solid $input-border-color;
        border-radius: $input-border-radius;
        font-size: 1rem;
      }
    }
  }
}
</style>
