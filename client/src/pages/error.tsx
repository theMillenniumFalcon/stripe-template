import { Flex, Text } from "@chakra-ui/react"
import { Layout } from "../components/Layout"
import { Button } from "@chakra-ui/react"
import NextLink from "next/link"

interface errorProps { }

const Error: React.FC<errorProps> = ({ }) => {
    return (
        <Layout>
            <Text>Some error occurred on our side</Text>
            <Flex align="center" justify="center" mt={4}>
                <NextLink href="/">
                    <Button>
                        Go to Home
                    </Button>
                </NextLink>
            </Flex>
        </Layout>
    )
}

export default Error