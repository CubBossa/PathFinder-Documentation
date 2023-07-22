# What Can You Do?

PathFinder offers a quite extensive API. Not by using a Java interface, but
by directly addressing the corresponding singletons and calling their methods directly.

## Volatile Runtime-Only Context

In contrast to the persistent data explained later, volatile data
only exists until the plugin is disabled.

Why is this useful? 
<br>For example, you could want to implement a maze minigame that includes shortest paths.
You would want to generate a roadmap that disappears as soon as the minigame is over or
the plugin stopped. Your plugin or the PathFinder plugin.

Therefore, you can create Roadmaps, Nodes, Edges, Groups and Visualizers that do not
exist in the database. You can disallow administrators to edit them via edit mode or use commands
to manipulate them.

With this, your data belongs only to you and your minigame and no one can manipulate it except from
other plugins via API. And this is why you should always make sure to only work with data of your own extension 
(which is recognizable via NamespacedKey) and don't mess with other extensions data.


::: tip <b>TL;DR</b>
Data that is not stored in database and gone once the server stops.
Don't mess with other devs data, for example don't iterate over all roadmaps.
Instead, use your plugin namespace to recognize your data.
:::

### Roadmaps

### Nodes, Edges and Groups

### Nodes

## Persistent Context

### Roadmaps

### Nodes, Edges and Groups

### Visualizers

### Complex Search Terms

### New Node-Types

### New Visualizer-Types

