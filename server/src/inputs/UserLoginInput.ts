import { InputType, Field } from "type-graphql"

@InputType()
export class UserLoginInput {
    @Field()
    username: string

    @Field()
    password: string
}