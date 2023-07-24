<template>
  <h1>Pathfinder Command</h1>

  <h2> Plugin Info</h2>
  <PermissionBadge permission="pathfinder.command.info"></PermissionBadge>
  <CmdLine>
    /pf info
  </CmdLine>

  <p>
    Prints some information about your current running version.
  </p>

  <InfoContainer type="tip">
    It is advised to check that you are running the latest version of PathFinder before reporting bugs.
  </InfoContainer>

  <h2>Help</h2>

  <PermissionBadge permission="pathfinder.command.help"></PermissionBadge>
  <CmdLine>
    /pf help
  </CmdLine>

  <p>
    Gives you a short instruction on how to use the plugin. For a more detailed overview check out the [Concept
    Section](/concept) of this wiki.
  </p>

  <h2>Editmode</h2>
  <PermissionBadge permission="pathfinder.command.editmode"></PermissionBadge>
  <CmdLine>
    /pf editmode
    <CmdArg :index="0" type="nodegroup" optional></CmdArg>
  </CmdLine>

  <p>
  Activates the edit mode for either the global group or a given node group.
  In the edit mode, nodes can be viewed, created, deleted, connected and put into groups.
  </p>
  <p>
  Check out the section about the [edit mode](/getting_started/editmode.html) for more information.
  </p>

  <h2>Force Find Nodes</h2>
  <PermissionBadge permission="pathfinder.command.roadmap.forcefind"></PermissionBadge>
  <CmdLine>
    /pf forcefind
    <CmdArg :index="0" type="player"></CmdArg>
    <CmdArg :index="1" type="discoverable"></CmdArg>
  </CmdLine>

  <p>
    Makes a certain player find all provided discoverables. Discoverables, like also explained [here](#), resemble all
    node groups that can be discovered.
  </p>
  <p>
    This does *not* make the player navigate to a certain target. This command is used to make the player discover
    locations, so that he then can find them via {{ "/find" }}, if discovering is a precondition for navigation.
  </p>

  <h2>Force Forget Nodes</h2>
  <PermissionBadge permission="pathfinder.command.roadmap.forceforget"></PermissionBadge>
  <CmdLine>
    /pf forceforget
    <CmdArg :index="0" type="player"></CmdArg>
    <CmdArg :index="1" type="discoverable"></CmdArg>
  </CmdLine>

  <p>
    Makes a certain player forget all provided discoverables. Also read [Force Find Nodes](./#force-find-nodes) for more
    information.
  </p>

  <h2>Data Export</h2>

  <p>/pathfinder export &lt;database-type> [&lt;params>]</p>

  <p>
  Allows you to export specified plugin data into other files. This can be useful to create backups or to share
  selected elements of your pathfinder plugin with friends.
  </p><p>
  For example, you may want to share a certain particle visualizer that you have created. Even if you are using sql
  databases you can easily create ymls of your visualizers to send them to friends or upload them, like I do within
  the [Examples Section](/not there yet).
  </p>

  <h2>Data Import</h2>

  <p>/pathfinder import &lt;type> &lt;source>"</p>

  For now, there is only one type available. It allows you to copy visualizers from GitHub and load them live.
  Again, check out the [Examples Section](/wip) for more information.

  <InfoContainer type="info">
    Later, this command is supposed to import all data types from all storage types. It's an easy way of restoring
    or sharing data.
  </InfoContainer>

  <h2>Reload</h2>
  <br>
  <CmdLine>
    /pathfinder reload
    <CmdArg type="literal" optional label="language | config | effects"></CmdArg>
  </CmdLine>

  <p>
  Reload either your languages files, your config file, your effects file or all three of them if no parameter is
  given.
  </p><p>
  This command is meant for changes in these files so that you don't have to frequently restart your server. Keep
  in mind though that not all
  config fields may be supported.
</p>

</template>

<script setup lang="ts">
import CmdLine from 'components/CmdLine.vue';
import PermissionBadge from 'components/PermissionBadge.vue';
import InfoContainer from 'components/InfoContainer.vue';
import CmdArg from 'components/CmdArg.vue';
</script>
