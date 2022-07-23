import type { NextPage } from 'next'
import { Layout } from '../components/Layout'
import { Link, Button } from "@chakra-ui/react"
import NextLink from "next/link"

const Home: NextPage = () => {
  return (
    <Layout>
      Hello {' '}
      <NextLink href="/stripe">
        <Button as={Link}>
          Stripe
        </Button>
      </NextLink>
    </Layout>
  )
}

export default Home
