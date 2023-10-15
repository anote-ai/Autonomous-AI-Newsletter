from datetime import timedelta
from db_enums import PaidUserStatus

kSessionTokenExpirationTime = timedelta(days=90)
kValidationResetExpirationTime = timedelta(minutes=15)
kPasswordResetExpirationTime = timedelta(minutes=15)

EMAIL_WHITELIST = [
    "t.clifford@wustl.edu",
    "vidranatan@gmail.com",
    "raghuwanshi.rajat10@gmail.com"
]

productHashMap = {
    "newsletter1": "price_1O1KHeHylJOoKCxSEE3mEwRN",
    # "sababa2": "price_1Ne91NAuWN19h35KHFQtLZsQ",
    # "sababa3": "price_1Ne90vAuWN19h35Kb3DIpkfu"
}

priceToPaymentPlan = {
    "price_1O1KHeHylJOoKCxSEE3mEwRN" : PaidUserStatus.BASIC_TIER,
    # "price_1Ne91NAuWN19h35KHFQtLZsQ" : PaidUserStatus.STANDARD_TIER,
    # "price_1Ne90vAuWN19h35Kb3DIpkfu" : PaidUserStatus.PREMIUM_TIER
}

planToCredits = {
    PaidUserStatus.FREE_TIER: 0,
    PaidUserStatus.BASIC_TIER: 200,
    PaidUserStatus.STANDARD_TIER: 500,
    PaidUserStatus.PREMIUM_TIER: 1500
}

planToSearches = {
    PaidUserStatus.FREE_TIER: 0,
    PaidUserStatus.BASIC_TIER: 750,
    PaidUserStatus.STANDARD_TIER: 2000,
    PaidUserStatus.PREMIUM_TIER: 6000
}

masterIndex = "linkedintotal"

chatgptLimit = 10000