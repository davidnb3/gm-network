import { Box, Text, HStack, Flex, Button, Tooltip, Textarea } from "@chakra-ui/react"
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import DeleteAlert from './deleteAlert';
import postDataToApi from '../api/postDataToApi';

export default function Comments({comment, userId, authToken}) {
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const [modifyComment, setModifyComment] = useState('');
  const [commentText, setCommentText] = useState(comment.comment_body);
  const commentId = comment.comment_id;
  const [deleteBtn, setdeleteBtn] = useState('');

  const handleDeleteBtn = (event) => {
    event.preventDefault();
    setdeleteBtn('comment');
    setIsOpen(true);
  };

  const handleDelete = () => {
    if (deleteBtn === 'comment') {
      setIsOpen(false);
      postDataToApi('comments', '', 'DELETE', authToken, {commentId});
      window.location.reload();
    }
  }

  const handleUpdateComment = () => {
    const comment = {
      commentId,
      body: commentText
    }
    postDataToApi('comments', '', 'PUT', authToken, comment);
  }
 
  return (
    <>
      <Box
        key={comment.comment_id}
        style={{width: '100%'}} 
        bg="white"
        marginTop={12}
        p={4}
        pt={2}
        borderColor='#CBD5E0'
        borderWidth='1px'
        borderRadius='5px'
      >
        <Flex justify='space-between' align='center' mb={2}>
          <Text color='grey' fontSize='xs'>Posted by: {comment.user_name}</Text>
          <HStack>
            <Tooltip label="Modify Comment" fontSize="xs">
              <Button
                p={0}
                size='sm'
                bg='transparent'
                display={userId !== comment.user_id ? 'none' : 'block'}
                onClick={modifyComment === '' ? () => setModifyComment('modify-comment') : () => setModifyComment('')}
              >
                <EditIcon color='purple.500'/>
              </Button>
            </Tooltip>
            <Tooltip label="Delete Comment" fontSize="xs">
              <Button
                bg='none'
                p={0}
                size='sm'
                display={userId !== comment.user_id ? 'none' : 'block'}
                onClick={(event) => handleDeleteBtn(event)}
              >
                <DeleteIcon color='red.600'/>
              </Button>
            </Tooltip>
          </HStack>
        </Flex>

        {modifyComment === '' && (
          <Text> {comment.comment_body} </Text>
        )}

        {modifyComment === 'modify-comment' && (
          <form method='PUT' onSubmit={() => handleUpdateComment()}>
            <Textarea
              value={commentText}
              placeholder='Text'
              focusBorderColor="#E9D8FD"
              borderWidth='1px'
              borderColor='gray.200'
              onChange={({target}) => setCommentText(target.value)}
            />
            <HStack spacing={4}>
              <Button colorScheme='purple' type='submit' w={92}>Update</Button>
              <Button type='button' w={92} onClick={() => setModifyComment('')}>Cancel</Button>
            </HStack>
          </form>
        )}

      </Box>
      <DeleteAlert
        onClose={onClose}
        isOpen={isOpen}
        handleDelete={handleDelete}
        deleteBtn={deleteBtn}
      />
    </>
  )
}