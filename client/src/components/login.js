import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  Center,
  Link,
  Text
} from "@chakra-ui/react";
import { useState } from 'react';
import { Link as RouterLink } from "react-router-dom";

export default function LogIn({setToken}) {
  const  [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [ showPassword, setShowPassword ] = useState(false);
  const isInvalid = password === '' || username === '';
  
  async function handleLogin(event) {
    // Send login request and save token to SS
    event.preventDefault();
    try {
      const user = {
        username,
        password
      }
      const response = await fetch(('/api/auth/login'), {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
      })
      // If data contains error message, save to state and display it
      const data = await response.json();
      if (data.error) {
        setErrorMsg(data.error);
      }
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      setToken(data)
    } catch (error) {
      console.log(error)
    }
  }

  return(
    <>
      <Center h='100vh' p={4}>
        <Container maxW='md' bg="white" p={[4, 8]} borderRadius='5px'>
          <form method='POST' onSubmit={handleLogin}>
            <VStack spacing={6}>
              <Text color='red' display={errorMsg ? 'block' : 'none'}>{errorMsg}</Text>
              <FormControl isRequired>
                <FormLabel htmlFor='username'>User Name</FormLabel>
                <Input
                  type='text'
                  id='username'
                  value={username}
                  onChange={({ target }) => setUsername(target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    id='password'
                    autoComplete='off'
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                type='submit'
                disabled={isInvalid}
                colorScheme="purple"
                variant="solid"
                w='100%'
              > 
                  Login
              </Button>
              <Link as={RouterLink} to='/signup' color='purple.400'>
                Don't have an account?
              </Link>
            </VStack>
          </form>
        </Container>
      </Center>
    </>
  );
};