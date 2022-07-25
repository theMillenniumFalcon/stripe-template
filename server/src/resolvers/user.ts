import { UserRegisterInput } from "../inputs/UserRegisterInput"
import { UserLoginInput } from "../inputs/UserLoginInput"
import { Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql"
import { Context } from "../types/types"
import { User } from "../entities/User"
import { UserResponse } from "../responses/UserResponse"
import argon2 from 'argon2'
import { COOKIE } from "../constants/constants";
import { FindOneOptions } from "typeorm"
import { connection } from "../database/dataSource"

@Resolver(User)
export class UserResolver {

    @FieldResolver(() => String)
    email(@Root() user: User, @Ctx() { req }: Context) {
        // * this is the current and its ok to show them their own email
        if (req.session.userId === user.id) {
            return user.email
        }
        // * current user wants to see someone else's email
        return ""
    }

    // * TO CHECK WHICH USER IS LOGGED IN
    @Query(() => User, { nullable: true })
    userLoggedIn(@Ctx() { req }: Context) {
        // * if you are not logged in
        if (!req.session.userId) {
            return null
        }
        const user = connection
            .getRepository(User)
            .createQueryBuilder("user")
            .where("user.id = :id", { id: req.session.userId })
            .getOne()
        return user
    }

    // * REGISTER
    @Mutation(() => UserResponse)
    async register(
        @Arg('options') options: UserRegisterInput,
        @Ctx() { req }: Context
    ): Promise<UserResponse> {
        if (!options.email.includes('@') || !options.email.includes('.com')) {
            return {
                errors: [{
                    field: 'email',
                    message: "please enter a valid email address",
                }]
            }
        }
        if (options.username.length <= 2 || options.username.length >= 10) {
            return {
                errors: [{
                    field: 'username',
                    message: "username should be between two and ten characters long",
                }]
            }
        }
        if (options.username.includes('@')) {
            return {
                errors: [{
                    field: 'username',
                    message: "username cannot include an @ sign",
                }]
            }
        }
        if (options.password.length <= 5 || options.password.length >= 15) {
            return {
                errors: [{
                    field: 'password',
                    message: "password should be between five and fifteen characters long",
                }]
            }
        }
        const hashedPassword = await argon2.hash(options.password)
        let user: any
        try {
            const result = await connection.createQueryBuilder().insert().into(User).values({
                username: options.username,
                email: options.email,
                password: hashedPassword,
            }).returning('*').execute()
            user = result.raw[0]
        } catch (err) {
            // * duplicate email error
            if (err.detail.includes('Key (email)')) {
                return {
                    errors: [{
                        field: 'email',
                        message: "An account is already linked with this email"
                    }]
                }
            }
            // * duplicate username error
            if (err.code === '23505') {
                return {
                    errors: [{
                        field: 'username',
                        message: "username already taken"
                    }]
                }
            }
        }

        req.session.userId = user.id

        return { user }
    }

    // * LOGIN
    @Mutation(() => UserResponse)
    async login(
        @Arg('options') options: UserLoginInput,
        @Ctx() { req }: Context
    ): Promise<UserResponse> {
        const user = await User.findOneBy({ username: options.username })
        if (!user) {
            return {
                errors: [{
                    field: 'username',
                    message: "that username doesn't exist"
                }]
            }
        }

        const validPassword = await argon2.verify(user.password, options.password)

        if (!validPassword) {
            return {
                errors: [{
                    field: 'password',
                    message: "incorrect password"
                }]
            }
        }

        req.session.userId = user.id as FindOneOptions<User>

        return { user }
    }

    // * LOGOUT
    @Mutation(() => Boolean)
    logout(@Ctx() { req, res }: Context) {
        return new Promise((resolve) =>
            req.session.destroy((err) => {
                res.clearCookie(COOKIE)
                if (err) {
                    console.log(err)
                    resolve(false)
                    return
                }
                resolve(true)
            }
            ))
    }
}