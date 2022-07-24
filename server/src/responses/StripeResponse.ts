import { User } from "../entities/User"
import { Field, ObjectType } from "type-graphql"
import { FieldError } from "../errors/FieldError"

@ObjectType()
export class StripeResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[]

    @Field(() => User, { nullable: true })
    user?: User
}