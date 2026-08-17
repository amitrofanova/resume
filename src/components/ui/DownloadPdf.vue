<script setup lang="ts">
function downloadPdf(): void {
  window.print();
}
</script>

<template>
  <button
    type="button"
    class="cursor-pointer rounded p-2 text-text hover:opacity-50"
    title="Save as PDF"
    aria-label="Save as PDF"
    @click="downloadPdf"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  </button>
</template>
