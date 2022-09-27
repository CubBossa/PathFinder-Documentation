<template>
  <q-page class="row items-center justify-evenly" style="background-color: #e0e0e0">
    <div class="q-pa-lg row justify-center">
      <q-card class="" style="max-width: 800px">
        <q-spinner v-if="markdown === undefined" color="primary" size="3em"/>
        <q-markdown v-if="markdown !== undefined" :src="markdown" class="q-pa-xl col self-center"/>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">

import {ref, Ref} from "vue";
import {useProjects} from "stores/project-store";

const projects = useProjects()

const markdown: Ref = ref(undefined);
if (projects.currentPage?.markdown !== undefined) {
  import('../markdown/' + projects.currentProject?.name + '/' + projects.currentVersion?.version + '/' + projects.currentPage?.markdown + '.md').then(value => {
    markdown.value = value.default
  })
}

</script>

