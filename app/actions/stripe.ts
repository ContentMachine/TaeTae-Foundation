"use server"

import { stripe } from "@/lib/stripe"
import { DONATION_PRODUCTS } from "@/lib/products"

export async function startCheckoutSession(productId: string, donorName: string, amount: number) {
  const product = DONATION_PRODUCTS.find((p) => p.id === productId)
  if (!product) {
    throw new Error(`Product with id "${productId}" not found`)
  }

  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    redirect_on_completion: "never",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            description: product.description,
          },
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    metadata: {
      donorName,
      productId,
    },
  })

  return session.client_secret
}

export async function checkSessionStatus(clientSecret: string) {
  const session = await stripe.checkout.sessions.retrieve(clientSecret)
  return {
    status: session.payment_status,
    customer_email: session.customer_email,
  }
}
