CREATE DATABASE database_links;

USE database_links;

CREATE TABLE users(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL
);

CREATE TABLE links(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    title VARCHAR(150) NOT NULL,
    url VARCHAR(255) NOT NULL,
    description TEXT,
    user_id INT(11),
    create_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

