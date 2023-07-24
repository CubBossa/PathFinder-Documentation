<template>
  <h1>Guide</h1>

  <p>
    This guide is a work-along guide to set up a roadmap for a town with discoverable points
    of interest and search terms for proper navigation.
  </p>

  <p>
    Your players will be able to find the shortest path to any location within your roadmap easily.
    <br>
    If you have any problems with the plugin, check out <a href="https://discord.gg/wDecCCRXFv">our discord server</a>
    and ask for help!
  </p>

  <h2>Preparations</h2>

  <p>
    There is not much to do. <a href="/getting_started/installation">Install the plugin</a> first and start up your
    server.
    <br>
    In your plugins folder a directory with name "PathFinder" will appear. It contains all data and configuration files.
  </p>
  <p>
    To get started, the default <a href="/getting_started/configuration">configuration</a> should be sufficient, but
    feel free to
    have a look at it and change the settings to your liking.
  </p>
  <p>
    Join your server and follow along with the steps below.
  </p>

  <h2>Edit Mode</h2>

  <p>
    The editmode is the most efficient way to quickly setup the graph of waypoints and connections.
    You can start it for single groups of waypoints or for all waypoints. Lets start by editing all waypoints.
  </p>
  <p>
    Do this by entering
  </p>
  <CmdLine>
    /pathfinder editmode
  </CmdLine>
  <br>
  <p>
    You will notice, that parts of your hotbar have changed to a hotbar menu.
    We will use this menu to create and modify waypoints, edges and nodegroups.
  </p>

  <h2>Create Waypoints</h2>

  <p>
    Let's use the node tool to create a waypoint. To do this, select the node tool and right click any
    block. The location of the clicked block will be used as waypoint position and a green block
    appears.
  </p>
  <p>
    Let's place some more. You will notice, that already edges appear between your new waypoints.
    <br>
    The node tool always places a chain of nodes, meaning that every new node will be connected to the last node.
    If you want to place a node without connection to the previous, left-click first.
    <br>
    Left-click will always cancel the current process, like creating a chain.
  </p>
  <p>
    To start a chain from an existing node, simply right-click the node with the tool.
  </p>
  <q-img src="../images/guide_nodes.png" width="50%" class="centered-img shadow-10 rounded-img q-mb-lg"/>

  <h2>Create Edges</h2>
  <p>
    Apparently, you have already created some edges.
    <br>
    There are some more things to note about edges though.
  </p>
  <p>
    Edges connect one node to another. So for every red particle line, you actually created two edges. One from start to
    end and one from end to start.
  </p>
  <p>
    This is the reason for the two orange blocks that are positioned along the edge. These blocks are your edge
    controllers
    and by left-clicking them with your node-tool you can simply remove one of the two edges.
    <br>
    You will notice, that your edge then goes from red to blue. The gradient indicates the move direction. The shortest
    path can only ever go from red to blue, never from blue to red.
  </p>
  <p>
    If you removed one of the two edges, you can get it back by just connecting the two nodes again.
  </p>

  <InfoContainer type="tip" class="q-my-lg">
    For a little more fine-tune, you can switch to the item in your fifth item slot, which is simply a toggle for
    directed edges. Turn it on to make sure that every new edge is directed and does not go in both directions.
  </InfoContainer>

  <q-img src="../images/guide_edges.png" width="50%" class="centered-img shadow-10 rounded-img q-mb-lg"/>

  <h2>Defining Node Groups</h2>

  <p>
    Well, there we have our graph. But it cannot do much yet.
    <br>
    Let's add some functionality.
  </p>

  <p>
    Nodegroups are modifiers for multiple waypoints.
    Assign a group to make a waypoint findable, discoverable, add a permission check and more.
    If a group applies to multiple waypoints, the behaviour of all contained waypoints can be
    changed by altering the group.
  </p>
  <p>
    Use the following command to create a new group.
  </p>
  <CmdLine>
    /pf creategroup
    <CmdArg :index="0" type="nskey" label="group-name"></CmdArg>
  </CmdLine>

  <p>
    I will call my tutorial group "target", but you can use whatever name you like.
  </p>

  <CmdLine>
    /pf creategroup
    <CmdArg :index="0" noWrapper type="nskey" label="target"></CmdArg>
  </CmdLine>

  <p>
    Let's see if our group is available:
  </p>
  <CmdLine>/pf listgroups</CmdLine>

  <p>
    And indeed, our group was successfully created.
  </p>

  <q-img src="../images/nodegroup_exists.png" width="70%" class="centered-img shadow-10 rounded-img q-mb-lg"/>

  <p>
    You might wonder two things: What is pathfinder:global and what does weight mean.
  </p>
  <p>
    The global group is just this - a group that contains every node. It is just a simple way to access all nodes at once.
    The weight defines, which group is considered more important. Lets say, one node has two groups applied: global and target.
    <br>
    If both groups want to apply a certain behaviour, that can only be applied once, the group with the highest weight wins.
  </p>
  <h2>Assigning Nodes to Groups</h2>
  <p>
    To add a waypoint to a group, select the "Assign Group" tool and right-click the according
    waypoint. A menu will open up that contains all nodegroups. Choose your nodegroup.
    The name of the group will appear above the according node as long as you look in its direction and have either the group
    tool or the multi tool in your hand.
  </p>

  <q-img src="../images/group_name_display.png" class="centered-img shadow-10 rounded-img q-mb-lg" width="60%"/>

  <h2>Add Search Terms</h2>

  <p>
    Search terms are, what is used to find certain nodes. If a node has the search term "freecookies", players can use
    <CmdLine inline>/find freecookies</CmdLine>, to quickly navigate to that node.
  </p>
  <p>
    You cannot add search terms to single nodes though, which would be a horrible amount of work. Instead, we apply search
    terms to a group and add nodes to this group.
  </p>
  <p>
    Search terms are one of many group modifiers that change the behaviour of all nodes within this group.
    The syntax for all modifiers is roughly the following
  </p>

  <CmdLine>
    /pf group
    <CmdArg :index="0" type="nodegroup" label="group"></CmdArg>
    set|unset
    <CmdArg :index="1" type="mod" label="modifier"></CmdArg>
    <CmdArg :index="2" type="args" label="args"></CmdArg>
  </CmdLine>

  <p>
    You always set the whole list of search terms. There is no "add", "remove" or "clear" - just "set" and "unset".
    <br>
    Separate multiple search terms with a ",". Dont use spaces, instead use underscore ("_").
    <br>
    Like so:
  </p>
  <CmdLine>
    /pf group
    <CmdArg :index="0" noWrapper type="nodegroup" label="pathfinder:target"></CmdArg>
    set search-terms
    <CmdArg :index="1" noWrapper type="str" label="freecookies,no_spaces"></CmdArg>
  </CmdLine>

  <h2>Visualizers</h2>

  Before we can start to find our group, we may want to create a path visualizer.
  As the name already indicates, a path visualizer will create any kind of visualization
  for the shortest path to our target.
  This can practically be anything from particles to a villager that shows you the way or
  a compass in hand that always points into the right direction.

  There are some default visualizers that come with the plugin by itself, but developers
  are highly encouraged to try and implement some by themselves and share them with the community! :D

  <h2>Create a Visualizer</h2>

  To create a visualizer, we first have to choose a type.
  To keep things simple, we will use a particle visualizer.

  <CmdLine>
    /visualizer create
    <CmdArg :index="0" type="vis-type" label="type"></CmdArg>
    <CmdArg :index="1" type="string" label="name"></CmdArg>
  </CmdLine>
  <CmdLine>
    /visualizer create
    <CmdArg :index="0" noWrapper type="vis-type" label="pathfinder:particle"></CmdArg>
    <CmdArg :index="1" noWrapper type="string" label="hearts"></CmdArg>
  </CmdLine>

  Once we created our first visualizer, lets assign it to our roadmap and check out how it looks.

  <CmdLine>
    /roadmap edit
    <CmdArg :index="0" noWrapper type="roadmap" label="pathfinder:town"></CmdArg>
    visualizer
    <CmdArg :index="1" noWrapper type="vis" label="pathfinder:hearts"></CmdArg>
  </CmdLine>

  We can use the ``/find`` command to start a navigation from our current location to the first node
  that matches the according search-term.

  <CmdLine>
    /find
    <CmdArg :index="0" noWrapper type="string" label="target"></CmdArg>
  </CmdLine>

  Et voilà, our first path appears.

  ![path](../images/guide_05_find.png)

  I will quickly build a more complex setup to show that /find will actually use the shortest path.

  ![shortest path](../images/guide_06_shortest_path.png)

  <h2>Changing particles</h2>

  You can change the settings of a visualizer all to your likings. Have a closer look at the
  pages of this wiki if you want a detailed list of all properties and how they affect the outcome.

  To end this short guide to get started with the plugin, I will set the particles for our
  visualizer to actual hearts.

  <CmdLine>
    /visualizer edit particle
    <CmdArg :index="0" noWrapper type="vis" label="pathfinder:hearts"></CmdArg>
    particle
    <CmdArg :index="1" noWrapper type="nskey" label="minecraft:hearts"></CmdArg>
  </CmdLine>
</template>

<script setup lang="ts">
import CmdLine from 'components/CmdLine.vue';
import CmdArg from 'components/CmdArg.vue';
import InfoContainer from 'components/InfoContainer.vue';
</script>
