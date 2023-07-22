# Nodegroups

## What are they?

Nodegroups are a way of adding node behaviour to multiple nodes.
This can mean permission restriction, search terms, findability, discoverability and
everything else I and writers of Addons might find interesting :D

They are not directly visible to players and simply a way of simplifying things.
If you had added all search terms for let's say a restroom to every node in this restroom.
But then you realise that you wrote "toliet" instead of "toilet" as search term, you'd have to
modify every single node manually. Nodegroups speed things up with references. All nodes of the restroom
are in a nodegroup called "RestRoom" and then you can modify the search terms of the group and fix spelling mistakes and
the changes immediately affect all nodes within this group.

Nodegroups do not require to have more than one node. If one specific behaviour should only apply to one specific node
you may want to consider a nodegroup only for this specific node.

On the other hand, nodegroups can contain only contain selected behaviours like a permission node to restrict
them to certain players. Then you can easily combine the groups on one node to archieve the same behaviour

## What can they do

### Display Name  

It's not actually something they can do, but the display name property is used
for discoveries.

### Permission Restriction

You can specify a permission node. Players can only find paths across nodes of this
group if they have the according permissions.

### Search Terms

You can specify a set of strings as search terms. Search terms serve as a way to filter the nodes of the graph
to only those nodes of interest. For example, the search term "toilet" would return all
nodes that are in a group with a search term of name "toilet".

Search terms can then be used in a more complex syntax, like "toilet&!(public|restaurant)",
which can be understood as follows:
- "toilet" -> obviously means we're searching for a toilet
- "&" -> but all toilets have to match the following conditions:
- "!" -> The opposite of what follows
- "(" -> & (and) binds stronger than | (or), why we have to use brackets like in maths with + and *.
- "public" -> only public restrooms
- "|" -> or
- "restaurant" -> restaurant restrooms
- ")"

So a bit more combined:
- "toilet&" -> a toilet that
- "!" -> is not
- "(public | restaurant)" public or in a restaurant.

So we are actually searching for a toilet that is not public or in a restaurant,
or in other words not public and not in a restaurant.

Once you get the hang of it and realize it's just like the oh beloved maths you'll be fine :D
And if not, you still can walk to all nearest toilets and check out if they are public or in a restaurant.

### Navigability

The search terms of the previous section require the node to be navigable. This means, that
the player is allowed to actively find nodes of this group by their search terms.

Later, this concept might also include passive navigability, meaning that you can not find a certain search term but use it
to specify your search.

Example:
- "toilet" is an active search term.
- "public" is a passive search term.

This leads to:
"/find location toilet" -> valid
"/find location public" -> invalid
"/find location toilet&!public" -> valid

In words, your query has to contain at least one active search term.

But this is future yet, feel free to give me some feedback if this feature would be
interesting to you.

### Discoverability

Discoverability decides, if your group can be discovered and shows a title / plays a sound or not.
You can also specify, if groups have to be discovered to be navigable.

### Find Distance

The find distance of your group. It is the radius in blocks that the player have as distance to the node
before he or she discovers or reaches the node.