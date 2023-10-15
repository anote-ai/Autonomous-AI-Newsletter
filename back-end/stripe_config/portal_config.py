

import stripe

stripe.api_key = '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'

cancel_configuration = stripe.billing_portal.Configuration.create(
    features={
        'subscription_cancel': {
            'enabled': True,
            'mode': 'at_period_end',
            'proration_behavior': 'none',
        },
    },
    business_profile={
        'headline': 'Nwsltr',
    },
)


# bpc_1O1KTpHylJOoKCxSOiStEiTI
print(cancel_configuration.id)
