import { Box, Container, Flex } from "@chakra-ui/react";
import Logout from './logout';

export default function Navbar() {
  return (
    <Box position="sticky" top={0} p={2} bg="gray.100" zIndex={1}>
      <Container maxW="container.lg">
        <Flex justifyContent="flex-end" w="100%" position="sticky" top={0}>
          <Logout />
        </Flex>
      </Container>
    </Box>
  )
}