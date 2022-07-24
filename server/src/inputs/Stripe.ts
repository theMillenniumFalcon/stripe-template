import { InputType, Field } from "type-graphql"

@InputType()
export class StripeInput {
    @Field()
    source: string
}