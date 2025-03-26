<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'HomeView',
  methods: {
    async loginWithGoogle() {
      try {
        const response = await axios.get('http://localhost:8000/api/google/login'); // Endpoint da API que retorna a URL do Google
        window.location.href = response.data.url; // Redireciona para a URL do Google
      } catch (error) {
        console.error('Erro ao iniciar login com Google:', error);
      }
    },
  },
});
</script>

<template>
  <div class="home">
    <h1>Bem-vindo ao Sistema</h1>
    <button class="google-btn" @click="loginWithGoogle">
      <img src="" alt="Google Icon">
      Login com Google
    </button>
  </div>
</template>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  .google-btn {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    background-color: #4285f4;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    img {
      width: 20px;
      margin-right: 10px;
    }

    &:hover {
      background-color: #357abd;
    }
  }
}
</style>
