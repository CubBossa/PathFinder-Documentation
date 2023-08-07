<template>
  <div class="container-box q-my-lg" :class="data[$props.type].class">
    <q-item :class="data[$props.type].class" dense>
      <q-item-section side>
        <q-icon size="140%" :name="data[$props.type].icon" :class="data[$props.type].class + '-title'"/>
      </q-item-section>
      <q-item-section>
        <q-item-label header :class="data[$props.type].class + '-title'">
          <b>{{ toUpperCase(type) }}</b>
        </q-item-label>
      </q-item-section>
    </q-item>
    <div class="q-px-md q-pb-md">
      <slot/>
    </div>
  </div>
</template>

<script setup lang="ts">

import {toUpperCase} from "uri-js/dist/esnext/util";

type InfoType = 'tip' | 'warning' | 'severe' | 'info';

const data: { [name: string]: { icon: string, class: string }} = {
  severe: { icon: 'error', class: 'severe' },
  warning: { icon: 'exclamation', class: 'warning' },
  tip: { icon: 'info', class: 'tip' },
  info: { icon: 'info', class: 'info' },
  success: { icon: 'check_circle', class: 'success' }
}

defineProps<{
  type: InfoType
}>()

</script>

<style lang="sass">

.severe
  border-color: var(--c-danger)
  color: var(--c-danger-text)
  background-color: var(--c-danger-bg)

.severe-title
  color: var(--c-danger-title) !important

.info
  color: var(--c-info-text)
  background-color: var(--c-info)

.tip
  border-color: var(--c-tip)
  background-color: var(--c-tip-bg)
  color: var(--c-tip-text)

.tip-title
  color: var(--c-tip-title)

.warning
  background-color: var(--c-warning-bg)
  border-color: var(--c-warning)
  color: var(--c-warning-text)

.warning-title
  color: var(--c-warning-title) !important

.container-box
  border-style: solid
  border-width: 0 0 0 8px

</style>
