--
-- PostgreSQL database dump
--

-- Dumped from database version 12.6 (Ubuntu 12.6-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.6 (Ubuntu 12.6-0ubuntu0.20.04.1)

-- Started on 2021-03-29 04:51:42 SAST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE books_api;
--
-- TOC entry 3016 (class 1262 OID 16389)
-- Name: books_api; Type: DATABASE; Schema: -; Owner: pearl
--

CREATE DATABASE books_api WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_ZA.UTF-8' LC_CTYPE = 'en_ZA.UTF-8';


ALTER DATABASE books_api OWNER TO pearl;

\connect books_api

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 3018 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 203 (class 1259 OID 16392)
-- Name: books; Type: TABLE; Schema: public; Owner: pearl
--

CREATE TABLE public.books (
    id integer NOT NULL,
    author text NOT NULL,
    title text NOT NULL,
    rating integer,
    "isbn-10" text,
    "isbn-13" text
);


ALTER TABLE public.books OWNER TO pearl;

--
-- TOC entry 202 (class 1259 OID 16390)
-- Name: books_id_seq; Type: SEQUENCE; Schema: public; Owner: pearl
--

CREATE SEQUENCE public.books_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.books_id_seq OWNER TO pearl;

--
-- TOC entry 3020 (class 0 OID 0)
-- Dependencies: 202
-- Name: books_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pearl
--

ALTER SEQUENCE public.books_id_seq OWNED BY public.books.id;


--
-- TOC entry 205 (class 1259 OID 16403)
-- Name: branch; Type: TABLE; Schema: public; Owner: api_user
--

CREATE TABLE public.branch (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    email character varying(255) NOT NULL
);


ALTER TABLE public.branch OWNER TO api_user;

--
-- TOC entry 204 (class 1259 OID 16401)
-- Name: branch_id_seq; Type: SEQUENCE; Schema: public; Owner: api_user
--

CREATE SEQUENCE public.branch_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.branch_id_seq OWNER TO api_user;

--
-- TOC entry 3021 (class 0 OID 0)
-- Dependencies: 204
-- Name: branch_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: api_user
--

ALTER SEQUENCE public.branch_id_seq OWNED BY public.branch.id;


--
-- TOC entry 207 (class 1259 OID 16414)
-- Name: patrons; Type: TABLE; Schema: public; Owner: api_user
--

CREATE TABLE public.patrons (
    id integer NOT NULL,
    first character varying(100) NOT NULL,
    last character varying(100),
    birthdate date
);


ALTER TABLE public.patrons OWNER TO api_user;

--
-- TOC entry 206 (class 1259 OID 16412)
-- Name: person_id_seq; Type: SEQUENCE; Schema: public; Owner: api_user
--

CREATE SEQUENCE public.person_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.person_id_seq OWNER TO api_user;

--
-- TOC entry 3022 (class 0 OID 0)
-- Dependencies: 206
-- Name: person_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: api_user
--

ALTER SEQUENCE public.person_id_seq OWNED BY public.patrons.id;


--
-- TOC entry 209 (class 1259 OID 16422)
-- Name: rating; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rating (
    id integer NOT NULL,
    id_book bigint,
    id_person bigint,
    review text,
    rating integer
);


ALTER TABLE public.rating OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 16420)
-- Name: rating_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rating_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rating_id_seq OWNER TO postgres;

--
-- TOC entry 3023 (class 0 OID 0)
-- Dependencies: 208
-- Name: rating_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rating_id_seq OWNED BY public.rating.id;


--
-- TOC entry 211 (class 1259 OID 16443)
-- Name: todo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.todo (
    id integer NOT NULL,
    task text,
    status text
);


ALTER TABLE public.todo OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 16441)
-- Name: todo_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.todo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.todo_id_seq OWNER TO postgres;

--
-- TOC entry 3024 (class 0 OID 0)
-- Dependencies: 210
-- Name: todo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.todo_id_seq OWNED BY public.todo.id;


--
-- TOC entry 2858 (class 2604 OID 16395)
-- Name: books id; Type: DEFAULT; Schema: public; Owner: pearl
--

ALTER TABLE ONLY public.books ALTER COLUMN id SET DEFAULT nextval('public.books_id_seq'::regclass);


--
-- TOC entry 2859 (class 2604 OID 16406)
-- Name: branch id; Type: DEFAULT; Schema: public; Owner: api_user
--

ALTER TABLE ONLY public.branch ALTER COLUMN id SET DEFAULT nextval('public.branch_id_seq'::regclass);


--
-- TOC entry 2860 (class 2604 OID 16417)
-- Name: patrons id; Type: DEFAULT; Schema: public; Owner: api_user
--

ALTER TABLE ONLY public.patrons ALTER COLUMN id SET DEFAULT nextval('public.person_id_seq'::regclass);


--
-- TOC entry 2861 (class 2604 OID 16425)
-- Name: rating id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rating ALTER COLUMN id SET DEFAULT nextval('public.rating_id_seq'::regclass);


--
-- TOC entry 2862 (class 2604 OID 16446)
-- Name: todo id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.todo ALTER COLUMN id SET DEFAULT nextval('public.todo_id_seq'::regclass);


--
-- TOC entry 3002 (class 0 OID 16392)
-- Dependencies: 203
-- Data for Name: books; Type: TABLE DATA; Schema: public; Owner: pearl
--

INSERT INTO public.books (id, author, title, rating, "isbn-10", "isbn-13") VALUES (1, 'J.K. Rowling', 'Harry Potter', NULL, NULL, NULL);


--
-- TOC entry 3004 (class 0 OID 16403)
-- Dependencies: 205
-- Data for Name: branch; Type: TABLE DATA; Schema: public; Owner: api_user
--

INSERT INTO public.branch (id, title, email) VALUES (1, 'Hillcrest High School', 'library@hhs.co.za');
INSERT INTO public.branch (id, title, email) VALUES (2, 'Kloof High School', 'library@khs.co.za');


--
-- TOC entry 3006 (class 0 OID 16414)
-- Dependencies: 207
-- Data for Name: patrons; Type: TABLE DATA; Schema: public; Owner: api_user
--

INSERT INTO public.patrons (id, first, last, birthdate) VALUES (1, 'Hugh Blake', 'Pearl', '2016-04-26');
INSERT INTO public.patrons (id, first, last, birthdate) VALUES (2, 'Derek Frank', 'Pearl', '2018-01-16');
INSERT INTO public.patrons (id, first, last, birthdate) VALUES (3, 'Lewis Graham', 'Pearl', '2020-04-07');
INSERT INTO public.patrons (id, first, last, birthdate) VALUES (4, 'Graham', 'Pearl', '1981-10-28');


--
-- TOC entry 3008 (class 0 OID 16422)
-- Dependencies: 209
-- Data for Name: rating; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3010 (class 0 OID 16443)
-- Dependencies: 211
-- Data for Name: todo; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3025 (class 0 OID 0)
-- Dependencies: 202
-- Name: books_id_seq; Type: SEQUENCE SET; Schema: public; Owner: pearl
--

SELECT pg_catalog.setval('public.books_id_seq', 1, true);


--
-- TOC entry 3026 (class 0 OID 0)
-- Dependencies: 204
-- Name: branch_id_seq; Type: SEQUENCE SET; Schema: public; Owner: api_user
--

SELECT pg_catalog.setval('public.branch_id_seq', 2, true);


--
-- TOC entry 3027 (class 0 OID 0)
-- Dependencies: 206
-- Name: person_id_seq; Type: SEQUENCE SET; Schema: public; Owner: api_user
--

SELECT pg_catalog.setval('public.person_id_seq', 4, true);


--
-- TOC entry 3028 (class 0 OID 0)
-- Dependencies: 208
-- Name: rating_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rating_id_seq', 1, false);


--
-- TOC entry 3029 (class 0 OID 0)
-- Dependencies: 210
-- Name: todo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.todo_id_seq', 1, false);


--
-- TOC entry 2864 (class 2606 OID 16400)
-- Name: books books_pkey; Type: CONSTRAINT; Schema: public; Owner: pearl
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (id);


--
-- TOC entry 2866 (class 2606 OID 16411)
-- Name: branch branch_pkey; Type: CONSTRAINT; Schema: public; Owner: api_user
--

ALTER TABLE ONLY public.branch
    ADD CONSTRAINT branch_pkey PRIMARY KEY (id);


--
-- TOC entry 2868 (class 2606 OID 16419)
-- Name: patrons person_pkey; Type: CONSTRAINT; Schema: public; Owner: api_user
--

ALTER TABLE ONLY public.patrons
    ADD CONSTRAINT person_pkey PRIMARY KEY (id);


--
-- TOC entry 2870 (class 2606 OID 16430)
-- Name: rating rating_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rating
    ADD CONSTRAINT rating_pkey PRIMARY KEY (id);


--
-- TOC entry 2872 (class 2606 OID 16451)
-- Name: todo todo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.todo
    ADD CONSTRAINT todo_pkey PRIMARY KEY (id);


--
-- TOC entry 2874 (class 2606 OID 16436)
-- Name: rating fk_book; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rating
    ADD CONSTRAINT fk_book FOREIGN KEY (id_book) REFERENCES public.books(id);


--
-- TOC entry 2873 (class 2606 OID 16431)
-- Name: rating fk_person; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rating
    ADD CONSTRAINT fk_person FOREIGN KEY (id_person) REFERENCES public.patrons(id);


--
-- TOC entry 3017 (class 0 OID 0)
-- Dependencies: 3016
-- Name: DATABASE books_api; Type: ACL; Schema: -; Owner: pearl
--

GRANT ALL ON DATABASE books_api TO api_user;


--
-- TOC entry 3019 (class 0 OID 0)
-- Dependencies: 203
-- Name: TABLE books; Type: ACL; Schema: public; Owner: pearl
--

GRANT SELECT,INSERT,UPDATE ON TABLE public.books TO api_user;


-- Completed on 2021-03-29 04:51:42 SAST

--
-- PostgreSQL database dump complete
--

