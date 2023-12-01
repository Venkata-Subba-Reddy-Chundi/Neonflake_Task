import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Home';
import Blogs from './Blogs';
import ShowVideo from './ShowVideo';
// import CreateBlog from './CreateBlog';
// import EditBlog from './EditBlog';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/blogs' element={<Blogs/>}/>
        <Route path='/showvideo/:id' element={<ShowVideo/>}/>
        {/* <Route path='/createblog' element={<CreateBlog/>}/>
        <Route path='/editblog/:id' element={<EditBlog/>}/> */}
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;