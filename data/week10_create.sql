CREATE DATABASE familyhistory;
\c familyhistory;

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

CREATE USER reg_user WITH PASSWORD 'family';
GRANT SELECT, INSERT, UPDATE ON person TO reg_user;
GRANT USAGE, SELECT ON SEQUENCE person_id_seq TO reg_user;
