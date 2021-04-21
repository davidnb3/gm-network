import { Box, Container, Flex, HStack } from "@chakra-ui/react";
import Signup from './signup';
import LogIn from './login';

export default function Navbar() {
  return (
    <Box position="sticky" top={0} p={2} bg="gray.100" zIndex={1}>
      <Container maxW="container.lg">
        <Flex justifyContent="flex-end" w="100%" position="sticky" top={0}>
          <HStack spacing={2}>
            <LogIn />
            <Signup />
          </HStack>
        </Flex>
      </Container>
    </Box>
  )
}