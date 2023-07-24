<template>
  <q-item class="container-box">
    <q-item-section side>
      <q-icon :name="data[$props.type].icon"/>
    </q-item-section>
    <q-item-section>
      <slot/>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">

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
