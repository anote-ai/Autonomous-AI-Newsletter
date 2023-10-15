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
    "newsletter1": "price_1O1KquHylJOoKCxSizB3Pct1",
    "newsletter2": "price_1O1Kr7HylJOoKCxS5A2GGAGX",
    "newsletter3": "price_1O1KrFHylJOoKCxSPBEFRGeO"
}

priceToPaymentPlan = {
    "price_1O1KquHylJOoKCxSizB3Pct1" : PaidUserStatus.BASIC_TIER,
    "price_1O1Kr7HylJOoKCxS5A2GGAGX" : PaidUserStatus.STANDARD_TIER,
    "price_1O1KrFHylJOoKCxSPBEFRGeO" : PaidUserStatus.PREMIUM_TIER
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