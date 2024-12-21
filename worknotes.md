#### 12/21/24; 10:55:00 AM by DW

create table log (

id int auto_increment primary key, 

eventName varchar (255) not null default '',

eventError varchar (1023) not null default '',

eventData json,

whenCreated datetime not null default current_timestamp

);

