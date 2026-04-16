create database authentication;
use authentication;

DROP table users;

create table roles(
	id int auto_increment primary key,
    roleName varchar(50)
);

create table users(
 id int auto_increment primary key,
 email varchar(50),
 pswd varchar(100),
 roleId int,
 userName varchar(50),
 
 constraint fk_userroles
 foreign key (roleId) references roles(id)
);

alter table users modify COLUMN pswd varchar(100);

alter table authentication.users add COLUMN userName VARCHAR(50);
insert into authentication.roles(roleName) VALUES('user'),('admin');

