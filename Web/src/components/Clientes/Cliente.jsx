import React from 'react';



class Cliente extends React.Component {

	state = { addrKey: null, matriculaKey:null,
            };


	componentDidMount() {

    	//console.log("==== COMPONENTE IRS MONTADO ============", this.props.contractAddr );
//console.log("==============Montando Cliente============-->", this.props.contractAddr);
    	const { drizzle } = this.props;

    	const json = require('../../contracts/Cliente.json');

		const contractConfig = {
  			 contractName: this.props.contractAddr,
  			 web3Contract: new drizzle.web3.eth.Contract(json.abi, this.props.contractAddr)
		  };

      drizzle.addContract(contractConfig, []);

			//console.log("Cliente-->", drizzle.contracts);

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

        let { addrKey, matriculaKey} = this.state;

				//console.log("OKIIIIII-->", instance.methods);
        if (!addrKey && !matriculaKey ) {
            // Decirle a drizzle que queremos observar el metodo ClientePagos().
            addrKey = instance.methods.addr.cacheCall();

						matriculaKey = instance.methods.matricula.cacheCall();

						//console.log("OKKKKKKKK-->", addrKey);
            changed = true;
        }


        // Observar las valoraciones:
        const drizzleState = this.props.drizzle.store.getState();
        const instanceState = drizzleState.contracts[this.props.contractAddr];
				//console.log("instance contracts-->", drizzleState.contracts);
				//console.log("instance State-->", instanceState);
        const addr = instanceState.addr[this.state.addrKey];
				const matricula = instanceState.matricula[this.state.matriculaKey];


        if (changed) {
            // Actualizar el estado local
            this.setState({ addrKey,matriculaKey });
        }
  	}

    render() {

		// Obtener el estado del contrato desde drizzleState
      const drizzleState = this.props.drizzle.store.getState();
    	const instanceState = drizzleState.contracts[this.props.contractAddr];
			console.log("OKSSSSSS2222222-->", instanceState);

			let _addr="null";
			let _matricula="null";

			if (instanceState && instanceState.initialized) {
        const addr = instanceState.addr[this.state.addrKey];
				const matricula = instanceState.matricula[this.state.matriculaKey];

				_addr = typeof addr === "undefined" ? 0 : addr.value;
				_matricula = typeof matricula === "undefined" ? 0 : matricula.value;


			}

    	return (
			<div className="irs">

				<p>Address: {_addr}</p> <p>matricula: {_matricula}</p>

			</div>
      	);



    }
};

export default Cliente;
