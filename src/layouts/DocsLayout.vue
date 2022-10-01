<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar inset>
        <q-toolbar-title>
          {{ projects.currentProject?.name }}
          <q-chip dense :label="'v' + projects.currentVersion?.version"/>
        </q-toolbar-title>
        <q-btn :icon="Dark.isActive ? 'dark_mode' : 'light_mode'" @click="Dark.toggle()" round flat :ripple="false"/>
        <q-btn :icon="ionLogoGithub" round flat :ripple="false"/>
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

      <q-item>
        Projects
      </q-item>
      <q-list v-for="project in projects.projects" :key="project.name">
        <q-item>
          <q-btn>
            {{ project.name }}
          </q-btn>
        </q-item>
      </q-list>

      <q-separator/>
      <q-item>
        Navigation
      </q-item>
      <q-item>
        <q-tree
          no-connectors
          default-expand-all
          :nodes="projects.currentVersion?.pages.pages"
          node-key="name"
          selected-color="red"
          :selected="selected"
          @update:selected="s => navigate(s)"
        >
          <template v-slot:default-header="props">
            <span v-if="props.node.markdown === undefined" class="text-weight-bold">{{ props.node.label }}</span>
            <span v-else>{{ props.node.label }}</span>
          </template>
        </q-tree>
      </q-item>
    </q-drawer>

    <q-drawer side="right" show-if-above bordered>
      Just some content here
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import {ionLogoGithub} from '@quasar/extras/ionicons-v6'
import {useProjects} from "stores/project-store";
import {ref} from "vue";
import {useRouter} from "vue-router";
import {Dark} from "quasar";

const router = useRouter()
const projects = useProjects()
const text = ref('')
const selected = ref('')

function navigate(page: string | null) {
  projects.navigate(router, page)?.then(value => {
    selected.value = (value || projects.getFallBack()).name
  })
}

</script>

<style>
p {
  line-height: 170%;
}
</style>
