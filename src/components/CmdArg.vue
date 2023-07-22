<template>
  <span :class="getClass()" @mouseenter="hovered = true" @mouseleave="hovered = false">
    <span v-if="optional">[</span>
    <span v-if="typeObj.wrapped && !noWrapper">‹</span>{{ labelFn() }}<span v-if="typeObj.wrapped && !noWrapper">›</span>
    <span v-if="optional">]</span>
  </span>{{ ' ' }}
</template>

<script setup lang="ts">

import {defineProps, ref} from "vue";

const hovered = ref(false);

const props = defineProps<{
  label?: string
  type: string,
  optional?: boolean
  noWrapper?: boolean
  index: number
}>()

type ArgType = {
  label: (labelProp: string) => string,
  wrapped: boolean,
}

const types: { [key: string]: ArgType } = {
  location: {
    label: s => s ? s : '<x> <y> <z>',
    wrapped: false
  },
  literal: {
    label: s => s ? s : 'literal',
    wrapped: false
  },
  roadmap: {
    label: s => s ? s : 'roadmap',
    wrapped: true
  },
  nodes: {
    label: s => s ? s : 'waypoints',
    wrapped: true
  },
  'node-type': {
    label: s => s ? s : 'type',
    wrapped: true
  },
  'example': {
    label: s => s ? s : 'example',
    wrapped: false
  },
  nodegroup: {
    label: s => s ? s : 'group',
    wrapped: true
  },
  mod: {
      label: s => s ? s : 'modifier',
      wrapped: true
  },
  nskey: {
    label: s => s ? s : 'namespaced-key',
    wrapped: true
  },
  int: {
    label: s => s ? s : 'number',
    wrapped: true
  },
  float: {
    label: s => s ? s : 'number',
    wrapped: true
  },
  player: {
    label: s => s ? s : 'player',
    wrapped: true
  },
  discoverable: {
    label: s => s ? s : 'discoverables',
    wrapped: true
  },
  mm: {
    label: s => s ? s : 'minimessage',
    wrapped: true
  },
  vis: {
    label: s => s ? s : 'visualizer',
    wrapped: true
  },
  "vis-type": {
    label: s => s ? s : 'visualizer-type',
    wrapped: true
  },
  page: {
      label: s => s ? s : 'page',
      wrapped: true
  },
  nav: {
      label: s => s ? s : 'target',
      wrapped: true
  },
  perm: {
      label: s => s ? s : 'permission',
      wrapped: true
  }
}

const typeObj = types[props.type] || {
  label: s => s ? s : 'error',
  wrapped: true
}

function labelFn (): string {
  return typeObj.label(props.label)
}

function getClass () {
  return 'arg arg' + (props.index % 4) + (hovered.value ? ' arg-hovered' : '')
}

</script>

<style lang="scss">

.arg {
  border-radius: 3px;
}

.selected {
  outline: 2px rgba(0,0,0,.7) solid;
}

.arg-hovered {
  background-color: rgba(255, 255, 255, 20%);
  transition: background-color .15s linear;
}

</style>