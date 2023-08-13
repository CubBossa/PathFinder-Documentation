<template>
  <span v-if="inline" class="nolinebreak badge gray mc-font dense inline">
    <slot/>
  </span>
  <div v-else class="q-pb-md">
    <div ref="cmdline" class="relative-position row items-center fullwidth badge gray mc-font" @click="handleClick" v-ripple>
      <slot/>
      <q-space/>
      <q-icon name="content_copy" color="gray"/>
    </div>
  </div>
</template>

<script setup lang="ts">

import {defineProps, onMounted, ref } from "vue";
import {Notify} from "quasar";

const x = ref(false)

const cmdline = ref(null)
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
  Notify.create('Command line copied.')
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

.inline {
  height: fit-content !important;
  padding: 0 6px !important;
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
