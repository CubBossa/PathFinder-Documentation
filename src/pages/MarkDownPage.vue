<template>
  <q-page class="row items-center justify-evenly" :style="'background-color: ' + Dark.isActive ? 'black' : '#e0e0e0'">
    <div class="q-pa-lg row justify-center">
      <q-card class="" style="max-width: 800px">
        <q-spinner v-if="markdown === undefined" color="primary" size="3em"/>
        <q-markdown v-if="markdown !== undefined" :src="markdown" class="q-pa-xl col self-center"/>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">

import {ref, Ref, watch} from "vue";
import {useProjects} from "stores/project-store";
import {useRoute} from "vue-router";
import {Dark} from "quasar";

const projects = useProjects()

const route = useRoute()
const markdown: Ref = ref(undefined);

function loadMarkdown () {
  const projectString: string = route.params.project.toString()
  const versionString: string = route.params.version.toString()
  const pageString: string = route.params.page.toString()

  projects.currentProject = projects.projects.find(value => value.key === projectString)
  if (projects.currentProject !== undefined) {
    projects.currentVersion = projects.currentProject.versions.find(value => value.version === versionString)
    if (projects.currentVersion !== undefined) {
      projects.currentPage = projects.currentVersion.pages.pages.flatMap(projects.convertToFlat).find(value => value.name === pageString)
    }
  }

  if (projects.currentPage?.markdown !== undefined) {
    console.log('importing: ' + '../markdown/' + projects.currentProject?.key + '/' + projects.currentVersion?.version + '/' + projects.currentPage?.markdown + '.md')
    import('../markdown/' + projects.currentProject?.key + '/' + projects.currentVersion?.version + '/' + projects.currentPage?.markdown + '.md').then(value => {
      markdown.value = value.default
    })
  }
}

loadMarkdown()
watch(() => route.path, () => loadMarkdown())

</script>

