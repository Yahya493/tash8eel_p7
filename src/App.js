
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import NotFoundPage from './pages/NotFoundPage';
import BusDetails from './pages/bus/BusDetails';
import BusPage from './pages/bus/BusPage';
import EventDetails from './pages/event/EventDetails';
import EventPage from './pages/event/EventPage';
import LoginForm from './pages/login/Login';
import Cookies from 'js-cookie';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';


function App() {

  const dispatch = useDispatch()
  // try to use principal
  const logedIn = useSelector(state => state.logedIn)
  const user = Cookies.get('user')
  if(user) dispatch({type: 'setLogIn' , logedIn: true})

  if (!logedIn) {
    return (
      <LoginForm />
    )
  }
  

  return (
    <div className="App">
      <div id='navBar'>
        <Navbar />
      </div>
      <div id='content'>
        <Routes>
          <Route path='/' element={<EventPage />} />
          <Route path='/events' element={<EventPage />} />
          <Route path='/buses' element={<BusPage />} />
          <Route path='/buses/:id' element={<BusDetails />} />
          <Route path='/events/:id' element={<EventDetails />} />

          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
