<script setup lang="ts">
import BaseHeader from '../components/BaseHeader.vue';
</script>

<template>
  <div class="flex flex-col gap-2 pt-10">
    <BaseHeader headingLevel="h1" class="break-words pr-10"><slot name="name"></slot></BaseHeader>
    <BaseHeader headingLevel="h2"><slot name="jobTitle"></slot></BaseHeader>

    <p class="text-gray-800">
      <slot name="about"></slot>
    </p>
  </div>
</template>
