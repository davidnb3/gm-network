import {
  Box,
  Container,
  Flex,
  Button,
  HStack 
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Navbar() {

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    window.location = '/';
  }

  return (
    <Box position="sticky" top={0} p={2} bg="gray.100" zIndex={1}>
      <Container maxW="container.lg">
        <Flex justifyContent="flex-end" w="100%" position="sticky" top={0}>
          <HStack spacing={4}>
            <Link to='/account'>
              <Button minWidth='95px' colorScheme="purple">
                Account
              </Button>
            </Link>
            <Button minWidth='95px' colorScheme="purple" onClick={() => handleLogout()}>
              Logout
            </Button>
          </HStack>
        </Flex>
      </Container>
    </Box>
  )
}