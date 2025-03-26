import { defineStore } from "pinia";
import axios from "axios";
import type { User } from '../Types/user.ts';

export const useUserStore = defineStore('users', {
  state: () => ({
    users: [] as User[],
    loading: false
  }),
  actions: {
    async fetchUsers() {
      this.loading = true;
      try {
        const response = await axios.get('http://localhost:8000/api/users');
        this.users = response.data;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async filterUsers(name: string, cpf: string) {
      this.loading = true;
      try {
        const response = await axios.get('http://localhost:8000/api/users', {
          params: {
            name,
            cpf
          }
        });
        this.users = response.data;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    }
  }
})
