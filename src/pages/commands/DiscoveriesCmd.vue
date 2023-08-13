<template>
  <h1>Discoveries Command</h1>

  <p>
    The discoveries command gives players a short overview about how much they have already discovered of some areas.
  </p>
  <p>
    As of yet, this is being printed in a percentage. Future versions will also support counts, meaning that a format
    like
    <br>
    <CodeElement>Hogwarts: 75% (3/4)</CodeElement>
    <br>
    is also valid.
  </p>

  <p>
    Checkout the wiki section about <a href="/concept/nodegroups#discover-progress-modifier">progress modifiers</a> to understand,
    how the different entries are defined.
  </p>

  <p>
    Simply run the command without arguments:
  </p>
  <CmdLine>/discoveries</CmdLine>


</template>
<script setup lang="ts">
import CodeElement from "components/CodeElement.vue";
import CmdLine from "components/CmdLine.vue";
</script>
