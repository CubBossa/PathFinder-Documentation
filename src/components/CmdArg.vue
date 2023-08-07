<template>
  <span :class="getClass()" @mouseenter="hovered = true" @mouseleave="hovered = false">
    <span v-if="optional">[</span>
    <span v-if="typeObj.wrapped && !noWrapper">‹</span>{{ labelFn() }}<span
    v-if="typeObj.wrapped && !noWrapper">›</span>
    <span v-if="optional">]</span>
    <q-menu :model-value="hovered" class="popup" max-width="500px" :offset="[30,0]"
            v-if="typeObj.title || typeObj.description">
      <q-item class="popup-content text-bold" v-if="typeObj.title">
        {{ typeObj.title }}
      </q-item>
      <q-separator inset v-if="typeObj.title && typeObj.description"/>
      <q-item class="popup-content" v-if="typeObj.description">
        <div v-html="typeObj.description"/>
      </q-item>
    </q-menu>
  </span>{{ ' ' }}
</template>

<script setup lang="ts">

import {Component, defineProps, ref} from 'vue';

const hovered = ref(false);

type type = 'location' | 'literal' | 'nodes' | 'node-type' | 'example' | 'nodegroup' | 'mod' | 'nskey' | 'str' |
  'int' | 'float' | 'player' | 'discoverable' | 'mm' | 'vis' | 'vis-type' | 'page' | 'nav' | 'perm' | 'args'

const props = defineProps<{
  label?: string
  type: type,
  optional?: boolean
  noWrapper?: boolean
  index: number
}>()

type ArgType = {
  label: (labelProp: string) => string,
  wrapped: boolean,
  title?: string,
  description?: string | Component
}

const types: { [key: string]: ArgType } = {
  str: {
    label: s => s ? s : 'string',
    wrapped: true
  },
  location: {
    label: s => s ? s : '<x> <y> <z>',
    wrapped: false,
    title: 'Location Argument',
    description: 'The vanilla location argument, defined by an x, y and z coordinate. You might want to use relative coordinates with ~ or ^, check out Minecraft wiki for more information.'
  },
  literal: {
    label: s => s ? s : 'literal',
    wrapped: false
  },
  args: {
    label: s => s ? s : 'args',
    wrapped: true
  },
  nodes: {
    label: s => s ? s : 'waypoints',
    wrapped: true,
    title: 'Waypoint Selection Argument',
    description: `
      Use a node selector to define which exact nodes you want to refer.
      It works similar to vanilla entity selectors. Make sure to always
      surround the argument with quotation marks ("). <br><b>Examples:</b> <br>  "@n" -> all nodes. <br>  "@n[limit=1,sort=nearest] -> node closest to you.
    `
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
    wrapped: true,
    title: 'Nodegroup Argument',
    description: `
A nodegroup, identified by its namespaced key. Provide the combination of
namespace (responsible plugin) and unique key.<br><b>Example</b><br>- pathfinder:global<br>- pathfinder:test123<br>- mazesolver:maze_01`
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
  'vis-type': {
    label: s => s ? s : 'visualizer-type',
    wrapped: true
  },
  page: {
    label: s => s ? s : 'page',
    wrapped: true,
    title: 'Page Argument',
    description: 'The page to display. Use full numbers greater or equals than one. If optional and not present, 1. '
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

function labelFn(): string {
  return typeObj.label(props.label)
}

function getClass() {
  return 'arg arg' + (props.index % 4) + (hovered.value ? ' arg-hovered' : '')
}

</script>

<style lang="scss">

.popup {
  background-color: var(--c-bg-dark);
}

.popup-content {
  color: var(--c-text);
}

.arg {
  padding: 2.5px;
}

.selected {
  outline: 2px rgba(0, 0, 0, .7) solid;
}

.arg-hovered {
  background-color: rgba(255, 255, 255, 10%);
  transition: background-color .15s linear;
}

</style>
