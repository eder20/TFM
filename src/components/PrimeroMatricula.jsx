import React from 'react';



//import ContadorFactoria from './ContadorFactoria';
import InvitacionesFactoria from './Invitaciones/InvitacionesFactoria';
import PropietariosFactoria from './Propietarios/PropietariosFactoria';
//import ContratosFactoria from './ContratosFactoria';
import ListaInvitaciones from './Invitaciones/ListaInvitaciones';
import ListaPropietarios from './Propietarios/ListaPropietarios';
import PrepararInvitacion from './Propietarios/PrepararInvitacion';
import CrearInvitacion from './Invitaciones/CrearInvitacion';
import PrepararVerificar from './Clientes/PrepararVerificar';
class PrimeroMatricula extends React.Component {

  // Campos:
  //   * counterKey es la clave para acceder al valor devuelto por la call a numContracts().
  //   * los elementos del array contractKeys son las claves para acceder al valor devuelto por
  //     las call a deployedContracts(i). i es el indice del array.
  state = { counterKey: null,counterKey2: null,
            contractKeys: [], inviKey: []
          };


  // Al montar el componente programamos la llamada a numContracts().
  componentDidMount() {

    //console.log("============= COMPONENTE MONTADO ========================");
  const { drizzle } = this.props;


    const instance = drizzle.contracts.Factoria;

    //console.log("-->", drizzle.contracts.Factoria);
    // Decirle a drizzle que queremos observar el metodo numContracts().
    const counterKey = instance.methods.nContratos.cacheCall();

    const counterKey2 = instance.methods.nPropietarios.cacheCall();

    // Guardar `counterKey` en el estado local del componente.
    // Usaremos `counterKey` para recuperar el resultado del metodo numContracts().
    this.setState({ counterKey,counterKey2 });
  }


  // Cada vez que cambian las propiedades, programamos las llamadas a deployedContracts(i) para obtener las
  // direcciones de los nuevos contratos creados.
  // Las propieddes que cambian reflejan el estado del store (redux).
  componentDidUpdate(prevProps, prevState, snapshoot) {

      //console.log("============= COMPONENTE ACTUALIZADO ========================");

      const drizzleState = this.props.drizzle.store.getState();

      // Obtener el numero de contratos actuales llamando al metodo "numContracts()".
      const numContracts = drizzleState.contracts.Factoria.nContratos[this.state.counterKey];

      const numPropietarios = drizzleState.contracts.Factoria.nPropietarios[this.state.counterKey2];

      // Recuperar el valor o 0.
      const nc = (numContracts && numContracts.value) || 0;

      const np = (numPropietarios && numPropietarios.value) || 0;

      //console.log("==== ACTUAL:", nc);

      // Copiar el estado
      let contractKeys = JSON.parse(JSON.stringify(this.state.contractKeys));

      let inviKey = JSON.parse(JSON.stringify(this.state.inviKey));

      let mustSetState = false;

      for (let i=0 ; i<np ; i++) {
          if (typeof contractKeys[i] !== "undefined") { break;} // Contratos ya existentes anteriormente.

          mustSetState = true;

          //console.log("===== Programando contrato:", i);

          //contractKeys[i] = this.props.drizzle.contracts.Factoria.methods["contratos"].cacheCall(i);
          contractKeys[i] = this.props.drizzle.contracts.Factoria.methods["propietarios"].cacheCall(i);

          var f=new Date();
          inviKey=this.props.drizzle.contracts.Factoria.methods["invi"].cacheCall(f.getDate());
      }



      if (mustSetState) {
          this.setState({ contractKeys,inviKey });
      }
  }



  render() {
    const drizzleState = this.props.drizzle.store.getState();

    // Obtener el estado del contrato desde drizzleState
    const { Factoria } = drizzleState.contracts;

    //console.log("-->", drizzleState.contracts);
    // Usamos el resultado del metodo "numContracts()" usando la clave
    // `counterKey` guardada en el estado local del componente.
    const numContracts = Factoria.nContratos[this.state.counterKey];

    const numPropietarios = Factoria.nPropietarios[this.state.counterKey2];

    const nc = (numContracts && numContracts.value) || 0;

    const np = (numPropietarios && numPropietarios.value) || 0;

    //console.log("NPPPPPPP", np);

    const invi=Factoria.invi[this.state.inviKey];
    let _invitaciones = typeof invi === "undefined" ? 0 : invi.value;
    console.log("Contrato de hoy-------->", _invitaciones);
    var f=new Date();
    //let invi=this.props.drizzle.contracts.Factoria.methods.getInvitacion(f.getDate()).call(f.getDate())
    /*if(invi="undefined"){
      console.log("Contrato de hoy-------->", invi);
      const { drizzle, drizzleState } = this.props;

      const instance = drizzle.contracts.Factoria;
      const stackId = instance.methods.crearInvitacion.cacheSend(f.getDate,{
        from: drizzleState.accounts[0]
      });
    }*/
    //Esto no se usa por que se crea con un boton
    if(this.props.existeInv==0 || this.props.existeInvi==0x0000000000000000000000000000000000000000){
      var f=new Date();
      //console.log("Dia-->", f.getDate());
      //console.log("existeInvi-->", this.props.existeInvi);
      if(this.props.existeInvi==0 || this.props.existeInvi==0x0000000000000000000000000000000000000000){

      const { drizzle, drizzleState } = this.props;

      const instance = drizzle.contracts.Factoria;
      const stackId = instance.methods.crearInvitacion.cacheSend(f.getDate(),{
          from: drizzleState.accounts[0]
        });
      }
    }

    let contractAddrs = [];

    for (let i=0 ; i<np ; i++) {
      //const addr = Factoria.contratos[this.state.contractKeys[i]];
      const addr = Factoria.propietarios[this.state.contractKeys[i]];
      contractAddrs[i] = addr && addr.value;
      //console.log("OK NC-->", contractAddrs[i]);
    }

    return (
        <div className="irsFactory-data">
            <h1 className="display-3"> Invitaciones</h1>
            <h2 className="NC"> Nº de Invitaciones:  {numContracts && numContracts.value } </h2>
            <PrepararVerificar drizzle={this.props.drizzle}
                                  drizzleState={this.props.drizzleState}
                                  contractAddrs={contractAddrs}
                                  nPropietarios={np}
                                  ninvitaciones={nc}
                                  existeInvi={_invitaciones}/>


        </div>
      );
  }
};

export default PrimeroMatricula;
