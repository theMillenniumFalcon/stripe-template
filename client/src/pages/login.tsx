import { Box, Button, Flex, Link } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import { useRouter } from 'next/router'
import React from 'react'
import InputForm from '../components/InputForm'
// import { useRegisterMutation } from '../generated/graphql'
// import { Errors } from '../utils/Errors'
import NextLink from 'next/link'

interface registerProps { }

const Login: React.FC<registerProps> = ({ }) => {
    const router = useRouter()
    //   const [, register] = useRegisterMutation()

    return (
        <Formik initialValues={{ email: "", password: "" }} onSubmit={async (values, { setErrors }) => {
            //   const response = await register(values)
            //   if (response.data?.register.errors) {
            //     setErrors(Errors(response.data.register.errors))
            //   } else if (response.data?.register.user) {
            //     // * worked
            //     router.push('/')
            //   }
            //   console.log(values)
            //   return register(values)
        }}>
            {({ isSubmitting }) => (
                <Box w="100%" p={7}>
                    <Form>
                        <Box mt={4}>
                            <InputForm name="email" placeholder="email" label="Email" />
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
        </Formik >

    )
}

export default Login