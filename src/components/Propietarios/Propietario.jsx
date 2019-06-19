import React from 'react';



class Propietario extends React.Component {

	state = { nombreKey: null, codigoKey:null,ninvitacionesKey:null,precioKey:null,
              paymentInfoKeys: [], counterKey:null
            };


	componentDidMount() {

    	//console.log("==== COMPONENTE IRS MONTADO ============", this.props.contractAddr );
//console.log("==============Montando Propietario============-->", this.props.contractAddr);
    	const { drizzle } = this.props;

    	const json = require('../../contracts/Propietario.json');

		const contractConfig = {
  			 contractName: this.props.contractAddr,
  			 web3Contract: new drizzle.web3.eth.Contract(json.abi, this.props.contractAddr)
		  };

      drizzle.addContract(contractConfig, []);

			//console.log("Propietario-->", drizzle.contracts);

  	}


    componentWillUnmount() {

      //console.log("==== COMPONENTE IRS DESMONTADO ============", this.props.contractAddr );

      const { drizzle, contractAddr } = this.props;

      drizzle.deleteContract(contractAddr);
    }



    componentDidUpdate(prevProps, prevState, snapshoot) {

        const { drizzle } = this.props;

        const instance = drizzle.contracts[this.props.contractAddr];

				//console.log("instance-->", instance);

        if (!instance) return;

        let changed = false;

        let { nombreKey, codigoKey, ninvitacionesKey, precioKey} = this.state;

				//console.log("OKIIIIII-->", instance.methods);
        if (!nombreKey && !ninvitacionesKey && !codigoKey && !precioKey) {
            // Decirle a drizzle que queremos observar el metodo PropietarioPagos().
            nombreKey = instance.methods.nombre.cacheCall();
						ninvitacionesKey = instance.methods.ninvitaciones.cacheCall();
						codigoKey = instance.methods.codigo.cacheCall();
            precioKey = instance.methods.precio.cacheCall();
						//console.log("OKKKKKKKK-->", nombreKey);
            changed = true;
        }


        // Observar las valoraciones:
        const drizzleState = this.props.drizzle.store.getState();
        const instanceState = drizzleState.contracts[this.props.contractAddr];
				//console.log("instance contracts-->", drizzleState.contracts);
				//console.log("instance State-->", instanceState);
        const nombre = instanceState.nombre[this.state.nombreKey];
				const codigo = instanceState.codigo[this.state.codigoKey];
				const ninvitaciones = instanceState.ninvitaciones[this.state.ninvitacionesKey];
        const precio = instanceState.precio[this.state.ninvitacionesKey];

        if (changed) {
            // Actualizar el estado local
            this.setState({ nombreKey,codigoKey,ninvitacionesKey,precioKey  });
        }
  	}

    render() {

		// Obtener el estado del contrato desde drizzleState
      const drizzleState = this.props.drizzle.store.getState();
    	const instanceState = drizzleState.contracts[this.props.contractAddr];
			console.log("Intancia-->", instanceState);

			let _nombre="null";
			let _codigo=0;
			let _ninvitaciones=0;
      let _precio=0;
			if (instanceState && instanceState.initialized) {
        const nombre = instanceState.nombre[this.state.nombreKey];
				const codigo = instanceState.codigo[this.state.codigoKey];
				const ninvitaciones = instanceState.ninvitaciones[this.state.ninvitacionesKey];
        const precio = instanceState.precio[this.state.precioKey];
				_nombre = typeof nombre === "undefined" ? 0 : nombre.value;
				_codigo = typeof codigo === "undefined" ? 0 : codigo.value;
				_ninvitaciones = typeof ninvitaciones === "undefined" ? 0 : ninvitaciones.value;
        _precio = typeof precio === "undefined" ? 0 : precio.value;

			}

    	return (
			<div className="irs">

				<p>Nombe: {_nombre}</p> <p>Numero de invitaciones: {_ninvitaciones}</p>
			</div>
      	);



    }
};

export default Propietario;
