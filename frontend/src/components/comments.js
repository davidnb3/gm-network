import { Box, Text } from "@chakra-ui/react"

export default function Comments({comment}) {

  return (
    <>
      <Box
        key={comment.comment_id}
        style={{width: '100%'}} 
        bg="white"
        marginTop={12}
        p={4}
        borderColor='#CBD5E0'
        borderWidth='1px'
        borderRadius='5px'
      >
        <Text color='grey' fontSize='xs' mb={2}>Posted by: {comment.user_name}</Text>
        <Text> {comment.comment_body} </Text>
      </Box>
    </>
  )
}