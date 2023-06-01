
import { Route, Routes } from 'react-router-dom';
import './styles/App.css';
import NotFoundPage from './pages/NotFoundPage';
import LoginForm from './pages/login/Login'
import BusPage from './pages/BusPage';
import { useSelector } from 'react-redux';
import BusDetails from './pages/BusDetails';
import EventPage from './pages/event/EventPage';

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
      <div id='navBar'>navBar</div>
      <div id='content'>
        <Routes>
          <Route path='/' element={<EventPage />} />
          <Route path='/buses' element={<BusPage />} />
          <Route path='/buses/:id' element={<BusDetails />} />

          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
