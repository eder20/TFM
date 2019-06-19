import React from 'react';



//import ContadorFactoria from './ContadorFactoria';
import InvitacionesFactoria from './Invitaciones/InvitacionesFactoria';
import PropietariosFactoria from './Propietarios/PropietariosFactoria';
//import ContratosFactoria from './ContratosFactoria';
import ListaInvitaciones from './Invitaciones/ListaInvitaciones';
import ListaPropietarios from './Propietarios/ListaPropietarios';

class PrimeroPropietarios extends React.Component {

  // Campos:
  //   * counterKey es la clave para acceder al valor devuelto por la call a numContracts().
  //   * los elementos del array contractKeys son las claves para acceder al valor devuelto por
  //     las call a deployedContracts(i). i es el indice del array.
  state = { counterKey: null,
            contractKeys: []
          };


  // Al montar el componente programamos la llamada a numContracts().
  componentDidMount() {

    //console.log("============= COMPONENTE MONTADO ========================");
  const { drizzle } = this.props;


    const instance = drizzle.contracts.Factoria;

    //console.log("-->", drizzle.contracts.Factoria);
    // Decirle a drizzle que queremos observar el metodo numContracts().
    const counterKey = instance.methods.nPropietarios.cacheCall();

    // Guardar `counterKey` en el estado local del componente.
    // Usaremos `counterKey` para recuperar el resultado del metodo numContracts().
    this.setState({ counterKey });
  }


  // Cada vez que cambian las propiedades, programamos las llamadas a deployedContracts(i) para obtener las
  // direcciones de los nuevos contratos creados.
  // Las propieddes que cambian reflejan el estado del store (redux).
  componentDidUpdate(prevProps, prevState, snapshoot) {

      //console.log("============= COMPONENTE ACTUALIZADO ========================");

      const drizzleState = this.props.drizzle.store.getState();

      // Obtener el numero de contratos actuales llamando al metodo "numContracts()".
      const numContracts = drizzleState.contracts.Factoria.nPropietarios[this.state.counterKey];

      // Recuperar el valor o 0.
      const nc = (numContracts && numContracts.value) || 0;

      //console.log("==== ACTUAL:", nc);

      // Copiar el estado
      let contractKeys = JSON.parse(JSON.stringify(this.state.contractKeys));

      let mustSetState = false;

      for (let i=0 ; i<nc ; i++) {
          if (typeof contractKeys[i] !== "undefined") { break;} // Contratos ya existentes anteriormente.

          mustSetState = true;

          //console.log("===== Programando contrato:", i);

          //contractKeys[i] = this.props.drizzle.contracts.Factoria.methods["contratos"].cacheCall(i);
          contractKeys[i] = this.props.drizzle.contracts.Factoria.methods["propietarios"].cacheCall(i);
      }

      if (mustSetState) {
          this.setState({ contractKeys });
      }
  }

  render() {
    const drizzleState = this.props.drizzle.store.getState();

    // Obtener el estado del contrato desde drizzleState
    const { Factoria } = drizzleState.contracts;

    //console.log("-->", drizzleState.contracts);
    // Usamos el resultado del metodo "numContracts()" usando la clave
    // `counterKey` guardada en el estado local del componente.
    const numContracts = Factoria.nPropietarios[this.state.counterKey];

    const nc = (numContracts && numContracts.value) || 0;

    let contractAddrs = [];

    for (let i=0 ; i<nc ; i++) {
      //const addr = Factoria.contratos[this.state.contractKeys[i]];
      const addr = Factoria.propietarios[this.state.contractKeys[i]];
      contractAddrs[i] = addr && addr.value;
    }


    return (
        <div className="irsFactory-data">
            <h1 className="display-3"> Propietarios</h1>
            <h2 className="NC"> Nº de Propietarios:  {numContracts && numContracts.value } </h2>

            <ListaPropietarios drizzle={this.props.drizzle}
                                  drizzleState={this.props.drizzleState}
                                  contractAddrs={contractAddrs} />
            <PropietariosFactoria drizzle={this.props.drizzle}
                                  drizzleState={this.props.drizzleState}
                                  contractAddrs={contractAddrs}
                                  numContracts={nc}/>
        </div>
      );
  }
};

export default PrimeroPropietarios;
