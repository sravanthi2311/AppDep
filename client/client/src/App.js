
import './App.css';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Tasks from './/Components/Tasks';
import {BrowserRouter,Routes,Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login></Login>} ></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
        <Route path="/tasks" element={<Tasks></Tasks>}></Route>
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
