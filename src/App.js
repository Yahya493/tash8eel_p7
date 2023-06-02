
import { Route, Routes } from 'react-router-dom';
import './App.css';
import NotFoundPage from './pages/NotFoundPage';
import LoginForm from './pages/login/Login'
import BusPage from './pages/bus/BusPage';
import { useDispatch, useSelector } from 'react-redux';
import BusDetails from './pages/bus/BusDetails';
import HomePage from './pages/home/HomePage';
import EventPage from './pages/event/EventPage';
import EventDetails from './pages/event/EventDetails';
import Navbar from './components/Navbar';
import { useEffect } from 'react';

function App() {

  const logedIn = useSelector(state => state.logedIn)
  const api = useSelector(state => state.api)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()


  const getEvents = () => {
    fetch(api + "/events?user=" + user._id)
      .then(res => res.json())
      .then(events => {
        dispatch({ type: 'setEvents', events: events })
      })
  }

  const getBuses = () => {
    fetch(api + "/buses?user=" + user._id)
      .then(res => res.json())
      .then(buses => {
        dispatch({ type: 'setBuses', buses: buses })
      })
  }

  const getDrivers = () => {
    fetch(api + "/drivers?user=" + user._id)
      .then(res => res.json())
      .then(drivers => {
        drivers = [{_id:'', name:'__Select__', phone: '', user: ''}, ...drivers]
        dispatch({ type: 'setDrivers', drivers: drivers })
      })
  }

  useEffect(() => {
    if (logedIn) {
      getEvents()
      getBuses()
      getDrivers()
    }
  }, [logedIn])

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
