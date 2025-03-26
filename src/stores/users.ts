import { defineStore } from "pinia";
import axios from "axios";
import type { User } from "@/types/user";
import type { ErrorResponse } from "@/types/errorResponse";
import { useRouter } from "vue-router";

const API_BASE_URL = "http://localhost:8000/api/users";

export const useUserStore = defineStore("users", {
  state: () => ({
    users: [] as User[],
    loading: false,
    error: null as ErrorResponse | null,
    specificError: "" as string,
  }),

  actions: {
    setLoading(value: boolean) {
      this.loading = value;
    },

    async fetchUsers() {
      await this.handleApiRequest(() => axios.get(API_BASE_URL));
    },

    async filterUsers(name: string, cpf: string, page: number = 1) {
      await this.handleApiRequest(() =>
        axios.get(API_BASE_URL, { params: { name, cpf, page } })
      );
    },

    async createUser(user: {
      google_id: string;
      birth_date: string;
      name: string;
      cpf: string;
      email: string;
    }, router: ReturnType<typeof useRouter>) {
      await this.handleApiRequest(
        () => axios.post(API_BASE_URL, user),
        (error) => {
          this.error = error.response?.data?.errors || null;
          if (this.error?.google_id || this.error?.google_token) {
            this.specificError =
              "O processo não está seguindo os passos corretamente. Por favor, retorne à página inicial e tente novamente.";
            if (confirm(this.specificError)) {
              router.push('/');
            }
          }
        }
      );
    },

    async handleApiRequest(apiCall: () => Promise<any>, onError?: (error: any) => void) {
      this.setLoading(true);
      try {
        const response = await apiCall();
        this.users = response.data?.data || [];
        this.error = null;
        this.specificError = "";
      } catch (error) {
        console.error(error);
        if (onError) onError(error);
      } finally {
        this.setLoading(false);
      }
    },
  },
});
