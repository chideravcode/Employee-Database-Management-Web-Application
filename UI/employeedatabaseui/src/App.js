import logo from './logo.svg';
import './App.css';
import {Home} from "./Home";
import {Department} from "./Department";
import {Employee} from "./Employee";
import {BrowserRouter, Routes, Route, NavLink} from "react-router-dom"; // Modules needed for routing

function App() {
  return (
    <BrowserRouter>
    <div className="App container">
      <h3 className = "d-flex justify-content-center m-3">
        React JS Front End
      </h3>

      <nav className = "navbar bg-light navbar-dark">
        <ul className = "nav flex-column">
          <li className = "nav-item">
            <NavLink className = "btn btn-light btn-outline-primary" to = "/home">
              Home
            </NavLink>
          </li>
          <li className = "nav-item">
            <NavLink className = "btn btn-light btn-outline-primary" to = "/department">
              Department
            </NavLink>
          </li>          
          <li className = "nav-item">
            <NavLink className = "btn btn-light btn-outline-primary" to = "/employee">
              Employee
            </NavLink>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path = "/home" element = {Home}/>
        <Route path = "/department" element = {Department}/>
        <Route path = "/employee" element = {Employee}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
