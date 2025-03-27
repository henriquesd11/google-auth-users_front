import { defineStore } from "pinia";
import axios from "axios";
import type { User } from "@/types/user.js";
import type { ErrorResponse } from "@/types/errorResponse.js";
import { useRouter } from "vue-router";

const API_BASE_URL = "http://localhost:8000/api/users";

interface PaginatedUsers {
  data: User[];
  total: number;
}

export const useUserStore = defineStore("users", {
  state: () => ({
    users: { data: [], total: 0 } as PaginatedUsers,
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

    async createUser(
      user: {
        google_id: string;
        birth_date: string;
        name: string;
        cpf: string;
        email: string;
      },
      router: ReturnType<typeof useRouter>
    ) {
      await this.handleApiRequest(
        () => axios.post(API_BASE_URL, user),
        (error: any) => {
          this.error = error.response?.data as ErrorResponse | null;
          if (
            this.error?.errors?.google_id?.length ||
            this.error?.errors?.google_token?.length
          ) {
            router.push("/");
          }
        }
      );
    },

    async handleApiRequest(apiCall: () => Promise<any>, onError?: (error: any) => void) {
      this.setLoading(true);
      try {
        const response = await apiCall();
        this.users = response.data.data;
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
