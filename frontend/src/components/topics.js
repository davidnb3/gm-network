import { Box, ListItem, UnorderedList } from "@chakra-ui/react"

export default function Topics({topics}) {
  return(
    <>
      <UnorderedList styleType='none' marginLeft='inherit'>
        {topics.map((topic) => (
          <ListItem key={topic.topic_id} >
            <Box bg="white" w="100%" p={4} borderWidth="1px" borderRadius='5px'>
            {topic.topic_name}
            </Box>
          </ListItem>
        ))}
      </UnorderedList>
    </>
  )
}