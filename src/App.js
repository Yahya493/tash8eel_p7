
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import NotFoundPage from './pages/NotFoundPage';
import BusDetails from './pages/bus/BusDetails';
import BusPage from './pages/bus/BusPage';
import EventDetails from './pages/event/EventDetails';
import EventPage from './pages/event/EventPage';
import HomePage from './pages/home/HomePage';
import LoginForm from './pages/login/Login';

function App() {

  // try to use principal
  const logedIn = useSelector(state => state.logedIn)
  
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
