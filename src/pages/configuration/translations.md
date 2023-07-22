# Translations

All messages of the plugin are read from a language file.
Special is, that translations also include styling, hovering actions and click actions.

This is made possible with the [MiniMessage](https://docs.adventure.kyori.net/minimessage/format.html) text format.
It replaces the old chat component system ("{text: ...}") with easy to use xml tags.

A translation message of
<br>`<gray><red>This is</red> an <b>example</b> text.</gray>`
<br>will look like this:
<br><span style="color: gray"><span style="color: red">This is</span> an <b>example</b> text.</span>

## Keys

Every message has its unique key. The plugin does not refer to the message content but only says
"send the player a message with translation key 'pathfinder.command.find.target_reached'".
Then the translation modules job is to load the translation that you provided in the loaded language file.
It replaces all xml tags and then sends the beautifully formatted message to the player.

This comes in handy later, as you can embed messages within others by using their key.

```yml
some:
  example:
    message: 'My message key is "some.example.message".'

```

## Styles

The look of an app is something that is something that should not be dependent on the translations.
What if you made a very neat style in your en_US.yml translation file and now it comes to you that you'd have
to insert all those tags in the other translation files?
<br>Ok fine, grid your teeth for once.
<br>But what if you have just finished modifying 5 language files and then your friends say: 'Oh i hate the color green,
can you please make it purple?'

You could either search for better friends or you could modify all 5 language files again.

... or you use styles :D
<br>Styles are tag definitions in a separate file.
<br>Like so:

```yml 
# styles.yml

# blueish colors
main: "<#6569EB>"
main_light: "<#A5A7F3>"
main_dark: "<#383EE5>"
```

These definitions can then be used anywhere else, like in your translations:

```yml
some:
  example:
    message: '<main>This message uses styles and <main_light>Highlights'
```

::: tip
You do not have to close tags.
<br>`<green>Example` is a valid message.
<br>But keep in mind that it adds quite a bit of readability, especially for those that are used to xml and html, where closing tags are obligatory.
:::

## Placeholders

MiniMessage offers a variety of placeholders. Check out their wiki for a detailed overview.

PathFinder adds some global placeholders and also some conditional placeholders that only work within the specified message.

### Global Placeholders

<table>
<tr><th>Tag</th> <th>Description</th></tr>
<tr><td>

`<ins:[message-key]>`

</td> <td>

Inserts the message of the given message key as raw string into this message before parsing. If you insert a message with an open tag, this tag will also apply to the following string.

Example:
```yml
message:
  rainbow: '<rainbow>'
  rainbow2: '<rainbow></rainbow>'
  inserted: '---> <ins:message.rainbow>I am rainbow-colored'
  inserted2: '---> <ins:message.rainbow2>I am NOT rainbow-colored'
```

</td></tr>
<tr><td>

`<msg:[message-key]>`

</td> <td>

Inserts the message of the given message key as already parsed component. It will not bleed into the actual message.

Example:
```yml
message:
  prefix: '<main>MyPlugin</main> <dark_gray>|</dark_gray> <gray>'
  example1: '<ins:prefix> Example 1'
  example2: '<msg:prefix> Example 2'
```

Results:
<div style="background-color: #000000dd; padding: 12px; border-radius: 5px; color: white">
<span style="color: purple">MyPlugin</span> <span style="color: #555555">|</span> <span style="color: #aaaaaa">Example 1</span>
<br><span style="color: purple">MyPlugin</span> <span style="color: #555555">|</span> Example 2
</div>

</td></tr>
</table>

## Per Player Languages

This feature is not yet implemented but will come soon. Personalized languages will only work with the
client language or with an addon that defines a players' language. Like if you have a custom language setting on
your server, you can feed it to PathFinder and PathFinder.