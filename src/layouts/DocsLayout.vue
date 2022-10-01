<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar inset style="height: 70px">
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
      <q-item id="search_input" style="height: 70px" class="row">
        <q-input model-value="" class="col self-stretch q-py-sm" borderless square filled dense>
          <template v-slot:append>
            <q-icon v-if="text !== ''" name="close" @click="text = ''" class="cursor-pointer"/>
            <q-icon name="search"/>
          </template>

          <template v-slot:hint>
            Field hint
          </template>
        </q-input>
      </q-item>

      <q-item>
        Projects
      </q-item>
      <q-list v-for="project in projects.projects" :key="project.name">
        <q-item>
          <q-btn unelevated>
            {{ project.name }}
          </q-btn>
        </q-item>
      </q-list>

      <q-separator/>
      <q-item class="text-center text-weight-bold">
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

<style lang="sass">
p
  line-height: 170%

#search_input
  background-color: $primary

</style>
