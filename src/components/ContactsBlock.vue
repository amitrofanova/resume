<script setup lang="ts">
import type ContactItem from '../types/models/contact.ts';

interface Props {
  contacts: ContactItem[];
}

defineProps<Props>();

const getLink = (item: ContactItem) => {
  switch (item.type) {
    case 'phone':
      return `tel:${item.value}`;
    case 'email':
      return `mailto:${item.value}`;

    default:
      return item.value;
  }
};
</script>

<template>
  <ul class="flex flex-col gap-2">
    <li v-for="(contact, index) in contacts" :key="index" class="flex flex-wrap">
      <span v-if="contact?.preferable" class="font-bold text-sm font-bold"
        >Предпочтительный способ связи</span
      >
      <a :href="getLink(contact)" target="_blank" class="text-secondary hover:underline">{{
        contact.value
      }}</a>
    </li>
  </ul>
</template>
