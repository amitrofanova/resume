import { ref, watchEffect } from 'vue';

export function useTheme() {
  const theme = ref<'light' | 'dark'>(
    (localStorage.getItem('theme') as 'light' | 'dark') || 'light',
  );

  watchEffect(() => {
    document.documentElement.classList.toggle('dark', theme.value === 'dark');
    localStorage.setItem('theme', theme.value);
  });

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
  };

  return { theme, toggleTheme };
}
