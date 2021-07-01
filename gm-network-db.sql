--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 13.2

-- Started on 2021-07-01 12:33:20 CEST

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
-- TOC entry 2 (class 3079 OID 16507)
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- TOC entry 3346 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 208 (class 1259 OID 16486)
-- Name: comments; Type: TABLE; Schema: public; Owner: david
--

CREATE TABLE public.comments (
    comment_id integer NOT NULL,
    post_id integer NOT NULL,
    comment_body character varying NOT NULL,
    comment_upvotes integer DEFAULT 0 NOT NULL,
    comment_downvotes integer DEFAULT 0 NOT NULL,
    created_on timestamp without time zone NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.comments OWNER TO david;

--
-- TOC entry 207 (class 1259 OID 16484)
-- Name: comments_comment_id_seq; Type: SEQUENCE; Schema: public; Owner: david
--

ALTER TABLE public.comments ALTER COLUMN comment_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.comments_comment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 206 (class 1259 OID 16466)
-- Name: posts; Type: TABLE; Schema: public; Owner: david
--

CREATE TABLE public.posts (
    post_id integer NOT NULL,
    user_id integer NOT NULL,
    topic_id integer NOT NULL,
    post_title character varying NOT NULL,
    post_body character varying,
    created_on timestamp without time zone NOT NULL
);


ALTER TABLE public.posts OWNER TO david;

--
-- TOC entry 205 (class 1259 OID 16464)
-- Name: posts_post_id_seq; Type: SEQUENCE; Schema: public; Owner: david
--

ALTER TABLE public.posts ALTER COLUMN post_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.posts_post_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 204 (class 1259 OID 16457)
-- Name: topics; Type: TABLE; Schema: public; Owner: david
--

CREATE TABLE public.topics (
    topic_id integer NOT NULL,
    topic_name character varying(100)
);


ALTER TABLE public.topics OWNER TO david;

--
-- TOC entry 203 (class 1259 OID 16455)
-- Name: topics_topic_id_seq; Type: SEQUENCE; Schema: public; Owner: david
--

ALTER TABLE public.topics ALTER COLUMN topic_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.topics_topic_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 209 (class 1259 OID 24581)
-- Name: userpostsread; Type: TABLE; Schema: public; Owner: david
--

CREATE TABLE public.userpostsread (
    user_id integer NOT NULL,
    post_id integer NOT NULL
);


ALTER TABLE public.userpostsread OWNER TO david;

--
-- TOC entry 202 (class 1259 OID 16446)
-- Name: users; Type: TABLE; Schema: public; Owner: david
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    user_email character varying(100) NOT NULL,
    user_name character varying(100) NOT NULL,
    user_pw character varying NOT NULL,
    created_on timestamp without time zone NOT NULL
);


ALTER TABLE public.users OWNER TO david;

--
-- TOC entry 201 (class 1259 OID 16444)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: david
--

ALTER TABLE public.users ALTER COLUMN user_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 3339 (class 0 OID 16486)
-- Dependencies: 208
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: david
--

COPY public.comments (comment_id, post_id, comment_body, comment_upvotes, comment_downvotes, created_on, user_id) FROM stdin;
71	105	Helloqfewfwew	0	0	2021-06-28 17:20:48.462	1
75	105	jihiuhi	0	0	2021-06-29 16:50:32.74	1
76	105	kjhjn	0	0	2021-06-29 16:52:38.553	1
53	75	test comment 1	0	0	2021-05-25 17:45:31.044	27
54	75	test comment 2	0	0	2021-05-25 17:45:37.504	27
55	75	test comment 3	0	0	2021-05-25 17:45:40.671	27
\.


--
-- TOC entry 3337 (class 0 OID 16466)
-- Dependencies: 206
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: david
--

COPY public.posts (post_id, user_id, topic_id, post_title, post_body, created_on) FROM stdin;
105	1	3	enetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas al	\nloremWhatever By D	2021-06-15 23:41:24.016
75	27	3	test post 1	test post 1	2021-05-25 17:45:22.348
123	1	4	32rfqwfwf	wfwwewe	2021-06-30 14:05:39.373
124	1	5	wefwafwa	wafawfa	2021-06-30 14:16:44.517
\.


--
-- TOC entry 3335 (class 0 OID 16457)
-- Dependencies: 204
-- Data for Name: topics; Type: TABLE DATA; Schema: public; Owner: david
--

COPY public.topics (topic_id, topic_name) FROM stdin;
1	Announcements
2	Technical Questions
4	Memes
5	Music
3	General Questions
\.


--
-- TOC entry 3340 (class 0 OID 24581)
-- Dependencies: 209
-- Data for Name: userpostsread; Type: TABLE DATA; Schema: public; Owner: david
--

COPY public.userpostsread (user_id, post_id) FROM stdin;
1	105
1	75
\.


--
-- TOC entry 3333 (class 0 OID 16446)
-- Dependencies: 202
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: david
--

COPY public.users (user_id, user_email, user_name, user_pw, created_on) FROM stdin;
1	david@david.com	david	$2b$10$FO8DhOkZCQKmG4/U6liMROgD69thjK7q6YLNXL5uZ1MTeBeH6Pnj.	2021-04-22 20:09:06.41
26	test1@test.com	test1	$2b$10$wIkukUEq7eSgntYjXqBrjeVqb2PWi5BXXj6dmhTCLR0bFhalET3H2	2021-05-25 17:42:32.188
27	test2@gmail.com	test2	$2b$10$8v08bGtYrVa4mRxrNJzejeK7QNkLZS0.1sC0B0QQREagyADFvw1fy	2021-05-25 17:44:19.613
\.


--
-- TOC entry 3347 (class 0 OID 0)
-- Dependencies: 207
-- Name: comments_comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: david
--

SELECT pg_catalog.setval('public.comments_comment_id_seq', 93, true);


--
-- TOC entry 3348 (class 0 OID 0)
-- Dependencies: 205
-- Name: posts_post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: david
--

SELECT pg_catalog.setval('public.posts_post_id_seq', 124, true);


--
-- TOC entry 3349 (class 0 OID 0)
-- Dependencies: 203
-- Name: topics_topic_id_seq; Type: SEQUENCE SET; Schema: public; Owner: david
--

SELECT pg_catalog.setval('public.topics_topic_id_seq', 5, true);


--
-- TOC entry 3350 (class 0 OID 0)
-- Dependencies: 201
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: david
--

SELECT pg_catalog.setval('public.users_user_id_seq', 29, true);


--
-- TOC entry 3193 (class 2606 OID 16493)
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (comment_id);


--
-- TOC entry 3191 (class 2606 OID 16483)
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (post_id);


--
-- TOC entry 3186 (class 2606 OID 16461)
-- Name: topics topics_pkey; Type: CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.topics
    ADD CONSTRAINT topics_pkey PRIMARY KEY (topic_id);


--
-- TOC entry 3188 (class 2606 OID 16463)
-- Name: topics topics_topic_name_key; Type: CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.topics
    ADD CONSTRAINT topics_topic_name_key UNIQUE (topic_name);


--
-- TOC entry 3195 (class 2606 OID 24585)
-- Name: userpostsread userpostsread_pkey; Type: CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.userpostsread
    ADD CONSTRAINT userpostsread_pkey PRIMARY KEY (user_id, post_id);


--
-- TOC entry 3180 (class 2606 OID 16450)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 3182 (class 2606 OID 16452)
-- Name: users users_user_email_key; Type: CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_user_email_key UNIQUE (user_email);


--
-- TOC entry 3184 (class 2606 OID 16454)
-- Name: users users_user_name_key; Type: CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_user_name_key UNIQUE (user_name);


--
-- TOC entry 3189 (class 1259 OID 32789)
-- Name: fki_posts_user_id_fkey; Type: INDEX; Schema: public; Owner: david
--

CREATE INDEX fki_posts_user_id_fkey ON public.posts USING btree (user_id);


--
-- TOC entry 3198 (class 2606 OID 32774)
-- Name: comments comments_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(post_id) ON DELETE CASCADE;


--
-- TOC entry 3199 (class 2606 OID 32779)
-- Name: comments comments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- TOC entry 3200 (class 2606 OID 32790)
-- Name: userpostsread post_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.userpostsread
    ADD CONSTRAINT post_id_fk FOREIGN KEY (post_id) REFERENCES public.posts(post_id) ON DELETE CASCADE;


--
-- TOC entry 3196 (class 2606 OID 16474)
-- Name: posts posts_topic_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_topic_id_fkey FOREIGN KEY (topic_id) REFERENCES public.topics(topic_id);


--
-- TOC entry 3197 (class 2606 OID 32784)
-- Name: posts posts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- TOC entry 3201 (class 2606 OID 32795)
-- Name: userpostsread user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.userpostsread
    ADD CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


-- Completed on 2021-07-01 12:33:20 CEST

--
-- PostgreSQL database dump complete
--

