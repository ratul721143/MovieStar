// import './App.css';
import {BrowserRouter,Routes, Route} from 'react-router-dom'
// import EditorPage from './Components/EditorPage';
import Header from './components/Header'
import Body from './components/Body';
import Moviereview from './components/Moviereview'
// import {Toaster} from 'react-hot-toast'

const App=() => {
  return (
    <>
      {/* <Toaster position="top-center" reverseOrder={false} /> */}
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />} ></Route>
          <Route path='review/:movieId' element={<Moviereview />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
