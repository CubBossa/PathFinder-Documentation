<template>
  <div class="container">
    <q-btn flat dense no-caps class="mc-font perm-btn" @click="copyText">
      {{ permission }}
    </q-btn>
  </div>
</template>

<script setup lang="ts">

import {defineProps, ref} from "vue";
import {Notify} from "quasar";

const hover = ref(false);

const props = defineProps<{
  permission?: string
}>()

function copyText (): void {
  navigator.clipboard.writeText(props.permission || '')
  Notify.create('Permission copied.')
}

</script>

<style scoped lang="scss">

.container {
  display: flex;
  justify-content: end;
}

.perm-btn {
  font-size: 12px;
  color: var(--c-bg);
  background-color: var(--c-text);
  border-radius: 20px;
  padding: 0 10px 2px 10px;
  margin: 5px 0;
  &:hover {
    background-color: var(--c-text-lighter);
  }
}

</style>
