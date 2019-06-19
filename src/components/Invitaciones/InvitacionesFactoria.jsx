import React from 'react';

import Updating from '../common/Info';
import Error from '../common/Info';
import IncrControl from '../common/Button';
import { Route, Link } from 'react-router-dom';
import Login from '../Login';

class InvitacionesFactoria extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangePropietario = this.handleChangePropietario.bind(this);
    this.handleChangeCompra = this.handleChangeCompra.bind(this);
    this.handleChangePuja = this.handleChangePuja.bind(this);
    this.state = {
      name: '',
      compra: 0,
      puja: 0
      //email: ''
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
    //console.log("Stringggg-->", string);
    const instance = drizzle.contracts.Factoria;
    const stackId = instance.methods.crearInvitacion.cacheSend(string,{
      from: drizzleState.accounts[0]
    });

    // Guardar stackId en el estado local
    this.setState({ stackId });
  }

   handleSubmit(event)  {
    alert('Propietario: ' + this.state.name + 'Puja' + this.state.puja + 'Compraya' + this.state.compra);
    event.preventDefault();

    const { drizzle, drizzleState } = this.props;

    //var name2=this._name2;
    // Usar cacheSend para lanzar una transaccion que
    // ejecutara el metodo  incr del contrato inteligente.
    //var string="Jose"
    //console.log("Stringggg-->", name2);
    const instance = drizzle.contracts.Factoria;
    const stackId = instance.methods.crearInvitacion.cacheSend(this.state.name, this.state.puja, this.state.compra,{
      from: drizzleState.accounts[0]
    });

    // Guardar stackId en el estado local
    this.setState({ stackId, visible:0 });
  }

  handleChangePropietario (e) {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      name: value
    })
  };

  handleChangeCompra (e) {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      compra: value
    })
  };

  handleChangePuja (e) {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      puja: value
    })
  };

  getTxInfo = () => {

  	// Si no he pulsado nunca el boton incrementar;
  	if (this.state.stackId === null) return {status: null, error: null};;

    // Obtener el estado de las transacciones desde el estado de drizzle
    const { transactions, transactionStack } = this.props.drizzleState;

    // Obtener el hash de la transaccion asociada a stackId.
    // stackId se guardo en el estado local al crear la transaccion.
    const txHash = transactionStack[this.state.stackId];

    // El hash de la transaccion no existe hasta que se envia a la red.
    if (!txHash) return {status: "Pendiente de envio", error: null};

    // Si la transaccion existe, devolvemos su status
    return { status: (transactions[txHash] && transactions[txHash].status),
             error: (transactions[txHash] && transactions[txHash].error)};
  };

  setVisible(addr) {
		if (this.state.visible !== 1) {
			this.setState({ visible: 1 });
		}
	}

  render() {

        if(this.state.visible == 1){
          return (
        <form onSubmit={this.handleSubmit}>
          <p>Nombre:<input type="text" value={this.state.name} onChange={this.handleChangePropietario} /></p>
          <p>Puja Inicial:<input type="number" value={this.state.puja} onChange={this.handleChangePuja} /></p>
          <p>Compra ya:<input type="number" value={this.state.compra} onChange={this.handleChangeCompra} /></p>
          <p><input type="submit" value="Crear" /></p>
            </form>
        );
      }else{
        return(
            <button onClick={() => this.setVisible(null)}>Crear</button>
        );
      }
  }

}

export default InvitacionesFactoria;
