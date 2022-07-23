import { CheckoutForm } from '../components/checkoutform'
import { useState } from 'react'
import { Wrapper } from '../components/Wrapper'
import { loadStripe, Stripe } from '@stripe/stripe-js'
import { Button, Link } from '@chakra-ui/react'
import { baseURL } from '../constants'

interface stripeProps { }

let stripePromise: Promise<Stripe | null> | null = null

const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)
    }

    return stripePromise
}

const Stripe: React.FC<stripeProps> = ({ }) => {
    const [stripeError, setStripeError] = useState<null | string>(null)
    const [isLoading, setIsLoading] = useState(false)
    const item = {
        price: "price_1LOk10SHzSqBhfAaPjj22BVH",
        quantity: 1
    }

    const checkoutOptions = {
        lineItems: [item],
        mode: "payment",
        successUrl: `${baseURL}/success`,
        cancelUrl: `${baseURL}/cancel`
    }

    const redirectToCheckout = async () => {
        setIsLoading(true)
        console.log("Redirect to checkout")
        const stripe = await getStripe()
        const { error } = await stripe!.redirectToCheckout(checkoutOptions as any)
        console.log("Stripe checkout error", error)

        if (error) {
            setStripeError(error.message as string)
        }
        setIsLoading(false)
    }
    return (
        <Wrapper>
            <Button as={Link} mr={4} onClick={redirectToCheckout} disabled={isLoading}>
                {isLoading ? "Loading..." : 'Checkout'}
            </Button>
        </Wrapper>
    )
}

export default Stripe