//import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landing';
import Authentication from './pages/authentication';
import VideoMeetComponenet from './pages/VideoMeet';
import { AuthProvider } from './contexts/AuthContext';
import HomeComponent from './pages/home';
import History from './pages/history';
function App() {
  return (
    <>
    <div className='App'>
      <Router>
        <AuthProvider>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/auth' element={<Authentication/>}/>;
          <Route path='/home' element={<HomeComponent />}/>
          <Route path='/history' element={<History />} />
          <Route path='/:url' element={<VideoMeetComponenet />} />;
        </Routes>
        </AuthProvider>
      </Router>
      </div>
    </>
  );
}

export default App;

