import { Box, Button, Flex, Link } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import { useRouter } from 'next/router'
import React from 'react'
import InputForm from '../components/InputForm'
import { Errors } from '../utils/Errors'
import NextLink from 'next/link'
import { Wrapper } from '../components/Wrapper'
import { useLoginMutation, UserLoggedInDocument, UserLoggedInQuery } from '../generated/graphql'

interface registerProps { }

const Login: React.FC<registerProps> = ({ }) => {
    const router = useRouter()
    const [login] = useLoginMutation()

    return (
        <Wrapper variant='regular'>
            <Formik initialValues={{ username: "", password: "" }} onSubmit={async (values, { setErrors }) => {
                const response = await login({
                    variables: values,
                    update: (cache, { data }) => {
                        cache.writeQuery<UserLoggedInQuery>({
                            query: UserLoggedInDocument,
                            data: {
                                __typename: "Query",
                                userLoggedIn: data?.login.user,
                            },
                        })
                    },
                })
                if (response.data?.login.errors) {
                    setErrors(Errors(response.data.login.errors))
                } else if (response.data?.login.user) {
                    router.push('/')
                }
                return login({
                    variables: values
                })
            }}>
                {({ isSubmitting }) => (
                    <Box w="100%" p={7}>
                        <Form>
                            <Box mt={4}>
                                <InputForm name="username" placeholder="username" label="Username" />
                            </Box>
                            <Box mt={4}>
                                <InputForm name="password" placeholder="password" label="Password" type="password" />
                            </Box>
                            <Flex mt={4}>
                                <Button type='submit' colorScheme='red' isLoading={isSubmitting}>Login</Button>
                                <NextLink href="/register">
                                    <Link ml='auto'>Create a new account</Link>
                                </NextLink>
                            </Flex>
                        </Form>
                    </Box>
                )}
            </Formik>
        </Wrapper>
    )
}

export default Login