import Layout from './Layout'
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import About from './About'
import Missing from './Missing'
import EditPost from './EditPost'
import useWindowSize from './hooks/useWindowSize'
import useAxiosFetch from './hooks/useAxiosFetch'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useStoreActions } from'easy-peasy'

function App() {
  const setPosts = useStoreActions((actions) => actions.setPosts);
  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');

  useEffect(() => {
    setPosts(data);
  },[data, setPosts])

    const { width } = useWindowSize();
  return (
    <Routes>
      <Route path="/" element={<Layout width={width} />}>
        <Route index element={<Home isLoading={isLoading} fetchError={fetchError} />} />
        <Route path="post">
          <Route index element={<NewPost />} />
          <Route path=":id" element={<PostPage />} />
        </Route>
        <Route path='/edit/:id'>
          <Route index element={<EditPost />} />
        </Route>
        <Route path="about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
