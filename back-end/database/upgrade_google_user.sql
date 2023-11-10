-- Define user_id and subscription_id variables
SET @user_id = 1;
SET @subscription_id = "id";

-- Retrieve the id from StripeInfo and set it to stripe_info_id variable
SELECT id INTO @stripe_info_id FROM StripeInfo WHERE user_id=@user_id;

-- Use the @stripe_info_id to delete from Subscriptions
DELETE FROM Subscriptions WHERE stripe_info_id=@stripe_info_id;

-- Insert into Subscriptions table
INSERT INTO Subscriptions (stripe_info_id, subscription_id, start_date, paid_user) 
VALUES (@stripe_info_id, @subscription_id, CURRENT_TIMESTAMP, 3);
