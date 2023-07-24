<template>
  <div class="container-box">
    <div class="q-px-md q-pt-sm q-pb-sm row">
      <div class="q-pr-md row self-center">
        <q-icon size="140%" :name="data[$props.type].icon"/>
      </div>
      <div>
        {{ toUpperCase(type) }}
      </div>
    </div>
    <div class="q-px-md q-pb-md">
      <slot/>
    </div>
  </div>
</template>

<script setup lang="ts">

import {toUpperCase} from "uri-js/dist/esnext/util";

type InfoType = 'tip' | 'warning' | 'severe' | 'info' | 'success';

const data: { [name: string]: { icon: string }} = {
  severe: { icon: 'error' },
  warning: { icon: 'exclamation' },
  tip: { icon: 'info' },
  info: { icon: 'info' },
  success: { icon: 'check_circle' }
}

defineProps<{
  type: InfoType
}>()

</script>

<style lang="sass">

.container-box
  color: black
  background-color: rgb(100, 200, 100)
  border-radius: 6px
  border: 1px rgba(0, 0, 0, 0.3) solid
  border-left-width: 5px

</style>
