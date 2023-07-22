<template>
  <div class="container">
    <div v-if="permission" class="mc-font badge row" @click="copyText" @mouseover="hover = true" @mouseout="hover = false">
      <transition-group
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <div v-show="hover">OP</div>
        <q-separator v-show="hover" vertical/>
      </transition-group>
      <div>{{ permission }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {defineProps, ref} from "vue";

const hover = ref(false);

const props = defineProps<{
  permission?: string
}>()

function copyText (): void {
  navigator.clipboard.writeText(props.permission || '')
}

</script>

<style scoped lang="scss">

.container {
  display: flex;
  justify-content: end;
}

.badge {
  transition: background-color .1s;
  max-width: max-content;
  font-size: 12px;
  color: var(--c-bg);
  background-color: var(--c-text);
  border-radius: 20px;
  margin: 5px 0;
  padding: 0 10px 2px 10px;
  &:hover {
    background-color: var(--c-text-lighter);
  }
}

</style>
