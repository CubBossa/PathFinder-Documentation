<template>
  <div v-if="block" class="code-element">
    <slot/>
  </div>
  <span v-else class="code-element">
    <code><slot/></code>
  </span>
</template>

<style lang="sass">

.code-element
  background-color: rgba(0, 0, 0, 0.2)
  border-radius: 3px
  padding: 4px 2px
  margin: 0 2px
  font-weight: 400
  font-family: 'Source Code Pro',Consolas,Monaco,'Andale Mono',"Ubuntu Mono",monospace
  hyphens: none
  white-space: pre
  word-break: break-all
  word-wrap: break-word
</style>

<script setup lang="ts">

defineProps<{
  block?: boolean
}>()

</script>
