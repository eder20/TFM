import React from 'react';

//import Contador from './Contador';
import Propietario from './Propietario';

import CrearInvitacion from '../Invitaciones/CrearInvitacion';

class CrearInviDia extends React.Component {

	state = {
		visible: null, puntero:0,okInvi:null
	};

	setVisible(addr) {
		if (this.state.visible !== addr) {
			this.setState({ visible: addr });
		}
	}

  componentDidMount(){
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


	render() {
      if( this.state.okInvi==1){
          //console.log("Puntero OK->", this.state.puntero);
						return (
				      <CrearInvitacion drizzle={this.props.drizzle}
									drizzleState={this.props.drizzleState}
						    	contractAddr={addr}
	                contractAddrs={this.props.contractAddrs}
	                puntero={this.state.puntero}
	                nPropietarios={this.props.nPropietarios}
									existeInvi={this.props.existeInvi}/>

	        );
				}else if(if(this.props.existeInvi!=0 || this.props.existeInvi!=0x0000000000000000000000000000000000000000){){
					<CrearInviDia drizzle={this.props.drizzle}
							drizzleState={this.props.drizzleState}
							contractAddr={addr}
							contractAddrs={this.props.contractAddrs}
							puntero={this.state.puntero}
							nPropietarios={this.props.nPropietarios}
							existeInvi={this.props.existeInvi}/>
				}

      }
    }
    );
    return (
        <ol className="irsFactory-contracts">
       {contracts}
        </ol>
      );




	}
};

export default CrearInviDia;
