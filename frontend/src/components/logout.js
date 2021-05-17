import { Button } from "@chakra-ui/react";

export default function Logout() {

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    window.location = '/';
    console.log('ok')
  }


  return (
    <Button colorScheme="purple" onClick={() => handleLogout()}>
      Logout
    </Button>
  )
}