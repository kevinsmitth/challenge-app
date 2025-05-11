<script setup lang="ts">
import { ref } from 'vue'

type VuetifyVariant = 'underlined' | 'filled' | 'outlined' | 'plain' | 'solo' | 'solo-inverted' | 'solo-filled' | undefined
interface Props {
    modelValue: string | null | undefined
    label?: string
    placeholder?: string
    id?: string
    errorMessages?: string | string[]
    variant?: VuetifyVariant
    hint?: string
}

withDefaults(defineProps<Props>(), {
    variant: 'underlined',
    placeholder: '',
    label: '',
})

const showPassword = ref(false)

const toggleVisibility = () => {
    showPassword.value = !showPassword.value
}
</script>

<template>
    <v-text-field :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)" :label="label"
        :placeholder="placeholder" :id="id" :error-messages="errorMessages" :variant="variant" hide-details="auto"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :type="showPassword ? 'text' : 'password'"
        :hint="hint ?? 'Mínimo de 8 caracteres'" @click:append="toggleVisibility" persistent-hint />
</template>