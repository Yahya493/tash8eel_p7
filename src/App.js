
import { Route, Routes } from 'react-router-dom';
import './styles/App.css';
import WelcomePage from './pages/WelcomePage';
import SignUpPage from './pages/SignUpPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginForm from './pages/Login'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LoginForm />}/>
        <Route path='/signup' element={<SignUpPage />}/>

        <Route path='*' element={<NotFoundPage />}/>
      </Routes>
    </div>
  );
}

export default App;
