import React from 'react';



class Invitacion extends React.Component {

	state = { diaKey: null, punteroKey:null,contadorKey:null,
              matriculasKeys: [],matriculasKeys: []
            };


	componentDidMount() {

    	console.log("==== COMPONENTE IRS MONTADO ============", this.props.contractAddr );

    	const { drizzle } = this.props;

    	const json = require('../../contracts/Invitacion.json');

		const contractConfig = {
  			 contractName: this.props.contractAddr,
  			 web3Contract: new drizzle.web3.eth.Contract(json.abi, this.props.contractAddr)
		  };

      drizzle.addContract(contractConfig, []);

			console.log("OK1-->", drizzle.contracts[this.props.contractAddr]);

  	}


    componentWillUnmount() {

      console.log("==== COMPONENTE IRS DESMONTADO ============", this.props.contractAddr );

      const { drizzle, contractAddr } = this.props;

      drizzle.deleteContract(contractAddr);
    }



    componentDidUpdate(prevProps, prevState, snapshoot) {

        const { drizzle } = this.props;

        const instance = drizzle.contracts[this.props.contractAddr];

        if (!instance) return;

        let changed = false;

        let { diaKey, punteroKey, contadorKey} = this.state;

				console.log("OKIIIIII-->", instance.methods);
        if (!diaKey && !contadorKey && !punteroKey) {
            // Decirle a drizzle que queremos observar el metodo InvitacionPagos().
            diaKey = instance.methods.dia.cacheCall();
						contadorKey = instance.methods.contadorya.cacheCall();
						punteroKey = instance.methods.puntero.cacheCall();
						console.log("OKKKKKKKK-->", diaKey);
            changed = true;
        }


        // Observar las valoraciones:
        const drizzleState = this.props.drizzle.store.getState();
        const instanceState = drizzleState.contracts[this.props.contractAddr];
				console.log("OKSSSSSS1111111-->", instanceState);
        const dia = instanceState.dia[this.state.diaKey];
				const puntero = instanceState.puntero[this.state.punteroKey];
				const contadorya = instanceState.contadorya[this.state.contadorKey];
				console.log("OKP-->", dia);
        //const cp = typeof dia === "undefined" ? 0 : dia.value;

        // Copiar el estado
        //matriculasKeys = JSON.parse(JSON.stringify(matriculasKeys));

        // Observar matriculas[i].
        /*for (let i=0 ; i<cp ; i++) {
            if (typeof matriculasKeys[i] === "undefined") {
                changed = true;
                matriculasKeys[i] = instance.methods["matriculas"].cacheCall(i);
            }
        }
*/
        if (changed) {
            // Actualizar el estado local
            this.setState({ diaKey,punteroKey,contadorKey  });
        }
  	}

    render() {

		// Obtener el estado del contrato desde drizzleState
      const drizzleState = this.props.drizzle.store.getState();
    	const instanceState = drizzleState.contracts[this.props.contractAddr];
			console.log("OKSSSSSS2222222-->", instanceState);
			//console.log("OKSSSSSS2222222-->", instanceState.dia[this.state.diaKey]);
			let p="null";
			let _puntero="null";
			let _contadorya="null";
			if (instanceState && instanceState.initialized) {
				const dia = instanceState.dia[this.state.diaKey];
				const puntero = instanceState.puntero[this.state.punteroKey];
				const contadorya = instanceState.contadorya[this.state.contadorKey];
				console.log("OKSSSSSSPPPPPPPP-->", dia);
				p = typeof dia === "undefined" ? 0 : dia.value;
				_puntero = typeof puntero === "undefined" ? 0 : puntero.value;
				_contadorya = typeof contadorya === "undefined" ? 0 : contadorya.value;
				console.log("OKSSSSSSPPPPPPPP-->", p);
			}

    	return (
			<div className="irs">

				<p>dia: {p}</p> <p>contadorya: {_contadorya}</p><p>puntero: {_puntero}</p>

			</div>
      	);



    }
};

export default Invitacion;
