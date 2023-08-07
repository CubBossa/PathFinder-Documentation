<template>
  <h1>Waypoint Command</h1>

  <h2>Waypoint Selector</h2>

  <p>
    The waypoint selector works like all vanilla selectors.
    You use the format <CodeElement>@n[here come conditions]</CodeElement>, where your conditions decide
    which nodes to select.
    An example would be <CodeElement>@n[id=2]</CodeElement> or <CodeElement>@n[distance=..3]</CodeElement>.
  </p>

  <InfoContainer type="tip">
    Minecraft is by now (1.19.3) not capable of handling proper customized arguments.
    Therefore, all waypoint selectors must be in quotes.
    <CodeElement>@n[distance=..3]</CodeElement> must therefore be <CodeElement>"@n[distance=..3]"</CodeElement>

    Annoying? Yeah, I think so too :P I made
    a <a href="https://feedback.minecraft.net/hc/en-us/community/posts/8241302508941-Custom-Arguments-for-Plugin-Development">feature
    request</a>
    and maybe one day
    we will finally have proper command arguments!
  </InfoContainer>

  <p>
    <b>Possible Conditions:</b>
  </p>

  <table>
    <tr>
      <th>Condition</th>
      <th>Values</th>
      <th>Description</th>
      <th>Example</th>
    </tr>
    <tr>
      <td>ID</td>
      <td>NumberRange</td>
      <td>Database ID of nodes, every node has a unique ID.</td>
      <td><CodeElement>1..2</CodeElement>, <CodeElement>1</CodeElement>, <CodeElement>-10..</CodeElement></td>
    </tr>
    <tr>
      <td>Offset</td>
      <td>Number</td>
      <td>Does not filter nodes, only removes a leading amount of nodes from the selection</td>
      <td><CodeElement>1</CodeElement>, <CodeElement>2</CodeElement>, <CodeElement>10</CodeElement></td>
    </tr>
    <tr>
      <td>Limit</td>
      <td>Number</td>
      <td>Does not filter nodes, only limits the selection to a certain amount of nodes</td>
      <td><CodeElement>1</CodeElement>, <CodeElement>5</CodeElement>, <CodeElement>10</CodeElement></td>
    </tr>
    <tr>
      <td>Distance</td>
      <td>NumberRange</td>
      <td>Filters nodes by distance to the executor</td>
      <td><CodeElement>..10</CodeElement>, <CodeElement>3</CodeElement></td>
    </tr>
    <tr>
      <td>Sort</td>
      <td><CodeElement>nearest</CodeElement>, <CodeElement>furthest</CodeElement>, <CodeElement>random</CodeElement>, <CodeElement>arbitrary</CodeElement></td>
      <td>Sorts the selection by the given type.</td>
      <td></td>
    </tr>
    <tr>
      <td>World</td>
      <td>World</td>
      <td>Filter nodes by their locations world</td>
      <td><CodeElement>world</CodeElement>, <CodeElement>hogwarts</CodeElement></td>
    </tr>
    <tr>
      <td>Group</td>
      <td>NamespacedKey</td>
      <td>Filter nodes by their according groups</td>
      <td><CodeElement>pathfinder:third_floor</CodeElement></td>
    </tr>
  </table>

  <h2>Subcommands</h2>

  <h3>Show Waypoint Info</h3>

  <br>
  <PermissionBadge permission="pathfinder.command.waypoint.info"></PermissionBadge>
  <CmdLine>
    /pf nodes
    <CmdArg :index="0" type="nodes"></CmdArg>
    info
  </CmdLine>

  Shows some information on the given waypoint. Use a waypoint selector, but
  make sure to only select one node. Otherwise a list will be shown. Click a
  waypoint in the list to show its details.

  <q-separator/>

  <h3>List Waypoints</h3>

  <br>
  <PermissionBadge permission="pathfinder.command.waypoint.list"></PermissionBadge>
  <CmdLine>
    /pf listnodes
    <CmdArg :index="0" type="nodes"></CmdArg>
    <CmdArg :index="1" type="page" optional></CmdArg>
  </CmdLine>

  Lists all described waypoints. Use a waypoint selector to describe your selection.
  Use <CodeElement>"@n"</CodeElement> to show all nodes from all roadmaps. Click an entry to view its details.

  <q-separator/>

  <h3>Create Waypoints</h3>

  <br>
  <PermissionBadge permission="pathfinder.command.waypoint.create"></PermissionBadge>
  <CmdLine>
    /pf createnode
    <CmdArg :index="0" type="node-type" optional></CmdArg>
    <CmdArg :index="1" type="location" optional></CmdArg>
  </CmdLine>

  Create a new waypoint. Supply a roadmap, because every waypoint has to be part
  of one roadmap. Optionally, you can specify a node type. In most cases, your server
  will have only one node type, which is the default type provided by the PathFinder plugin
  itself. Other plugins can register new node types, like a shop node if you want to
  navigate to shops within your roadmap.
  Also, you may want to provide x, y and z coordinates, otherwise the players position
  will be used.

  <q-separator/>

  <h3>Delete Waypoints</h3>

  <br>
  <PermissionBadge permission="pathfinder.command.waypoint.delete"></PermissionBadge>
  <CmdLine>
    /pf deletenodes delete
    <CmdArg :index="0" type="nodes"></CmdArg>
  </CmdLine>

  Deletes all specified nodes. Be careful with this one!
  <CodeElement>/wp delete "@n"</CodeElement> will delete EVERY SINGLE NODE from EVERY roadmap on the
  server. Which might not be what you were aiming for.

  <q-separator/>

  <h3>Teleport Waypoints</h3>

  <br>
  <PermissionBadge permission="pathfinder.command.waypoint.tp"></PermissionBadge>
  <CmdLine>
    /pf nodes
    <CmdArg :index="0" type="nodes"></CmdArg>
    tp
    <CmdArg :index="1" type="location"></CmdArg>
  </CmdLine>

  Teleport a selection of waypoints to a certain location.
  <br>
  <PermissionBadge permission="pathfinder.command.waypoint.tphere"></PermissionBadge>
  <CmdLine>
    /pf nodes
    <CmdArg :index="0" type="nodes"></CmdArg>
    tphere
  </CmdLine>

  Teleport a selection of waypoints to your current location.

  <q-separator/>

  <h3>Connect Waypoints with Edges</h3>

  <br>
  <PermissionBadge permission="pathfinder.command.waypoint.connect"></PermissionBadge>
  <CmdLine>
    /pf nodes
    <CmdArg :index="0" type="nodes" label="from"></CmdArg>
    connect
    <CmdArg :index="1" type="nodes" label="to"></CmdArg>
  </CmdLine>

  Connects a selection of waypoints with a selection of other waypoints.
  This means, that every single waypoint from the first selection will become
  connected to every single waypoint from the second selection.
  10 waypoints in the first and 10 in the second will make 100 edges! Keep in mind.

  If the selections overlap, bidirectional edges will be created, meaning that
  a connection in both directions is being established.

  <br>
  <CmdLine>
    /pf nodes
    <CmdArg :index="0" type="example" label='"@n[id=1..3]"'></CmdArg>
    connect
    <CmdArg :index="1" type="example" label='"@n[id=2..4]"'></CmdArg>
  </CmdLine>

  <div class="q-pb-xl">
    <CodeElement block>
      1 -> 2<br>
      1 -> 3<br>
      1 -> 4<br>
      2 -> 2 X<br>
      2 &lt;-> 3<br>
      2 -> 4<br>
      3 -> 3 X<br>
      3 -> 4<br>
    </CodeElement>
  </div>

  <q-separator/>

  <h3>Disconnect Edges</h3>

  <br>
  <PermissionBadge permission="pathfinder.command.waypoint.disconnect"></PermissionBadge>
  <CmdLine>
    /pf nodes
    <CmdArg :index="0" type="nodes" label="from"></CmdArg>
    disconnect
    <CmdArg :index="1" type="nodes" label="to"></CmdArg>
  </CmdLine>

  Disconnects a selection of nodes from another selection of nodes.
  It works exactly like the connect command but in reverse, read about connect
  for further information.

  <q-separator/>

  <h3>Modifying Groups</h3>

  <br>
  <PermissionBadge permission="pathfinder.command.waypoint.add_group"></PermissionBadge>
  <CmdLine>
    /pf nodes
    <CmdArg :index="0" type="nodes"></CmdArg>
    groups add
    <CmdArg :index="1" type="nodegroup"></CmdArg>
  </CmdLine>
  <br>
  <PermissionBadge permission="pathfinder.command.waypoint.remove_group"></PermissionBadge>
  <CmdLine>
    /pf nodes
    <CmdArg :index="0" type="nodes"></CmdArg>
    groups remove
    <CmdArg :index="1" type="nodegroup"></CmdArg>
  </CmdLine>
  <br>
  <PermissionBadge permission="pathfinder.command.waypoint.clear_groups"></PermissionBadge>
  <CmdLine>
    /pf nodes
    <CmdArg :index="0" type="nodes"></CmdArg>
    groups clear
  </CmdLine>

  Allows you to modify the node groups of a selection of waypoints.
  Groups apply different behaviours to waypoints and waypoints can be in multiple groups
  that are not being restricted to roadmaps.

  Read about [Nodegroups](/concept/nodegroups.html) for more information
</template>
<script setup lang="ts">
import PermissionBadge from "components/PermissionBadge.vue";
import CmdLine from "components/CmdLine.vue";
import CmdArg from "components/CmdArg.vue";
import InfoContainer from "components/InfoContainer.vue";
import CodeElement from "components/CodeElement.vue";
</script>
