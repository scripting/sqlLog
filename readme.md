# sqlLog

Builds on davesql package, adds a very simple log table to your database, and provides a way to get back a list of recent operations. 

### The log table

```SQLcreate table log (	id int auto_increment primary key, 	eventName varchar (255) not null default '',	eventError varchar (1023) not null default '',	eventData json,	whenCreated datetime not null default current_timestamp	);```

### Queries that work

```SQLSELECT id,	eventData,	DATE_FORMAT(whenCreated, '%h:%i%p') AS 'when'FROM logWHERE eventName = 'connect'ORDER BY id DESCLIMIT 20;```

