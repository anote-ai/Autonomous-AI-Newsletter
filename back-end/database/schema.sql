# create schema newsLetter;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    company_name VARCHAR(255),
    news_letter_detail VARCHAR(255),
    industry VARCHAR(255)
);

INSERT INTO users (company_name, news_letter_detail, industry)
VALUES (NULL, NULL, NULL);