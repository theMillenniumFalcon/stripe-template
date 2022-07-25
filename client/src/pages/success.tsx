import { Flex, Text } from "@chakra-ui/react"
import { Layout } from "../components/Layout"
import { Link, Button } from "@chakra-ui/react"
import NextLink from "next/link"

interface successProps { }

const Success: React.FC<successProps> = ({ }) => {
    return (
        <Layout>
            <Text>The transaction was successfull</Text>
            <Flex align="center" justify="center" mt={4}>
            <NextLink href="/">
                <Button as={Link}>
                    Go to Home
                </Button>
            </NextLink>
            </Flex>
        </Layout>
    )
}

export default Success