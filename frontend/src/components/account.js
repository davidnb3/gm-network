import {
  Container,
  Heading,
  Text,
  Tooltip,
  Button
} from "@chakra-ui/react";
import { useState, useEffect } from 'react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import postDataToApi from '../api/postDataToApi';
import DeleteAlert from './deleteAlert';

export default function Account({userId, authToken}) {
  const [userData, setUserData] = useState({});
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const [deleteBtn, setdeleteBtn] = useState('');

  const handleDeleteBtn = (event) => {
    event.preventDefault();
    setdeleteBtn('account');
    setIsOpen(true);
  };

  const handleDelete = () => {
    if (deleteBtn === 'account') {
      postDataToApi('auth', '', 'DELETE', authToken, {userId});
      sessionStorage.removeItem('token');
      window.location = '/';
    }
  }

  useEffect(() => {
    postDataToApi('auth', '', 'POST', authToken, {userId}, setUserData);
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
        <Container m={0} p={0}>
          <Tooltip label='Go back' fontSize='xs'>
            <Button
                p={0}
                size='sm'
                bg='transparent'
                onClick={() => window.location = '/'}
              >
              <ArrowBackIcon boxSize='1.3em'/>
            </Button>
          </Tooltip>
        </Container>
        <Container m={0} p={0} textAlign='center' lineHeight='20px'>
          <i className="far fa-user-circle fa-8x" style={{color: '#805AD5'}} ></i>
          <Heading size='md'>{userData[0]?.user_name}</Heading>
          <Text>{userData[0]?.user_email}</Text>
          <Text>{userData[0]?.created_on}</Text>
          <Button colorScheme="red" onClick={handleDeleteBtn}>
            Delete Account
          </Button>
        </Container>
      </Container>

      <DeleteAlert
        onClose={onClose}
        isOpen={isOpen}
        handleDelete={handleDelete}
        deleteBtn={deleteBtn}
      />

    </div>
  )
}