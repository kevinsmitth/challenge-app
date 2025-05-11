<script setup lang="ts">
import { useAlert } from '@/composables/useAlert'

const { alerts } = useAlert()
</script>
<template>
    <v-slide-x-reverse-transition group>
        <v-alert v-for="alert in alerts" :key="alert.id" v-model="alert.show" close-text="Fechar" :text="alert.message"
            :closable="true" :show="alert.show" :color="alert.type" :icon="alert.icon" class="alert-item">
        </v-alert>
    </v-slide-x-reverse-transition>
</template>

<style scoped>
.alert-item {
    position: fixed !important;
    top: 20px !important;
    right: 20px !important;
    z-index: 20001 !important;
    min-width: 300px;
}

.v-alert.alert-item:nth-of-type(1) {
    top: 20px !important;
}

.v-alert.alert-item:nth-of-type(2) {
    top: 85px !important;
}

.v-alert.alert-item:nth-of-type(3) {
    top: 150px !important;
}

.v-alert.alert-item:nth-of-type(4) {
    top: 215px !important;
}

.v-alert.alert-item:nth-of-type(5) {
    top: 280px !important;
}

.v-alert.alert-item:nth-of-type(6) {
    top: 345px !important;
}
</style>