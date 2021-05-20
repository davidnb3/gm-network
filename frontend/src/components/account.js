import { Container } from "@chakra-ui/react"
import { useState, useEffect } from 'react';
import postDataToApi from '../api/postDataToApi';

export default function Account({userId, authToken}) {
  const [userData, setUserData] = useState({});
  console.log(userData)

  useEffect(() => {
    postDataToApi('auth', '', authToken, {userId}, setUserData);
  }, [userId, authToken] );

  return (
    <div style={{
      backgroundColor:'#dbdae8',
      minHeight: '100vh',
      height: '100%',
      paddingBottom: '20px'
      }}
    >
      <Container
          maxW="container.md"
          marginTop={6}
          bg="white"
          w="100%"
          p={6}
          borderColor='#CBD5E0'
          borderWidth='1px'
          borderRadius='5px'
        >
          <i className="far fa-user-circle fa-8x" style={{color: '#805AD5'}} ></i>
        </Container>
    </div>
  )
}