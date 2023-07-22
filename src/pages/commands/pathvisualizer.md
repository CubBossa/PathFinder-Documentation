# Path Visualizer Command

## Info
<PermissionBadge permission="todo.todo.todo"></PermissionBadge>
<CmdLine>
/pf visualizer
<CmdArg :index="0" type="vis"></CmdArg>
info
</CmdLine>

## List
<PermissionBadge permission="todo.todo.todo"></PermissionBadge>
<CmdLine>
/pf listvisualizers
<CmdArg :index="0" type="page" optional></CmdArg>
</CmdLine>

## Create
<PermissionBadge permission="todo.todo.todo"></PermissionBadge>
<CmdLine>
/pf createvisualizer
<CmdArg :index="0" type="string" label="name"></CmdArg>
</CmdLine>

## Delete
<PermissionBadge permission="todo.todo.todo"></PermissionBadge>
<CmdLine>
/pf deletevisualizer
<CmdArg :index="0" type="vis"></CmdArg>
</CmdLine>

## Set Attribute
<PermissionBadge permission="todo.todo.todo"></PermissionBadge>
<CmdLine>
/pf visualizer
<CmdArg :index="0" type="vis"></CmdArg>
set
<CmdArg :index="1" type="string" label="attribute"></CmdArg>
<CmdArg :index="2" type="string" label="values"></CmdArg>
</CmdLine>