import { Container } from "@chakra-ui/react"
import {useState} from 'react';
import Post from './components/post';
import CreatePost from './components/createPost';
import SideContainer from './components/sideContainer';
import Navbar from './components/navbar';

export default function App() {
  const [posts, setPosts] = useState([
    {id: 1, title: 'First Post', body: 'This is the first post from the GM-Network'},
    {id: 2, title: 'Second Post', body: 'This is the second post from the GM-Network and with a lot more text dhfaishffgksrugfhresughresugzehlrsighesrufhlreihsfuhelifhisehufkasnrdhjskghsdrlgshrlugihesigruhgseklurhesligesuhgheieurghsihmmmmmmmmmmmmmmmmmiuehfsaihudhuhuhuhwmwmwmwmwmwmwmwmwmmwmwmwmwmwwmmwmwwmmwmwmwm'},
    {id: 3, title: 'Third Post', body: 'This is the third post from the GM-Network'},
  ])

  const [topics, setTopics] = useState([
    {id: 1, title: 'Announcements'},
    {id: 2, title: 'Technical Questions'},
    {id: 3, title: 'General Questions'},
    {id: 4, title: 'Memes'},
    {id: 5, title: 'Music'},
  ])

  return (
    <div style={{
        backgroundColor:'#dbdae8',
        height: '100vh'
        }}
      >
      <Navbar />
      <Container maxW="container.lg" d='flex'>

        <Container maxW="container.md" p={0}>
            <CreatePost setPosts={setPosts} topics={topics}/>
            <Post posts={posts}/>
        </Container>

        <Container maxW="container.sm" p={0}>
          <SideContainer topics={topics}/>
        </Container>

      </Container>
    </div>
  );
}