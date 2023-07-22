# Find Command

The find command is the heart of the plugin. It allows you to query a "shortest path search" to a certain location.

## Structure

The usage of the command is quite simple.
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

You can use the query language to give an exact definition of your target location.

## Query Language

