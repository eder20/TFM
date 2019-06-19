import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import Updating from '../common/Info';
import Error from '../common/Info';
import IncrControl from '../common/Button';
import { Route, Link } from 'react-router-dom';
import Login from '../Login';


class PropietariosFactoria extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeNombre = this.handleChangeNombre.bind(this);
    this.handleChangeCodigo = this.handleChangeCodigo.bind(this);
    this.handleChangeNinvitaciones = this.handleChangeNinvitaciones.bind(this);
    this.handleChangePrecio = this.handleChangePrecio.bind(this);
    this.state = {
      name: '',
      Codigo: 0,
      Ninvitaciones: 0,
      Precio: 0
    };
    //this.fileInput = React.createRef();

  }

  state = { stackId: null, visible: null,name: null };

	setVisible(addr) {
		if (this.state.visible !== addr) {
			this.setState({ visible: addr });
		}
	}

  increment = event =>  {

    //event.preventDefault();
    alert(JSON.stringify(this._name2));
    const { drizzle, drizzleState } = this.props;
    var name=this._name2;
    // Usar cacheSend para lanzar una transaccion que
    // ejecutara el metodo  incr del contrato inteligente.
    var string="Jose"
    console.log("Stringggg-->", string);
    const instance = drizzle.contracts.Factoria;
    const stackId = instance.methods.crearPropietario.cacheSend(string,{
      from: drizzleState.accounts[0]
    });

    // Guardar stackId en el estado local
    this.setState({ stackId });
  }

   handleSubmit(event)  {
    alert('Nombre: ' + this.state.name + 'Ninvitaciones' + this.state.Ninvitaciones + 'Codigoya' + this.state.Codigo);
    event.preventDefault();

    const { drizzle, drizzleState } = this.props;

    //var name2=this._name2;
    // Usar cacheSend para lanzar una transaccion que
    // ejecutara el metodo  incr del contrato inteligente.
    //var string="Jose"
    //console.log("Stringggg-->", name2);
    const instance = drizzle.contracts.Factoria;
    const stackId = instance.methods.crearPropietario.cacheSend(this.state.name, this.state.Codigo, this.state.Ninvitaciones,this.state.Precio,{
      from: drizzleState.accounts[0]
    });

    // Guardar stackId en el estado local
    this.setState({ stackId,visible:0 });
  }

  handleChangeNombre (e) {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      name: value
    })
  };

  handleChangeCodigo (e) {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      Codigo: value
    })
  };

  handleChangePrecio (e) {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      Precio: value
    })
  };

  handleChangeNinvitaciones (e) {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      Ninvitaciones: value
    })
  };



  setVisible(addr) {
    if (this.state.visible !== 1) {
      this.setState({ visible: 1 });
    }
  }

  render() {



      if(this.state.visible == 1){
        return (
      /*  <form onSubmit={this.handleSubmit}>
          <p>Nombre:<input type="text" value={this.state.name} onChange={this.handleChangeNombre} /></p>
          <p>Ninvitaciones :<input type="number" value={this.state.Ninvitaciones} onChange={this.handleChangeNinvitaciones} /></p>
          <p>Codigo :<input type="number" value={this.state.Codigo} onChange={this.handleChangeCodigo} /></p>
          <p>Precio:<input type="number" value={this.state.Precio} onChange={this.handleChangePrecio} /></p>
          <p><input type="submit" value="Crear" /></p>
      </form>*/
      <div>
      <form onSubmit={this.handleSubmit}>
        <label>Nombre</label>
        <Input placeholder="Nombre" value={this.state.name} onChange={this.handleChangeNombre} />
      <br />
      <label>Numero de Invitaciones</label>
        <Input placeholder="Numero de Invitaciones" value={this.state.Ninvitaciones} onChange={this.handleChangeNinvitaciones}/>
      <br />
      <Button type="submit" color="success">Crear</Button>
      </form>


    </div>
    );
  }else{
    return(
        <Button color="primary"onClick={() => this.setVisible(null)}>Crear Nuevo Usuario</Button>
    );
  }


  }

}

export default PropietariosFactoria;
