<template>
  <span v-if="inline" class="nolinebreak badge gray mc-font dense">
    <slot/>
  </span>
  <div v-else class="q-py-md">
    <div ref="cmdline" class="fullwidth badge gray mc-font" @click="handleClick">
      <slot/>
    </div>
    <div class="card-holder" :class="x ? '' : 'card-holder-hidden'">
      <div class="card">
        <h4>Roadmap Argument</h4>
        Supply a roadmap argument by entering the roadmaps namespaced-key.
        If this sounds confusing, checkout the command to create roadmaps first.
      </div>
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
  inline?: boolean
  permissionNode?: string
}>()

onMounted(() => {
  copyText.value = cmdline.value?.innerText || ''
})

function handleClick(): void {
  navigator.clipboard.writeText(copyText.value)
}

</script>

<style>

.nolinebreak {
  white-space: nowrap;
  display: inline-block;
}

.dense {
  font-size: 12px !important;
}

.fullwidth {
  width: 100%;
}

.badge {
  height: 100%;
  font-size: 14px;
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
  background-color: rgba(0, 0, 0, .03);
  border: 1px rgba(0, 0, 0, .12) solid;
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
