import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import User from './components/User/User';
import Navbar from './components/Navbar/Navbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Auth from './components/Auth/Auth';




function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/:userId" element={<User />} />
          <Route path= "/auth" element= {<Auth />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


