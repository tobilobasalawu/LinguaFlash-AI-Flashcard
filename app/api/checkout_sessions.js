//This will handle our Stripe checkout process
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { isAuthenticated } from '../auth/authMiddleware' // You'd need to create this

const formatAmountForStripe = (amount, currency) => {
  return Math.round(amount * 100)
 }

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
})

export async function POST(req) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const params = {
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Pro subscription',
            },
            unit_amount: formatAmountForStripe(10, 'usd'), // $10.00
            recurring: {
              interval: 'month',
              interval_count: 1,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${req.headers.get(
        'Referer',
      )}result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get(
        'Referer',
      )}result?session_id={CHECKOUT_SESSION_ID}`,
    }
    
    const checkoutSession = await stripe.checkout.sessions.create(params)
    
    return NextResponse.json(checkoutSession, {
      status: 200,
    })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return new NextResponse(JSON.stringify({ error: { message: error.message } }), {
      status: 500,
    })
  }
}

export async function GET(req) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Fetch Stripe account details
    const account = await stripe.accounts.retrieve();
    
    // Fetch recent payments (adjust limit as needed)
    const payments = await stripe.paymentIntents.list({ limit: 10 });

    return NextResponse.json({
      account: {
        id: account.id,
        business_type: account.business_type,
        charges_enabled: account.charges_enabled,
        payouts_enabled: account.payouts_enabled,
        // Add other relevant account details
      },
      recentPayments: payments.data.map(payment => ({
        id: payment.id,
        amount: payment.amount,
        status: payment.status,
        created: payment.created,
        // Add other relevant payment details
      }))
    })
  } catch (error) {
    console.error('Error retrieving Stripe account and payment details:', error)
    return NextResponse.json({ error: { message: error.message } }, { status: 500 })
  }
}