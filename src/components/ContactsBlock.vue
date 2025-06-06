<script setup lang="ts">
import type ContactItem from '../types/models/contact.ts';

interface Props {
  contacts: ContactItem[];
}

defineProps<Props>();
</script>

<template>
  <ul class="flex flex-col gap-2">
    <li v-for="(contact, index) in contacts" :key="index" class="flex flex-wrap">
      <span v-if="contact?.preferable" class="font-bold text-sm font-bold"
        >Предпочтительный способ связи</span
      >
      <span>{{ Object.values(contact)[0] }}</span>
    </li>
  </ul>
</template>
