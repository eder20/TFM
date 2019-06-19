import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import P from './P';
import Primero from './Primero';
import PrimeroPropietarios from './PrimeroPropietarios';
import PrimeroClientes from './PrimeroClientes';
import PrimeroMatricula from './PrimeroMatricula';
import Login from './Login';


function Index() {
  return <header class="masthead">
  <div class="container h-100">
    <div class="row h-100 align-items-center">
      <div class="col-12 text-center">
        <h1 class="font-weight-light">Invitaciones Madrid Central</h1>
        <p class="lead">Pagina de compra y venta de Invitaciones para accesos a Madrid Central</p>
      </div>
    </div>
  </div>
</header>
}



class App extends React.Component {
  state = { loading: true, drizzleState: null };

  componentDidMount() {
    const { drizzle } = this.props;

    // subscribe to changes in the store
    this.unsubscribe = drizzle.store.subscribe(() => {

      // every time the store updates, grab the state from drizzle
      const drizzleState = drizzle.store.getState();

      // check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render (){
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container">
          <a className="navbar-brand" href="/">Home</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/Propietarios/"className="nav-link">Propietarios</Link>
              </li>
              <li className="nav-item">
              <Link to="/Invitaciones/"className="nav-link">Invitaciones</Link>
              </li>
              <li className="nav-item">
                <Link to="/Clientes/"className="nav-link">Clientes</Link>
              </li>
              <li className="nav-item">
                <Link to="/Matricula/"className="nav-link">Matricula</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <br />
      <br />
      <br />


        <Route path="/" exact component={Index} />
        <Route path="/Login/" component={Login} />
        <Route path="/Invitaciones/" render={()=> <Primero drizzle={this.props.drizzle}
                 drizzleState={this.state.drizzleState} />} />
        <Route path="/Propietarios/" render={()=> <PrimeroPropietarios drizzle={this.props.drizzle}
                drizzleState={this.state.drizzleState} />} />
        <Route path="/Clientes/" render={()=> <PrimeroClientes drizzle={this.props.drizzle}
                drizzleState={this.state.drizzleState} />} />
        <Route path="/Matricula/" render={()=> <PrimeroMatricula drizzle={this.props.drizzle}
                drizzleState={this.state.drizzleState} />} />
      </div>
    </Router>
  );
}
}

export default App;
