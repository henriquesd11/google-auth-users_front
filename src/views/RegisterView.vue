<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

export default defineComponent({
  name: 'RegisterView',
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

    // Acessa os parametros da query string
    const email = route.query.email as string;
    const googleId = route.query.google_id as string;

    return { email, googleId, router };
  },
  methods: {
    async submitForm() {
      try {
        // Inclui email e google_id no payload
        const payload = {
          ...this.form,
          email: this.email,
          google_id: this.googleId,
        };
        await axios.post('http://localhost:8000/api/users', payload); // Envia para a API
        this.router.push('/users'); // Redireciona para a listagem
      } catch (error) {
        console.error('Erro ao cadastrar:', error);
      }
    },
  },
});
</script>

<template>
  <div class="register">
    <h1>Complete seu Cadastro</h1>
    <p>Email: {{ email }}</p>
    <form @submit.prevent="submitForm">
      <div>
        <label>Nome:</label>
        <input v-model="form.name" type="text" required />
      </div>
      <div>
        <label>Data de Nascimento:</label>
        <input v-model="form.birth_date" type="date" required />
      </div>
      <div>
        <label>CPF:</label>
        <input v-model="form.cpf" type="text" required />
      </div>
      <button type="submit">Cadastrar</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.register {
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;

  form {
    display: flex;
    flex-direction: column;
    gap: 15px;

    input {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    button {
      padding: 10px;
      background-color: #28a745;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background-color: #218838;
      }
    }
  }
}
</style>
