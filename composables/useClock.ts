import { onMounted, ref } from 'vue'

export function useClock() {
  const currentTime = ref('')

  function updateTime() {
    const now = new Date()

    currentTime.value
      = now.getHours().toString().padStart(2, '0')
        + ':'
        + now.getMinutes().toString().padStart(2, '0')
  }

  updateTime()

  onMounted(() => {
    setInterval(updateTime, 10000)
  })

  return {
    currentTime
  }
}
