import React from "react"
import { Box, Link, Flex, Button, Heading } from "@chakra-ui/react"
import NextLink from "next/link"
import { useUserLoggedInQuery, useLogoutMutation } from "../generated/graphql"
import { useApolloClient } from "@apollo/client";

interface NavbarProps { }

export const Navbar: React.FC<NavbarProps> = ({ }) => {
  const [logout, { loading: logoutFetching }] = useLogoutMutation()
  const apolloClient = useApolloClient()
  const { data, loading } = useUserLoggedInQuery()
  console.log(data)

  let body = null

  // data is loading
  if (loading) {
    // user not logged in
  } else if (!data?.userLoggedIn) {
    body = (
      <>
        <NextLink href="/login">
          <Button mr={2}>
            <Link>login</Link>
          </Button>
        </NextLink>
        <NextLink href="/register">
          <Button mr={2}>
            <Link>register</Link>
          </Button>
        </NextLink>
      </>
    )
    // user is logged in
  } else {
    body = (
      <Flex align="center">
        <Box mr={2}>{data.userLoggedIn.username}</Box>
        <Button
          onClick={async () => {
            await logout()
            await apolloClient.resetStore()
          }}
          isLoading={logoutFetching}
          variant="link"
        >
          logout
        </Button>
      </Flex>
    )
  }

  return (
    <Flex zIndex={1} position="sticky" top={0} bg="black" p={4}>
      <Flex flex={1} m="auto" align="center" maxW={800}>
        <NextLink href="/">
          <Link>
            <Heading>Stripe</Heading>
          </Link>
        </NextLink>
        <Box ml={"auto"}>{body}</Box>
      </Flex>
    </Flex>
  )
}