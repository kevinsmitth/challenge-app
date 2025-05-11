import { ref } from 'vue'

export interface Alert {
  id: number
  show: boolean
  type: string
  message: string
  icon: string
}

const alerts = ref<Alert[]>([])

export function useAlert() {
  const dispatchAlert = (type: string, message: string, icon: string = 'mdi-alert-circle') => {
    const alert: Alert = {
      id: Date.now(),
      show: true,
      type,
      message,
      icon,
    }

    alerts.value.push(alert)

    setTimeout(() => {
      alert.show = false
      alerts.value = alerts.value.filter((a) => a.id !== alert.id)
    }, 3000)
  }

  return {
    alerts,
    dispatchAlert,
  }
}
