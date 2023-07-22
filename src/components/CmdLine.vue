<template>
  <div ref="cmdline" class="badge gray mc-font" @click="handleClick">
    <slot />
  </div>
  <div class="card-holder" :class="x ? '' : 'card-holder-hidden'">
    <div class="card">
      <h4>Roadmap Argument</h4>
      Supply a roadmap argument by entering the roadmaps namespaced-key.
      If this sounds confusing, checkout the command to create roadmaps first.
    </div>
  </div>
</template>

<script setup lang="ts">

import {defineProps, onMounted, ref, useSlots} from "vue";

const x = ref(false)

const cmdline = ref(null)
const slots = useSlots()
const copyText = ref('')
defineProps<{
  permissionNode?: string
}>()

onMounted(() => {
  copyText.value = cmdline.value.innerText
})

function handleClick (): void {
  navigator.clipboard.writeText(copyText.value)
}

</script>

<style>
.badge {
  width: 100%;
  height: 100%;
  padding: 3px 10px;
  background-color: rgba(0, 0, 0, 82%);
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
}

.card {
  margin-top: 10px;
  padding: 12px;
  border-radius: 4px;
  background-color: rgba(0,0,0,.03);
  border: 1px rgba(0,0,0,.12) solid;
}

.card h4 {
  padding-top: 46px;
  margin-bottom: 10px;
}

.card-holder {
  max-height: 500px;
  transition: max-height .25s ease-in;
  overflow: hidden;
}

.card-holder-hidden {
  max-height: 0;
  transition: max-height .25s ease-out;
}
</style>
