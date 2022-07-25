import type { NextPage } from 'next'
import { Layout } from '../components/Layout'
import { Text, Flex, Box, Switch, Heading } from "@chakra-ui/react"
import { StripeCheckout } from '../components/stripecheckout'
import { useState } from 'react'

const Home: NextPage = () => {
  const [check, setCheck] = useState(false)
  const toggleChecked = () => setCheck(value => !value)
  return (
    <Layout>
      <Text>Upgrade to paid plan to access all the features</Text>
      <Box mt={2}>
        <Flex align="center" justify="center">
          <Text>Monthly</Text>
          <Switch ml={2} isChecked={check} onChange={toggleChecked} />
          <Text ml={2}>Yearly</Text>
        </Flex>
        <Flex justify="center" mt={3} px={4}>
          <Box border="1px solid white" borderRadius={5} p={4} width="40%">
            <Text>To access all our features...</Text>
            <Flex align="baseline">
              <Heading as='h3' size='lg'>
                ${check ? (
                  <>5</>
                ) : (
                  <>10</>
                )}
              </Heading>
              <Text>/month</Text>
            </Flex>
            {check && (
              <Text>(billed at $60/year)</Text>
            )}
            <Flex align="center" justify="center" mt={2}>
              <StripeCheckout />
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Layout>
  )
}

export default Home
