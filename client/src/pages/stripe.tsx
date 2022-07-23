import { CheckoutForm } from '../components/checkoutform'
import { Wrapper } from '../components/Wrapper'
import { loadStripe, Stripe } from '@stripe/stripe-js'
import { Button, Link } from '@chakra-ui/react'
import { baseURL } from '../constants'

interface stripeProps { }

let stripePromise: Promise<Stripe | null> | null = null

const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe('pk_test_51K4nFJSHzSqBhfAaCgLpBDfdrMVvIXDuXxLIF30IfzakZnonUuQiy33DTBl7fT490PGhQ6tI5ESohqpmBNPuC8wo00MAfkJkZ7')
    }

    return stripePromise
}

const Stripe: React.FC<stripeProps> = ({ }) => {
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
        console.log("Redirect to checkout")
        const stripe = await getStripe()
        const { error } = await stripe!.redirectToCheckout(checkoutOptions as any)
        console.log("Stripe checkout error", error)
    }
    return (
        <Wrapper>
            <Button as={Link} mr={4} onClick={redirectToCheckout}>
                checkout
            </Button>
        </Wrapper>
    )
}

export default Stripe