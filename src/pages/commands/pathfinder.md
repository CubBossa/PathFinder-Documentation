# Pathfinder Command

### Plugin Info
<br>
<PermissionBadge permission="pathfinder.command.info"></PermissionBadge>
<CmdLine>
  /pf info
</CmdLine>

Prints some information about your current running version.

::: tip
It is advised to check that you are running the latest version of PathFinder before reporting bugs. 
:::

---

### Help

<PermissionBadge permission="pathfinder.command.help"></PermissionBadge>
<CmdLine>
/pf help
</CmdLine>

Gives you a short instruction on how to use the plugin. For a more detailed overview check out the [Concept Section](/concept) of this wiki.

---

### Editmode
<br>
<PermissionBadge permission="pathfinder.command.editmode"></PermissionBadge>
<CmdLine>
  /pf editmode
  <CmdArg :index="0" type="nodegroup" optional></CmdArg>
</CmdLine>

Activates the edit mode for either the global group or a given node group.
In the edit mode, nodes can be viewed, created, deleted, connected and put into groups.

Check out the section about the [edit mode](/getting_started/editmode.html) for more information.

---

### Force Find Nodes
<br>
<PermissionBadge permission="pathfinder.command.roadmap.forcefind"></PermissionBadge>
<CmdLine>
  /pf forcefind
  <CmdArg :index="0" type="player"></CmdArg>
  <CmdArg :index="1" type="discoverable"></CmdArg>
</CmdLine>

Makes a certain player find all provided discoverables. Discoverables, like also explained [here](#), resemble all node
groups that can be discovered.
This does *not* make the player navigate to a certain target. This command is used to make the player discover
locations, so that he then can find them via `/find`, if discovering is a precondition for navigation.

---

### Force Forget Nodes
<br>
<PermissionBadge permission="pathfinder.command.roadmap.forceforget"></PermissionBadge>
<CmdLine>
  /pf forceforget
  <CmdArg :index="0" type="player"></CmdArg>
  <CmdArg :index="1" type="discoverable"></CmdArg>
</CmdLine>

Makes a certain player forget all provided discoverables. Also read [Force Find Nodes](./#force-find-nodes) for more
information.

---

### Data Export

`/pathfinder export <database-type> [<params>]`

Allows you to export specified plugin data into other files. This can be useful to create backups or to share selected elements of your pathfinder plugin with friends.

For example, you may want to share a certain particle visualizer that you have created. Even if you are using sql databases you can easily create ymls of your visualizers to send them to friends or upload them, like I do within the [Examples Section](/not there yet).

---

### Data Import

`/pathfinder import <type> <source>`

For now, there is only one type available. It allows you to copy visualizers from GitHub and load them live.
Again, check out the [Examples Section](/wip) for more information.

:::tip Info
Later, this command is supposed to import all data types from all storage types. It's an easy way of restoring or sharing data.
:::

---

### Reload
<br>
<CmdLine>
  /pathfinder reload
  <CmdArg type="literal" optional label="language | config | effects"></CmdArg>
</CmdLine>

Reload either your languages files, your config file, your effects file or all three of them if no parameter is given.
This command is meant for changes in these files so that you don't have to frequently restart your server. Keep in mind though that not all
config fields may be supported.