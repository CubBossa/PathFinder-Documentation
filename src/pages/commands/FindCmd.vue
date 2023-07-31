<template>
  <h1>Find Command</h1>

  <p>
    The find command is the heart of the plugin. It allows you to query a "shortest path search" to a certain location.
  </p>

  <h2>Structure</h2>

  <p>
    The usage of the command is quite simple.
  </p>

  <CmdLine>
    /find
    <CmdArg :index="0" type="nav"></CmdArg>
  </CmdLine>
  <CmdLine>
    /find
    <CmdArg :index="0" type="example" label=parking_lot></CmdArg>
  </CmdLine>
  <CmdLine>
    /find
    <CmdArg :index="0" type="example" label=home></CmdArg>
  </CmdLine>

  The definition of the target might not, if not searching for a single target.
  <CmdLine>
    /find
    <CmdArg :index="0" type="example" label="parking_lot&towncenter&shop[sells=diamond]|chestshop[sells=diamond,sell-price>=15]"></CmdArg>
  </CmdLine>

  <p>
    You can use the query language to give an exact definition of your target location.
  </p>

  <h2>Query Language</h2>

  Maybe I am still working on this section or maybe I have totally forgotten about it :P

</template>


<script setup lang="ts">
import CmdLine from "components/CmdLine.vue";
import CmdArg from "components/CmdArg.vue";
</script>
