import { Arg, Ctx, Mutation, Resolver } from "type-graphql"
import { Context } from "../types/types"
import { User } from "../entities/User"
import { StripeResponse } from "../responses/StripeResponse"
import { StripeInput } from "../inputs/Stripe"
import Stripe from 'stripe'
import { stripe } from "../utils/stripe"

@Resolver(User)
export class StripeResolver {

    // * CREATE SUBSCRIPTION
    @Mutation(() => StripeResponse)
    async createSubscription(
        @Arg('options') options: StripeInput,
        @Ctx() { req }: Context
    ): Promise<StripeResponse | User> {
        if (!req.session || !req.session.userId) {
            return {
                errors: [{
                    field: 'user',
                    message: "you need to login first"
                }]
            }
        }

        const user = await User.findOne(req.session.userId)

        if (!user) {
            return {
                errors: [{
                    field: 'user',
                    message: "that user doesn't exist"
                }]
            }
        }

        const source = options.source

        const params: Stripe.CustomerCreateParams = {
            email: user.email,
            source
        }

        const customer: Stripe.Customer = await stripe.customers.create(params)

        user.stripeId = customer.id
        user.type = "paid"
        await user.save()

        return user
    }
}