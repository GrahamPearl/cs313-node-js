CREATE ROLE api_user WITH LOGIN PASSWORD 'password';

ALTER ROLE api_user CREATEDB;

CREATE DATABASE books_api;
\c books_api;

CREATE TABLE branch (
  ID SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
);


INSERT INTO branch (title, email)
VALUES  ('Hillcrest High School', 'library@hhs.co.za'),
	('Kloof High School', 'library@khs.co.za');


CREATE TABLE person
(
	id SERIAL PRIMARY KEY NOT NULL,
	first VARCHAR(100) NOT NULL,
	last VARCHAR(100),
	birthdate date
);


INSERT INTO person(first, last, birthdate) VALUES
  ('Hugh Blake', 'Pearl', '2016-04-26'),
  ('Derek Frank', 'Pearl', '2018-01-16'),
  ('Lewis Graham', 'Pearl', '2020-04-07');


GRANT SELECT, INSERT, UPDATE ON person TO api_user;
GRANT USAGE, SELECT ON SEQUENCE person_id_seq TO api_user;


CREATE TABLE books (
  ID SERIAL PRIMARY KEY,
  author VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL
);

INSERT INTO books (author, title)
VALUES  ('J.K. Rowling', 'Harry Potter');

GRANT SELECT, INSERT, UPDATE ON books TO api_user;
GRANT USAGE, SELECT ON SEQUENCE books_id_seq TO api_user;
