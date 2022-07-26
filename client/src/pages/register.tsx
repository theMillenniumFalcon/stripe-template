import { Box, Button, Flex, Link } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import { useRouter } from 'next/router'
import React from 'react'
import InputForm from '../components/InputForm'
import { Errors } from '../utils/Errors'
import NextLink from 'next/link'
import { Wrapper } from '../components/Wrapper'
import { useRegisterMutation, UserLoggedInDocument, UserLoggedInQuery } from '../generated/graphql'

interface registerProps { }

const Register: React.FC<registerProps> = ({ }) => {
    const router = useRouter()
    const [register] = useRegisterMutation()

    return (
        <Wrapper variant='regular'>
            <Formik initialValues={{ username: "", email: "", password: "" }} onSubmit={async (values, { setErrors }) => {
                const response = await register({
                    variables: values,
                    update: (cache, { data }) => {
                        cache.writeQuery<UserLoggedInQuery>({
                            query: UserLoggedInDocument,
                            data: {
                                __typename: "Query",
                                userLoggedIn: data?.register.user,
                            },
                        })
                    },
                })
                if (response.data?.register.errors) {
                    setErrors(Errors(response.data.register.errors))
                } else if (response.data?.register.user) {
                    router.push('/')
                }
                console.log(values)
                return register({
                    variables: values
                })
            }}>
                {({ isSubmitting }) => (
                    <Box w="100%" p={7}>
                        <Form>
                            <Box>
                                <InputForm name="username" placeholder="username" label="Username" />
                            </Box>
                            <Box mt={4}>
                                <InputForm name="email" placeholder="email" label="Email" />
                            </Box>
                            <Box mt={4}>
                                <InputForm name="password" placeholder="password" label="Password" type="password" />
                            </Box>
                            <Flex mt={4}>
                                <Button type='submit' colorScheme='red' isLoading={isSubmitting}>Register</Button>
                                <NextLink href="/login">
                                    <Link ml='auto'>Already have an account?</Link>
                                </NextLink>
                            </Flex>
                        </Form>
                    </Box>
                )}
            </Formik>
        </Wrapper>
    )
}

export default Register