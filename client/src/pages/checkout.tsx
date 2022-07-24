import React from 'react'
import { Layout } from '../components/Layout'
import { StripeCheckout } from '../components/stripecheckout'

interface checkoutProps { }

const Checkout: React.FC<checkoutProps> = ({ }) => {

    return (
        <Layout>
            <StripeCheckout />
        </Layout>
    )
}

export default Checkout