<template>
  <div class="flex flex-col gap-2 pt-10">
    <BaseHeader headingLevel="h1" class="break-words pr-10"><slot name="name"></slot></BaseHeader>
    <BaseHeader headingLevel="h2"><slot name="jobTitle"></slot></BaseHeader>
      <slot name="about"></slot>
  </div>
</template>
