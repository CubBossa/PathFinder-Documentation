<template>
  <h1>Installation</h1>

  <h2>Dependencies</h2>

  <p>
    To get started, you first require to install the following dependencies:
  </p>

  <ul>
    <li><a href="https://www.spigotmc.org/resources/protocollib.1997/">ProtocolLib</a></li>
    <li>Thats it for now :D</li>
  </ul>

  <InfoContainer type="tip">
    While the last Minecraft is quite new, ProtocolLib might not have released
    an according version. Follow their instructions about development builds, which
    are not quite as save to use but mostly work.
  </InfoContainer>

  <h2>First launch</h2>

  <p>
    With all dependencies installed you are good to go and run your server.
    If the plugin is listed in ``/pl``, it has successfully been started.
  </p>

  <p>
    You will find, that no roadmaps, visualizers, nodegroups or playerdata exist yet,
    which is fine. You can discover the commands by yourself or read more in the wiki.
  </p>

  <h2>Backups and Data-Reset</h2>

  <p>
    To reset your data to the initial point, stop your server and delete the data directory within
    the PathFinder directory in your plugins folder.
    <br>
    Assuming that you use a local datastorage (yml, sqlite), this will clear all
    data. For remote datastorages (mongodb, mysql) you need to delete the data in the
    database manually.
  </p>

  <p>
    To backup a state of the plugin, you have to disable the plugin by stopping the server.
    Then you can put, exchange or modify the local data and start the server.
  </p>
  <InfoContainer type="warning">
    Make sure not to break relations between objects. For example, a visualizer
    could reference another visualizer as child. Deleting the child in the raw datastorage will cause
    problems while loading the parent visualizer.
  </InfoContainer>
</template>
<script setup lang="ts">
import InfoContainer from "components/InfoContainer.vue";
</script>
