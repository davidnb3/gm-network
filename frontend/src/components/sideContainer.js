import { Box, ListItem, UnorderedList } from "@chakra-ui/react"

export default function SideContainer({topics}) {
  return(
    <UnorderedList marginTop={6} styleType='none'>
      {topics.map((topic) => (
        <ListItem key={topic.id}>
          <Box bg="white" w="100%" p={4} borderWidth="1px" borderRadius='5px'>
          {topic.title}
          </Box>
        </ListItem>
      ))}
    </UnorderedList>
  )
}