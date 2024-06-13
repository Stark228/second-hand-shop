CREATE DATABASE secondhand;

CREATE TABLE furniture(
    furn_id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    price VARCHAR(255),
    location VARCHAR(255),
    number VARCHAR(255),
    used VARCHAR(255),
    reason VARCHAR(255),
    image VARCHAR(255),
    category VARCHAR(255)
)

CREATE TABLE feedback(
    feed_id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    number VARCHAR(255),
    feedback VARCHAR(255)
)