import { Container } from "@chakra-ui/react"
import { useState, useEffect } from 'react';
import Post from './components/posts';
import CreatePost from './components/createPost';
import Topics from './components/topics';
import Navbar from './components/navbar';
import SinglePost from "./components/singlePost";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


export default function App() {
  const [topics, setTopics] = useState([]);
  const [posts, setPosts] = useState([]);

  async function getTopics() {
    try {
       const response = await fetch('http://localhost:5000/api/topics');
       const data = await response.json();
       if (!response.ok) {
        throw new Error(response.statusText);
      }
      capitalizeFirstLetter(data)
      setTopics(data);
     } catch (error) {
       console.log(error)
     }
  };

  function capitalizeFirstLetter(data) {
    for (let i in data) {
      return data[i].topic_name.charAt(0).toUpperCase() + data[i].topic_name.slice(1);
    }
  }

  async function getPosts() {
    try {
      const response = await fetch('http://localhost:5000/api/posts');
      const data = await response.json();
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
    getTopics();
  }, [] );


  return (
    <Router>
      <div style={{
          backgroundColor:'#dbdae8',
          height: '100vh'
          }}
        >
        <Navbar />
          <Switch>
            <Route path='/' exact>
              <Container maxW="container.lg" d='flex' marginTop={6}>

                <Container maxW="container.md" p={0} m='0 20px 0 20px'>
                  <CreatePost topics={topics}/>
                  <Post posts={posts} setPosts={setPosts} />
                </Container>

                <Container flex='1' maxW="container.sm" p={0}>
                  <Topics topics={topics} setTopics={setTopics}/>
                </Container>

              </Container>
            </Route>

            <Route path={'/:id'} component={SinglePost} />

          </Switch>

      </div>
    </Router>
  );
};