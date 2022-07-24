import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_KEY, {
  apiVersion: '2020-08-27',
})

// const createCustomer = async () => {
//   const params: Stripe.CustomerCreateParams = {
//     description: 'test customer',
//   }

//   const customer: Stripe.Customer = await stripe.customers.create(params)

//   console.log(customer.id)
// }
// createCustomer()