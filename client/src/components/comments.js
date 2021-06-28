import {
  Box,
  Text,
  VStack,
  HStack,
  Flex,
  Button,
  Tooltip,
  Textarea,
  useMediaQuery
} from "@chakra-ui/react"
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import DeleteAlert from './deleteAlert';
import postDataToApi from '../api/postDataToApi';

export default function Comments({comment, userId, authToken}) {
  const [isOpen, setIsOpen] = useState(false)
  const [modifyComment, setModifyComment] = useState(false);
  const [commentText, setCommentText] = useState(comment.comment_body);
  const [deleteBtn, setdeleteBtn] = useState('');
  const [windowSmallerThan520] = useMediaQuery("(max-width: 520px)")
  const onClose = () => setIsOpen(false)
  const commentId = comment.comment_id;

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
        <Flex
          justify='space-between'
          align='center'
          mb={2}
        >
          <Text
            color='grey'
            fontSize={['0.70rem', '0.75rem']}
          >
            {windowSmallerThan520 ? '' : 'Posted by: '}
            {comment.user_name}
          </Text>

          <HStack>
            <Tooltip label="Modify Comment" fontSize="xs">
              <Button
                p={0}
                size={windowSmallerThan520 ? 'xs' : 'sm'}
                bg='transparent'
                display={userId !== comment.user_id ? 'none' : 'block'}
                onClick={modifyComment === false ? () => setModifyComment(true) : () => setModifyComment(false)}
              >
                <EditIcon color='purple.500'/>
              </Button>
            </Tooltip>
            <Tooltip label="Delete Comment" fontSize="xs">
              <Button
                bg='none'
                p={0}
                size={windowSmallerThan520 ? 'xs' : 'sm'}
                display={userId !== comment.user_id ? 'none' : 'block'}
                onClick={(event) => handleDeleteBtn(event)}
              >
                <DeleteIcon color='red.600'/>
              </Button>
            </Tooltip>
          </HStack>
        </Flex>

        {modifyComment === false && (
          <Text fontSize={['sm', 'md']}> {comment.comment_body} </Text>
        )}

        {modifyComment === true && (
          <form method='PUT' onSubmit={() => handleUpdateComment()}>
            <Textarea
              value={commentText}
              placeholder='Text'
              fontSize={['sm', 'md']}
              focusBorderColor="#E9D8FD"
              borderWidth='1px'
              borderColor='gray.200'
              marginBottom={2.5}
              onChange={({target}) => setCommentText(target.value)}
            />

            <VStack spacing={4}>
              <Button
                colorScheme='purple'
                type='submit'
                w='100%'
                fontSize={['sm', 'md']}
              >
                Update
              </Button>
              <Button
                type='button'
                w='100%'
                fontSize={['sm', 'md']}
                onClick={() => setModifyComment(false)}
              >
                Cancel
              </Button>
            </VStack>
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