import { InputType, Field } from "type-graphql"

@InputType()
export class UserRegisterInput {
    @Field()
    email: string

    @Field()
    username: string

    @Field()
    password: string
}