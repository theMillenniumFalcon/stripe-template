import React from "react"
import { Box, Link, Flex, Button, Heading } from "@chakra-ui/react"
import NextLink from "next/link"
// import { useMeQuery, useLogoutMutation } from "../generated/graphql"
import { isServer } from "../utils/isServer";
import { useRouter } from "next/router";
import { useApolloClient } from "@apollo/client";

interface NavbarProps { }

export const Navbar: React.FC<NavbarProps> = ({ }) => {
  const router = useRouter()
  //   const [logout, { loading: logoutFetching }] = useLogoutMutation()
  const apolloClient = useApolloClient();
  //   const { data, loading } = useMeQuery({
  // skip: isServer(),
  //   })

  let body = null;

  let condition = false

  // data is loading
  //   if (loading) {
  if (condition) {
    // user not logged in
    //   } else if (!data?.me) {
  } else if (!condition) {
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
        <NextLink href="/create-post">
          <Button as={Link} mr={4}>
            create post
          </Button>
        </NextLink>
        {/* <Box mr={2}>{data.me.username}</Box> */}
        <Box mr={2}>username</Box>
        <Button
          onClick={async () => {
            // await logout();
            await apolloClient.resetStore();
          }}
          //   isLoading={logoutFetching}
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