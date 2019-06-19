import React from 'react';
import ReactDOM from 'react-dom';
import "./css/style.css";
import drizzle from "./drizzle";
import P from './components/P';
import Primero from './components/Primero';
import PrimeroP from './components/PrimeroPropietarios';
import Login from './components/Login';
import App from './components/App';
import Route from './Routes';


import { BrowserRouter as Router } from "react-router-dom";


/*ReactDOM.render(
  <P drizzle={drizzle} />, document.getElementById('root')
);*/

ReactDOM.render(
  <App drizzle={drizzle} />, document.getElementById('root')
);

/*ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'));*/
