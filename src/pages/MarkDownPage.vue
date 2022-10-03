<template>
  <q-page
    class="row justify-evenly"
    style="background-color: #88888844">
    <div class="q-pa-lg row items-start">
      <q-card class="" style="min-width: 800px; max-width: 800px">
        <q-spinner v-if="markdown === undefined" color="primary" size="3em"/>
        <q-markdown
          ref="md"
          v-if="markdown !== undefined"
          :src="markdown"
          class="q-pa-xl col self-center"
          toc
          @data="onToc"
        />
      </q-card>
      <q-card class="q-ml-md" style="min-width: 150px; max-width: 300px">
        <q-card-section tag="header">
          Table of Content
        </q-card-section>
        <q-separator/>
        <q-card-section>
          <q-tree
            ref="tree"
            :nodes="toc || []"
            node-key="id"
            label-key="label"
            children-key="children"
            default-expand-all
            no-connectors
          />
        </q-card-section>
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

const tree = ref(null)
const md = ref(null)
const route = useRoute()
const markdown: Ref = ref(undefined);
const toc = ref(undefined)
const tocFlat = ref(undefined)

function onToc(data: any) {
  tocFlat.value = data
}

function loadMarkdown() {
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
    import('markdown/' + projects.currentProject?.key + '/' + projects.currentVersion?.version + '/' + projects.currentPage?.markdown + '.md').then(value => {
      markdown.value = value.default
    })
  }
  setTimeout(() => {
    toc.value = tocFlat.value === undefined || tocFlat.value.length === 0 ? [] : md.value?.makeTree(tocFlat.value)
    setTimeout(() => {
      tree.value?.expandAll()
    }, 10)
  }, 50)
}

loadMarkdown()
watch(() => route.path, () => loadMarkdown())

</script>

<style lang="sass">
// When navigating (scrolling) to an anchor and to avoid that the anchor gets
// hidden by the fixed page header we offset the scrolling by the header height.
.q-markdown [class^="q-markdown--heading-h"]
  scroll-margin-top: 70px
</style>
