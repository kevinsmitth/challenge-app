<script setup lang="ts">
import { ref, watch } from 'vue'
import type { DataTableHeader } from 'vuetify'
import PasswordField from '../components/PasswordField.vue'
import { useAlert } from '../composables/useAlert'
import { useUserStore } from '@/stores/useUserStore';
import actions from "@/actions";

interface User {
    id: number
    name: string
    email: string
    password: string
    password_confirmation: string
    phone: string
    cpf: string
}

const { dispatchAlert } = useAlert()
const userStore = useUserStore();
const search = ref('');
const page = ref(1)
const itemsPerPage = ref(10)
const createUserDialog = ref(false)
const editDialog = ref<{ [key: number]: boolean }>({});
const deleteDialog = ref<{ [key: number]: boolean }>({});

const headers: DataTableHeader[] = [
    { title: 'Nome', key: 'name', align: 'start', sortable: false },
    { title: 'Email', key: 'email', sortable: false },
    { title: 'Telefone', key: 'phone', sortable: false },
    { title: 'CPF', key: 'cpf', sortable: false },
    { title: 'Criado em', key: 'created_at', sortable: false },
    { title: 'Ações', key: 'actions', sortable: false }
]

const newUser = ref<User>({
    id: 0,
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    phone: '',
    cpf: ''
})

const createUserErrors = ref({
    name: [],
    email: [],
    password: [],
    password_confirmation: [],
    phone: [],
    cpf: []
})

const editUserErrors = ref({
    name: [],
    email: [],
    password: [],
    password_confirmation: [],
    phone: [],
    cpf: []
})

watch([page, itemsPerPage], getUsers, { immediate: true })

watch(search, async () => {
    if (search.value === '' || search.value.length >= 3) {
        page.value = 1
        await getUsers()
    }
})


async function getUsers() {
    await actions.fetchUsers(page.value, itemsPerPage.value, search.value)
}

async function createUser() {
    await actions.createUser(newUser.value)
        .then(() => {
            createUserDialog.value = false
            reset()
            dispatchAlert('success', 'Usuário criado com sucesso!', 'mdi-check')
        }).catch((error) => {
            createUserErrors.value = error.response?.data?.errors
            dispatchAlert('error', `Erro ao criar o usuário. ${error.response?.data?.message}.`)
        })
}

async function editUser(data: User, userId: number) {
    await actions.editUser(data, userId)
        .then(() => {
            editDialog.value[userId] = false
            reset()
            dispatchAlert('success', 'Usuário editado com sucesso!', 'mdi-check')
        }).catch((error) => {
            editUserErrors.value = error.response?.data?.errors
            dispatchAlert('error', `Erro ao editar o usuário. ${error.response?.data?.message}.`)
        })
}
async function deleteUser(userId: number) {
    await actions.deleteUser(userId)
        .then(() => {
            deleteDialog.value[userId] = false
            reset()
            dispatchAlert('success', 'Usuário deletado com sucesso!', 'mdi-check')
        }).catch((error) => {
            dispatchAlert('error', `Erro ao deletar o usuário. ${error.response?.data?.message}.`)
        })
}

function reset() {
    search.value = ''
    page.value = 1
    itemsPerPage.value = 10
    newUser.value = {
        id: 0,
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        cpf: ''
    }
    createUserErrors.value = {
        name: [],
        email: [],
        password: [],
        password_confirmation: [],
        phone: [],
        cpf: []
    }
    editUserErrors.value = {
        name: [],
        email: [],
        password: [],
        password_confirmation: [],
        phone: [],
        cpf: []
    }
}
</script>

<template>
    <v-card>
        <v-card-title>
            Usuários
            <v-spacer></v-spacer>
            <div class="d-flex align-center justify-end mb-2">
                <v-dialog v-model="createUserDialog" max-width="500">

                    <template #activator="{ props }">
                        <v-btn v-bind="props" color="success" variant="elevated" class="ml-2">
                            <v-icon class="mr-2">mdi-plus</v-icon>
                            Criar
                        </v-btn>
                    </template>
                    <template v-slot:default="{ isActive }">
                        <v-card>
                            <v-card-title>
                                Criar Novo Usuário
                            </v-card-title>
                            <v-card-text class="d-flex flex-column ga-4">
                                <div>
                                    <v-text-field variant="underlined" v-model="newUser.name" hide-details="auto"
                                        required :error-messages="createUserErrors.name"
                                        label="Nome do usuário"></v-text-field>
                                </div>
                                <div>
                                    <v-text-field variant="underlined" type="email" v-model="newUser.email" required
                                        :error-messages="createUserErrors.email" hide-details="auto"
                                        label="E-mail"></v-text-field>
                                </div>
                                <div>
                                    <PasswordField v-model="newUser.password" label="Senha" required
                                        :error-messages="createUserErrors.password" hint="Mínimo de 8 caracteres" />
                                </div>
                                <div>
                                    <PasswordField v-model="newUser.password_confirmation" label="Confirmar Senha"
                                        required :error-messages="createUserErrors.password_confirmation"
                                        hint="Mínimo de 8 caracteres" />
                                </div>
                                <div>
                                    <v-text-field variant="underlined" v-model="newUser.phone" hide-details="auto"
                                        required :error-messages="createUserErrors.phone" v-mask="'(##) #####-####'"
                                        placeholder="(00) 00000-0000" label="Telefone"></v-text-field>
                                </div>
                                <div>
                                    <v-text-field variant="underlined" v-model="newUser.cpf" hide-details="auto"
                                        required :error-messages="createUserErrors.cpf" v-mask="'###.###.###-##'"
                                        placeholder="000.000.000-00" label="CPF"></v-text-field>
                                </div>
                            </v-card-text>
                            <v-card-actions class="pb-4">
                                <v-spacer></v-spacer>
                                <v-btn variant="elevated" text="Cancelar" @click="isActive.value = false"></v-btn>
                                <v-btn color="success" text="Criar" variant="elevated" @click="createUser"></v-btn>
                            </v-card-actions>
                        </v-card>
                    </template>
                </v-dialog>
            </div>
            <v-text-field v-model="search" @keydown.enter="getUsers" append-icon="mdi-magnify" label="Buscar"
                single-line variant="underlined" hide-details class="mb-2"></v-text-field>
        </v-card-title>
        <v-data-table-server :headers="headers" :items="userStore.users" :search="search"
            :items-per-page-options="[5, 10, 25, 50, 100]" v-model:page="page" @update:page="page = $event"
            @update:items-per-page="itemsPerPage = $event" :items-length="userStore.total" class="elevation-1">
            <template #[`item.actions`]="{ item }">
                <v-btn icon size="small" class="mr-2" @click="editDialog[item.id] = true">
                    <v-icon color="primary">mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon size="small" @click="deleteDialog[item.id] = true">
                    <v-icon color="error">mdi-delete</v-icon>
                </v-btn>

                <v-dialog v-model="editDialog[item.id]" max-width="500">
                    <template v-slot:default="{ isActive }">
                        <v-card>
                            <template v-slot:title>
                                <span class="text-h5">Editar usuário: {{ item.name }}</span>
                            </template>
                            <v-card-text class="d-flex flex-column ga-2">
                                <div>
                                    <v-text-field variant="underlined" v-model="item.name" hide-details="auto" required
                                        :error-messages="editUserErrors.name" label="Nome do usuário"></v-text-field>
                                </div>
                                <div>
                                    <v-text-field variant="underlined" v-model="item.email" type="email" required
                                        :error-messages="editUserErrors.email" hide-details="auto"
                                        label="E-mail"></v-text-field>
                                </div>
                                <div>
                                    <PasswordField v-model="item.password" label="Nova Senha (opcional)"
                                        :error-messages="createUserErrors.password" hint="Mínimo de 8 caracteres" />
                                </div>
                                <div>
                                    <PasswordField v-model="item.password_confirmation"
                                        label="Confirmar Senha (opcional)"
                                        :error-messages="createUserErrors.password_confirmation"
                                        hint="Mínimo de 8 caracteres" />
                                </div>
                                <div>
                                    <v-text-field variant="underlined" v-model="item.phone" v-mask="'(##) #####-####'"
                                        required :error-messages="editUserErrors.phone" hide-details="auto"
                                        placeholder="(00) 00000-0000" label="Telefone"></v-text-field>
                                </div>
                                <div>
                                    <v-text-field variant="underlined" v-model="item.cpf" v-mask="'###.###.###-##'"
                                        required :error-messages="editUserErrors.cpf" placeholder="000.000.000-00"
                                        hide-details="auto" label="CPF"></v-text-field>
                                </div>
                            </v-card-text>

                            <v-card-actions class="pb-4">
                                <v-spacer></v-spacer>
                                <v-btn variant="elevated" text="Cancelar" @click="isActive.value = false"></v-btn>
                                <v-btn color="success" text="Save" variant="elevated"
                                    @click="editUser(item, item.id)">Salvar</v-btn>
                            </v-card-actions>
                        </v-card>
                    </template>
                </v-dialog>

                <v-dialog v-model="deleteDialog[item.id]" max-width="500">
                    <template v-slot:default="{ isActive }">
                        <v-card>
                            <template v-slot:title>
                                <span class="text-h5">Excluir usuário: {{ item.name }}</span>
                            </template>
                            <v-card-text class="d-flex flex-column ga-4">
                                <p>
                                    Tem certeza que deseja excluir esse usuário?
                                </p>
                            </v-card-text>
                            <v-card-actions class="pb-4">
                                <v-spacer></v-spacer>
                                <v-btn variant="elevated" text="Cancelar" @click="isActive.value = false"></v-btn>
                                <v-btn color="error" text="Excluir" variant="elevated" @click="deleteUser(item.id)">Sim,
                                    tenho
                                    certeza</v-btn>
                            </v-card-actions>
                        </v-card>
                    </template>
                </v-dialog>
            </template>
        </v-data-table-server>
    </v-card>
</template>
