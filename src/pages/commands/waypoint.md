# Waypoint Command

## Waypoint Selector

The waypoint selector works like all vanilla selectors.
You use the format `@n[here come conditions]`, where your conditions decide
which nodes to select.
An example would be `@n[id=2]` or `@n[distance=..3]`.

::: tip
Minecraft is by now (1.19.3) not capable of handling proper customized arguments.
Therefore, all waypoint selectors must be in quotes.
`@n[distance=..3]` must therefore be `"@n[distance=..3]"`

Annoying? Yeah, I think so too :P I made
a [feature request](https://feedback.minecraft.net/hc/en-us/community/posts/8241302508941-Custom-Arguments-for-Plugin-Development)
and maybe one day
we will finally have proper command arguments!
:::

Possible Conditions:

Condition | Values      | Description                                       | Example
--- |-------------|---------------------------------------------------| ---
ID | NumberRange | Database ID of nodes, every node has a unique ID. | `1..2`, `1`, `-10..`
Offset | Number | Does not filter nodes, only removes a leading amount of nodes from the selection | `1`, `2`, `10`
Limit | Number | Does not filter nodes, only limits the selection to a certain amount of nodes | `1`, `5`, `10`
Distance | NumberRange | Filters nodes by distance to the executor | `..10`, `3`
Sort | `nearest`, `furthest`, `random`, `arbitrary` | Sorts the selection by the given type.
World | World | Filter nodes by their locations world | `world`, `hogwarts`
Group | NamespacedKey | Filter nodes by their according groups | `pathfinder:third_floor`

## Subcommands

### Show Waypoint Info

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

---

### List Waypoints

<br>
<PermissionBadge permission="pathfinder.command.waypoint.list"></PermissionBadge>
<CmdLine>
  /pf listnodes
  <CmdArg :index="0" type="nodes"></CmdArg>
  <CmdArg :index="1" type="page" optional></CmdArg>
</CmdLine>

Lists all described waypoints. Use a waypoint selector to describe your selection.
Use `"@n"` to show all nodes from all roadmaps. Click an entry to view its details.

---

### Create Waypoints

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

---

### Delete Waypoints

<br>
<PermissionBadge permission="pathfinder.command.waypoint.delete"></PermissionBadge>
<CmdLine>
  /pf deletenodes delete
  <CmdArg :index="0" type="nodes"></CmdArg>
</CmdLine>

Deletes all specified nodes. Be careful with this one!
`/wp delete "@n"` will delete EVERY SINGLE NODE from EVERY roadmap on the
server. Which might not be what you were aiming for.

---

### Teleport Waypoints

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

---

### Connect Waypoints with Edges

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

```
1  -> 2
1  -> 3
1  -> 4
2  -> 2 X
2 <-> 3
2  -> 4
3  -> 3 X
3  -> 4
```

---

### Disconnect Edges

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

---

### Modifying Groups

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
