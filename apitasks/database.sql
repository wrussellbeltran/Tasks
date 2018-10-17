CREATE DATABASE IF NOT EXISTS dbtasks;
USE dbtasks;

CREATE TABLE users(
	id 		    int(255) auto_increment not null,
	username	varchar(255),
	created_at  datetime DEFAULT NULL,
	updated_at  datetime DEFAULT NULL,
	CONSTRAINT pk_users PRIMARY KEY(id)
)ENGINE=InnoDb;

CREATE TABLE responsible(
	id 		    	int(255) auto_increment not null,
	name			varchar(255),
	created_at 		datetime DEFAULT NULL,
	updated_at  	datetime DEFAULT NULL,
	CONSTRAINT pk_responsible PRIMARY KEY(id)
)ENGINE=InnoDb;

CREATE TABLE tasks(
	id 		    	int(255) auto_increment not null,
	name			varchar(255),
	responsable_id 	int(255) not null,
	star_date 		datetime DEFAULT NULL,
	end_date 		datetime DEFAULT NULL,
	advance			int(255) not null,
	category		varchar(255),
	created_at 		datetime DEFAULT NULL,
	updated_at  	datetime DEFAULT NULL,
	CONSTRAINT pk_tasks PRIMARY KEY(id)
)ENGINE=InnoDb;

CREATE TABLE sub_tasks(
	id 				int(255) auto_increment not null,
	name			varchar(255),
	task_id			int(255) not null,
	responsable_id	int(255) not null,
	expiration_date	datetime DEFAULT NULL,
	created_at 		datetime DEFAULT NULL,
	updated_at  	datetime DEFAULT NULL,
	CONSTRAINT pk_sub_tasks PRIMARY KEY(id),
	CONSTRAINT fk_sub_tasks_tasks FOREIGN KEY (task_id) REFERENCES tasks(id)
)ENGINE=InnoDb;