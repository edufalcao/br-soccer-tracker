const STORAGE_KEY = 'br-soccer-tracker:theme'

type Theme = 'dark' | 'light'

export function useTheme() {
  const theme = useState<Theme>('app-theme', () => 'dark')
  const isDark = computed(() => theme.value === 'dark')

  function applyTheme(value: Theme) {
    if (!import.meta.client) return
    const root = document.documentElement
    root.classList.add('theme-transition')
    if (value === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    // Remove transition class after animation completes
    setTimeout(() => root.classList.remove('theme-transition'), 350)
  }

  function setTheme(value: Theme) {
    theme.value = value
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, value)
    }
    applyTheme(value)
  }

  function toggleTheme() {
    setTheme(theme.value === 'dark' ? 'light' : 'dark')
  }

  // Initialize on client — read from localStorage, default to dark
  if (import.meta.client) {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
    if (stored === 'dark' || stored === 'light') {
      theme.value = stored
    } else {
      theme.value = 'dark'
    }
    applyTheme(theme.value)
  }

  return { theme: readonly(theme), isDark, setTheme, toggleTheme }
}
