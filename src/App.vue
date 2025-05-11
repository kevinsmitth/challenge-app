<script setup lang="ts">
import { ref } from 'vue'
import Alert from './components/AlertComponent.vue'

const drawer = ref(false)
</script>

<template>
    <v-app>
        <Alert />
        <v-app-bar app color="primary">
            <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Systock Challenge</v-toolbar-title>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" temporary>
            <v-list>
                <v-list-item to="/" link>
                    <v-list-item-title>Home</v-list-item-title>
                </v-list-item>
                <v-list-item to="/about" link>
                    <v-list-item-title>Sobre</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-main>
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </v-main>
    </v-app>
</template>
