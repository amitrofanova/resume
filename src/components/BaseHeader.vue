<template>
  <component :is="headingLevel" :class="headerClasses"><slot></slot></component>
</template>

<script setup lang="ts">
interface Props {
  headingLevel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  headingLevel: 'h2',
});

const headerClasses = computed(() => {
  const classes = ['mt-6', 'mb-2', 'font-bold'];

  switch (props.headingLevel) {
    case 'h1':
      classes.push('text-3xl');
      break;
    case 'h2':
      classes.push('text-2xl');
      break;

    default:
      classes.push('text-xl');
      break;
  }

  return classes;
});
</script>
