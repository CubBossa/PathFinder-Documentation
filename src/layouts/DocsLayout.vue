<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar inset>

        <q-toolbar-title>
          {{ title }}
          <q-badge color="red" rounded :label="'v' + project.currentVersion"/>
        </q-toolbar-title>
        <q-btn :icon="ionLogoGithub" />
        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      bordered
    >
      <q-input model-value="" style="background-color: #1976D2" class="shadow-4" borderless>
        <template v-slot:append>
          <q-icon v-if="text !== ''" name="close" @click="text = ''" class="cursor-pointer"/>
          <q-icon name="search"/>
        </template>

        <template v-slot:hint>
          Field hint
        </template>
      </q-input>

      <q-list>
        <q-item-label header>
          Projects
        </q-item-label>
      </q-list>

      <q-list>

        <q-item-label header>
          Navigation
        </q-item-label>

        <q-tree default-expand-all :nodes="pages" :node-key="title"/>
      </q-list>
    </q-drawer>

    <q-drawer side="right" show-if-above bordered>
      Just some content here
    </q-drawer>

    <q-page-container>
      <div class="q-pa-lg row justify-center">
        <q-card class="" style="max-width: 800px">
          <q-spinner v-if="effects === undefined" color="primary" size="3em"/>
          <q-markdown v-if="effects !== undefined" :src="effects" class="q-pa-xl col self-center"/>
        </q-card>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ionLogoGithub } from '@quasar/extras/ionicons-v6'
import {Page, Project} from "src/models";
import {ref, Ref} from "vue";

const props = defineProps<{
  project: Project,
  title: string
  pages: Page[],
  activePage: Page
}>()

const effects: Ref = ref(undefined);
import('../markdown/' + props.activePage.markdown_path).then(value => {
  console.log(value)
  effects.value = value.default
})

</script>

<style>
p {
  line-height: 170%;
}
</style>
