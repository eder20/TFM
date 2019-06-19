import React from 'react';

//import Contador from './Contador';
import Cliente from './Cliente';

class ListaClientes extends React.Component {

	state = {
		visible: null
	};

	setVisible(addr) {
		if (this.state.visible !== addr) {
			this.setState({ visible: addr });
		}
	}

	render() {

	  	const contracts = this.props.contractAddrs.map((addr, index) => {
				console.log("direcciones-->", addr);
	  		if (addr) {
					return (
						<li className="irsFactory-contracts-item"
					    	key={"contract"+index}>
					    	<Cliente drizzle={this.props.drizzle}
								  drizzleState={this.props.drizzleState}
					    		  contractAddr={addr} />
						</li>
					);

			}else {
				return (
					<li className="irsFactory-contracts-esperando"
				    	key={"no-contract-irs"+index}>
				    	Esperando...
					</li>
				);
			}
		});

	    return (
	        <ol className="irsFactory-contracts">
				 {contracts}
	        </ol>
	      );
	}
};

export default ListaClientes;
