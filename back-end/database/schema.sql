# create schema newsLetter;
DROP TABLE IF EXISTS users;


-- CREATE TABLE users (
--     id INTEGER PRIMARY KEY AUTO_INCREMENT,
--     company_name VARCHAR(255),
--     news_letter_detail VARCHAR(255),
--     industry VARCHAR(255)
-- );

-- INSERT INTO users (company_name, news_letter_detail, industry)
-- VALUES (NULL, NULL, NULL);

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
    password_reset_token_expiration TIMESTAMP
);

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

INSERT INTO StripeInfo (user_id, stripe_customer_id, anchor_date) VALUES (2, "natan", CURRENT_TIMESTAMP);


INSERT INTO Subscriptions (stripe_info_id, subscription_id, start_date, paid_user) VALUES (3, "natan", CURRENT_TIMESTAMP, 2);