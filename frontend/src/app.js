import { Container } from "@chakra-ui/react"
import { useState, useEffect } from 'react';
import Posts from './components/posts';
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
      setTopics(data);
     } catch (error) {
       console.log(error)
     }
  };

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
          minHeight: '100vh',
          height: '100%'
          }}
        >
        <Navbar />
          <Switch>
            <Route path='/' exact>
              <Container maxW="container.lg" d='flex' marginTop={6}>

                <Container maxW="container.md" p={0} m='0 20px 0 20px'>
                  <CreatePost topics={topics}/>
                  <Posts posts={posts} setPosts={setPosts} />
                </Container>

                <Container flex='1' maxW="container.sm" p={0}>
                  <Topics topics={topics} setPosts={setPosts}/>
                </Container>

              </Container>
            </Route>

            <Route path={'/post/:id'} render={() => (
              <SinglePost />
            )}/>

          </Switch>

      </div>
    </Router>
  );
};