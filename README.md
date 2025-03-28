# Frontend - Google Auth Users

Este é o frontend da aplicação desenvolvida para o teste técnico de Desenvolvedor Full Stack Pleno. O projeto foi construído utilizando **Vue.js 3**, **TypeScript**, **Vue Router**, **Pinia** e **Sass**, seguindo boas práticas e arquitetura organizada.

## 📌 Funcionalidades

- **Autenticação via Google OAuth**
- **Cadastro de novos usuários** (caso ainda não existam no sistema)
- **Listagem de usuários cadastrados**
- **Filtros otimizados por nome e CPF**
- **Gerenciamento de estado com Pinia**

---

## ⚙️ Tecnologias Utilizadas

- [Vue.js 3](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vue Router](https://router.vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [Sass](https://sass-lang.com/)
- [Axios](https://axios-http.com/)

---

## 🚀 Como Rodar o Projeto (Usando Docker)

### 📌 Pré-requisitos
- **Docker** e **Docker Compose** instalados.

### 📌 Passos para execução

1. **Clone o repositório:**
   ```sh
   git clone https://github.com/henriquesd11/google-auth-users_front.git
2. **Acesse o diretório**
   ```sh
   cd google-auth-users_front
3. **Execute o Docker Compose:**
```sh
    docker-compose up --build
```

### 📌 Configuração do Ambiente
- O .env já está configurado, pois a BASE_URL do backend foi definida diretamente na store do Vue para facilitar as requisições.

## 🖥 URLs Padrão
- Backend: [http://localhost:5173](http://localhost:5173)


### 📂 Estrutura do Projeto
- **/src/components/** - LoginButton.vue, UserForm.vue e UserList.vue
- **/src/stores/** - Estado global gerenciado com Pinia. 
- **/src/views/** - Páginas principais (HomeView.vue, UsersView.vue, etc.).
- **/src/router/** - Configuração de rotas com Vue Router.