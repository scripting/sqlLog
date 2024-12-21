# sqlLog

Builds on davesql package, adds a very simple log table to your database, and provides a way to get back a list of recent operations. 

### The log table

```SQLcreate table log (	id int auto_increment primary key, 	eventName varchar (255) not null default '',	eventError varchar (1023) not null default '',	eventData json,	whenCreated datetime not null default current_timestamp	);```

