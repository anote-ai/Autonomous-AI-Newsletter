-- create schema newsLetter;
DROP TABLE IF EXISTS Subscriptions;
DROP TABLE IF EXISTS StripeInfo;
DROP TABLE IF EXISTS freeTrialsAccessed;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS freeTrialAllowlist;
DROP TABLE IF EXISTS userDetailPageOne;
DROP TABLE IF EXISTS userDetailPageTwo;
DROP TABLE IF EXISTS userDetailPageThree;
DROP TABLE IF EXISTS userDetailPageFour;
DROP TABLE IF EXISTS AllIdeas;
DROP TABLE IF EXISTS AllNewsletterInfo;
DROP TABLE IF EXISTS BrandVoice;


CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    email VARCHAR(255) UNIQUE NOT NULL,
    google_id VARCHAR(255),
    person_name VARCHAR(255),
    profile_pic_url VARCHAR(255),
    password_hash VARCHAR(255),
    salt VARCHAR(255),
    session_token VARCHAR(255),
    session_token_expiration TIMESTAMP,
    password_reset_token VARCHAR(255),
    password_reset_token_expiration TIMESTAMP,
    verification_token VARCHAR(255),
    verification_token_expiration TIMESTAMP,
    credits INTEGER NOT NULL DEFAULT 0,
    credits_updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

# ALTER TABLE users
#   ADD credits INTEGER NOT NULL DEFAULT 0
#     AFTER verification_token_expiration;
# ALTER TABLE users
#   ADD credits_updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
#     AFTER credits;
# ALTER TABLE users
#   ADD verification_token VARCHAR(255)
#     AFTER password_reset_token_expiration;
# ALTER TABLE users
#   ADD verification_token_expiration VARCHAR(255)
#     AFTER verification_token;

CREATE TABLE StripeInfo (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    user_id INTEGER NOT NULL,
    stripe_customer_id VARCHAR(255),
    last_webhook_received TIMESTAMP,
    anchor_date TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE Subscriptions (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    stripe_info_id INTEGER NOT NULL,
    subscription_id VARCHAR(255) NOT NULL,
    start_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMP, -- NULL if the subscription is active.
    paid_user INTEGER NOT NULL,
    is_free_trial INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (stripe_info_id) REFERENCES StripeInfo(id)
);

CREATE TABLE freeTrialAllowlist (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    email VARCHAR(255),
    token VARCHAR(255),
    max_non_email_count INTEGER NOT NULL DEFAULT 0,
    token_expiration TIMESTAMP
);

CREATE TABLE freeTrialsAccessed (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    free_trial_allow_list_id INTEGER,
    user_id INTEGER,
    FOREIGN KEY (free_trial_allow_list_id) REFERENCES freeTrialAllowlist(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE userDetailPageOne (
    user_id INTEGER not null,
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    `Brand or Company Name` VARCHAR(255),
    `URL` VARCHAR(255),
    `Name of Publication or Newsletter` VARCHAR(255),
    `Newsletter Header Image or Company Logo` VARCHAR(255),
    `Description of Newsletter` TEXT,
    `Business Category` TEXT,
    `colors used on the majority of your branding` VARCHAR(500),
    `List your color palette` VARCHAR(500),
    `Select your font styles` VARCHAR(255)
);

-- INSERT INTO userDetailPageOne (user_id, `Business Category`) VALUES (1, "[]");
CREATE TABLE userDetailPageTwo (
    user_id INTEGER not null,
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    `Which email platform do you use?` VARCHAR(500),
    `How often do you send your newsletter?` VARCHAR(255),
    `Publication Language` VARCHAR(255),
    `Newsletter Size` VARCHAR(255),
    `Audience Demographics` TEXT,
    `Audience Age Range` TEXT,
    `Audience Income Level` TEXT,
    `Do you adhere to a stylistic choice?` TEXT,
    `Does your brand writing style use emojis?` BOOLEAN,
    `YouTube Channel URL` VARCHAR(255),
    `Facebook URL` VARCHAR(255),
    `Instagram URL` VARCHAR(255),
    `Twitter URL` VARCHAR(255),
    `Linkedin URL` VARCHAR(255),
    `Pinterest URL` VARCHAR(255),
    `Shop URL` VARCHAR(255),
    `Portfolio URL` VARCHAR(255),
    `Threads URL` VARCHAR(255)
);

CREATE TABLE userDetailPageThree (
    user_id INTEGER not null,
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    question_id int,
    question_name VARCHAR(500),
    data TEXT
);
CREATE TABLE userDetailPageFour (
    user_id INTEGER not null,
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    question_id int,
    question_name VARCHAR(500),
    data TEXT
);

CREATE TABLE AllIdeas (
    user_id INTEGER not null,
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    subIdea TEXT,
    used boolean DEFAULT false
);

CREATE TABLE AllNewsletterInfo (
    user_id INTEGER not null,
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    theme VARCHAR(255),
    idea_id BIGINT,
    backgroundColor VARCHAR(255),
    character_name VARCHAR(255),
    data TEXT
);

CREATE TABLE BrandVoice (
    user_id INTEGER not null,
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    data TEXT
);

-- INSERT INTO StripeInfo (user_id, stripe_customer_id, anchor_date) VALUES (9, 1, CURRENT_TIMESTAMP);


-- INSERT INTO Subscriptions (stripe_info_id, subscription_id, start_date, paid_user) VALUES (4, 1, CURRENT_TIMESTAMP, 9);