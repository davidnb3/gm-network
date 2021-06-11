import {
  Box,
  Flex,
  Button,
  HStack,
  Image
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/icon-left-font-monochrome-black.svg";

export default function Navbar() {
  const handleLogout = () => {
    sessionStorage.removeItem('token');
    window.location = '/';
  }

  return (
    <Box position="sticky" top={0} p={[4, 6]} bg="gray.100" zIndex={1}>
      <Flex justify="space-between" align='center' w="100%" position="sticky" top={0}>
        <Image
          h='36px'
          src={Logo}
          alt="Groupomania Logo"
        />
        <HStack spacing={4}>
          <Link to='/account'>
            <Button as={Box} minWidth='95px' colorScheme="purple">
              Account
            </Button>
          </Link>
          <Button minWidth='95px' colorScheme="purple" onClick={() => handleLogout()}>
            Logout
          </Button>
        </HStack>
      </Flex>
    </Box>
  )
}