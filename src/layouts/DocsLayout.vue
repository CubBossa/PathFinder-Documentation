<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar inset>

        <q-toolbar-title>
          {{ currentProject?.name }}
          <q-badge color="red" rounded :label="'v' + currentVersion?.version"/>
        </q-toolbar-title>
        <q-btn :icon="ionLogoGithub"/>
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

      <q-item header>
        Projects
      </q-item>
      <q-list v-for="project in projects" :key="project.name">
        <q-item>
          <q-btn>
            {{ project.name }}
          </q-btn>
        </q-item>
      </q-list>

      <q-item header>
        Navigation
      </q-item>
      <q-list>
        <!-- <q-tree default-expand-all :nodes="currentVersion?.pages" :node-key="markdown_path"/>-->
      </q-list>
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
import {storeToRefs} from "pinia";

const {projects, currentProject, currentVersion} = storeToRefs(useProjects())

</script>

<style>
p {
  line-height: 170%;
}
</style>
