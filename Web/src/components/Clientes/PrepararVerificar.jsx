import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
//import Contador from './Contador';

import Button from 'react-bootstrap/Button';
import CrearInvitacion from '../Invitaciones/CrearInvitacion';
import VerificarMatricula from '../Clientes/VerificarMatricula';

class PrepararVerificar extends React.Component {

	state = {
		visible: null, puntero:null, contadorKey:null, punteroKey:null, punteroIniKey:null, matriculasKeys:[],nmatriculasKey:null
	};

	constructor(props) {
    super(props);
    this.crearInvitacion = this.crearInvitacion.bind(this);
		this.enviarParametros = this.enviarParametros.bind(this);
	}


	  componentDidMount (){
			const { drizzle } = this.props;
			if(this.props.existeInvi!=0 || this.props.existeInvi!=0x0000000000000000000000000000000000000000){
				const json1 = require('../../contracts/Invitacion.json');

				const contractConfig1 = {
						contractName: this.props.existeInvi,
						web3Contract: new drizzle.web3.eth.Contract(json1.abi, this.props.existeInvi)
					};
				drizzle.addContract(contractConfig1, []);
			}
		}

		componentDidUpdate(prevProps, prevState, snapshoot) {

	    //console.log("==============Actualizando crear Invitacion=============-->", this.props.nPropietarios);
	    const { drizzle } = this.props;
	    //////////LECTURA 2
	    if(this.props.existeInvi!=0 || this.props.existeInvi!=0x0000000000000000000000000000000000000000){
	    const instance2 = drizzle.contracts[this.props.existeInvi];
	    //console.log("Contratos->", drizzle.contracts);
	    //console.log("instance2222222222->", instance2);

	    if (!instance2) return;

	    let changed = false;

	    let { contadorKey, punteroKey, punteroIniKey,nmatriculasKey} = this.state;

	    //console.log("OKIIIIII-->", instance.methods);
	    if (!contadorKey && !punteroKey && !punteroIniKey, nmatriculasKey) {
	        // Decirle a drizzle que queremos observar el metodo PropietarioPagos().
	        contadorKey = instance2.methods.contador.cacheCall();
	        punteroKey = instance2.methods.puntero.cacheCall();
					punteroIniKey= instance2.methods.punteroIni.cacheCall();
					nmatriculasKey= instance2.methods.nmatriculas.cacheCall();
	        //console.log("OKKKKKKKK22222-->", contadorKey);
	        changed = true;
	    }


	    // Observar las valoraciones:
			const drizzleState = this.props.drizzle.store.getState();
	    const instanceState2 = drizzleState.contracts[this.props.existeInvi];
	    //console.log("instance contracts-->", drizzleState.contracts);
	    //console.log("instance state-->", instanceState);
	    const contador = instanceState2.contador[this.state.contadorKey];
	    const puntero = instanceState2.puntero[this.state.punteroKey];
	    const punteroIni = instanceState2.punteroIni[this.state.punteroIniKey];
			const nmatriculas = instanceState2.nmatriculas[this.state.nmatriculasKey];
			//console.log("Contador-->", contador);
			//console.log("Puntero-->", puntero);
			//console.log("Puntero I-->", punteroIni);

	    /*if (changed) {
	        // Actualizar el estado local
	        this.setState({contadorKey, punteroKey, punteroIniKey});
	    }*/

			// Copiar el estado

			const nm = (nmatriculas && nmatriculas.value) || 0;
      let matriculasKeys = JSON.parse(JSON.stringify(this.state.matriculasKeys));

      let mustSetState = false;

      for (let i=0 ; i<nm ; i++) {
          if (typeof matriculasKeys[i] !== "undefined") { break;} // Contratos ya existentes anteriormente.

          mustSetState = true;

          //console.log("===== Programando contrato:", i);

          //matriculasKeys[i] = this.props.drizzle.contracts.Factoria.methods["contratos"].cacheCall(i);
          matriculasKeys[i] = this.props.drizzle.contracts.Factoria.methods["matriculas"].cacheCall(i);

      }



      if (mustSetState) {
          this.setState({ matriculasKeys, contadorKey, punteroKey, punteroIniKey });
      }
	  }
	  }

		obtenerTodo(){
        const { drizzle } = this.props;
        // Observar las valoraciones:
        const drizzleState = this.props.drizzle.store.getState();
        const instanceState = drizzleState.contracts[this.props.existeInvi];
        //console.log("instance contracts-->", drizzleState.contracts[this.props.existeInvi]);
        //console.log("instance state-->", instanceState);
        let _contador=0;
        let _puntero=0;
        let _punteroIni;
        if (instanceState && instanceState.initialized) {
          const contador = instanceState.contador[this.state.contadorKey];
          const puntero = instanceState.puntero[this.state.punteroKey];
          const punteroIni = instanceState.punteroIni[this.state.punteroIniKey];
          _contador = typeof contador === "undefined" ? 0 : contador.value;
          _puntero = typeof puntero === "undefined" ? 0 : puntero.value;
          _punteroIni = typeof punteroIni === "undefined" ? 0 : punteroIni.value;
        }
        let array=new Array();
        array[0]=_contador;
        array[1]=_puntero;
        array[2]=_punteroIni;
        return array;
      }

	obtenerMatriculas(){
		const { drizzle } = this.props;
		// Observar las valoraciones:
		const drizzleState = this.props.drizzle.store.getState();
		const instanceState = drizzleState.contracts[this.props.existeInvi];
		let _nmatriculas=0;
		if (instanceState && instanceState.initialized) {
			const nmatriculas = instanceState.nmatriculas[this.state.nmatriculasKey];
			_nmatriculas = typeof nmatriculas === "undefined" ? 0 : nmatriculas.value;
		}

		let matriculas = [];

    for (let i=0 ; i<_nmatriculas ; i++) {
      //const addr = Factoria.contratos[this.state.contractKeys[i]];
      const addr = instanceState.matriculas[this.state.matriculasKeys[i]];
      matriculas[i] = addr && addr.value;
      //console.log("OK NC-->", contractAddrs[i]);
    }

		return matriculas;

	}


	setVisible(addr) {
		if (this.state.visible !== addr) {
			this.setState({ visible: addr });
		}
	}

	crearInvitacion(){

		let punteroIni=0;
		if(this.props.nPropietarios>1){
				punteroIni = Math.floor(Math.random() * (this.props.nPropietarios - 1) + 1);
				if(punteroIni==(this.props.nPropietarios - 1)){
					this.state.puntero=0;
				}else{
					this.state.puntero=punteroIni+1;
				}
		}else {
			this.state.puntero=0;
		}
		var f=new Date();
		const { drizzle, drizzleState } = this.props;
		const instance = drizzle.contracts.Factoria;
		//console.log("Instance-->", instance);
		//console.log("P-->", this.state.puntero);
		//console.log("P I-->", punteroIni);
		const stackId = instance.methods.crearInvitacion.cacheSend(f.getDate(),this.state.puntero,punteroIni,{
				from: drizzleState.accounts[0]
			});
	}

	enviarParametros (){
		let array=new Array();
		array=this.obtenerMatriculas();
		var myJSON = JSON.stringify(array);
		fetch('http://127.0.0.1:4000/ReceiveJSON', {
  		method: 'POST',
			mode:'no-cors',
			body: JSON.stringify({a:1}),
  		headers: {
				'Accept': 'application/json',
 				'Content-Type': 'application/json; charset=utf-8'
  		},

		}, function(error, response, body){
  console.log(body);
});

	}

	render() {
					if(this.props.existeInvi!=0 || this.props.existeInvi!=0x0000000000000000000000000000000000000000){
						//Para que solo inicie crearInvitacion cuando tengamos la addr del contrato Invitacion del dia de hoy disponible
						return (
				      <VerificarMatricula drizzle={this.props.drizzle}
									drizzleState={this.props.drizzleState}

	                contractAddrs={this.props.contractAddrs}
	                puntero={this.state.puntero}
	                nPropietarios={this.props.nPropietarios}
									existeInvi={this.props.existeInvi}/>
	        );
				}
    return (
			<div>
        <ol className="irsFactory-contracts">

        </ol>

				</div>
      );




	}
};

export default PrepararVerificar;
