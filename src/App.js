
import { Route, Routes } from 'react-router-dom';
import './styles/App.css';
import NotFoundPage from './pages/NotFoundPage';
import LoginForm from './pages/login/Login'
import BusPage from './pages/BusPage';
import { useSelector } from 'react-redux';
import BusDetails from './pages/BusDetails';
import HomePage from './pages/home/HomePage';
import EventPage from './pages/event/EventPage';
import EventDetails from './pages/event/EventDetails';
import Navbar from './components/Navbar';

function App() {

  const logedIn = useSelector(state => state.logedIn)
  const api = useSelector(state => state.api)

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
          <Route path='/' element={<HomePage />} />
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
