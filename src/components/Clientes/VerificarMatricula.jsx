import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import Updating from '../common/Info';
import Error from '../common/Info';
import IncrControl from '../common/Button';
import { Route, Link } from 'react-router-dom';
import Login from '../Login';
import { Button, InputGroup, InputGroupAddon, InputGroupText, Input, Alert } from 'reactstrap';

class VerificarMatricula extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeNombre = this.handleChangeNombre.bind(this);
    this.state = {
      matricula: '',
      matriculasKeys: []
    };
    //this.fileInput = React.createRef();

  }

  state = {
		visible: null, puntero:null, contadorKey:null, punteroKey:null, punteroIniKey:null,  nmatriculasKey:null
	};

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
    console.log("Montandoooo",this.props.existeInvi );
  }

  componentDidUpdate(prevProps, prevState, snapshoot) {

    //console.log("==============Actualizando crear Invitacion=============-->", this.props.nPropietarios);
    const { drizzle } = this.props;




    // Observar las valoraciones:
    const drizzleState = this.props.drizzle.store.getState();

    //////////LECTURA 2
    if(this.props.existeInvi!=0 || this.props.existeInvi!=0x0000000000000000000000000000000000000000){
    const instance2 = drizzle.contracts[this.props.existeInvi];
    //console.log("Contratos->", drizzle.contracts);
    //console.log("instance2222222222->", instance2);

    if (!instance2) return;

    let changed = false;

    let { contadorKey, punteroKey, punteroIniKey, nmatriculasKey} = this.state;

    //console.log("OKIIIIII-->", instance.methods);
    if (!contadorKey && !punteroKey && !punteroIniKey && !nmatriculasKey) {
        // Decirle a drizzle que queremos observar el metodo PropietarioPagos().
        contadorKey = instance2.methods.contador.cacheCall();
        punteroKey = instance2.methods.puntero.cacheCall();
        punteroIniKey = instance2.methods.punteroIni.cacheCall();
        nmatriculasKey = instance2.methods.nmatriculas.cacheCall();
        //console.log("OKKKKKKKK22222-->", contadorKey);
        changed = true;
    }




    // Observar las valoraciones:
    const instanceState2 = drizzleState.contracts[this.props.existeInvi];
    //console.log("instance contracts-->", drizzleState.contracts);
    //console.log("instance state-->", instanceState);
    const contador = instanceState2.contador[this.state.contadorKey];
    const puntero = instanceState2.puntero[this.state.punteroKey];
    const punteroIni = instanceState2.punteroIni[this.state.punteroIniKey];
    const nmatriculas = instanceState2.nmatriculas[this.state.nmatriculasKey];

    const nm = (nmatriculas && nmatriculas.value) || 0;

    let matriculasKeys = JSON.parse(JSON.stringify(this.state.matriculasKeys));

    let mustSetState = false;

    for (let i=0 ; i<nm ; i++) {
        if (typeof matriculasKeys[i] !== "undefined") { break;} // Contratos ya existentes anteriormente.

        mustSetState = true;

        //console.log("===== Programando contrato:", i);

        //matriculasKeys[i] = this.props.drizzle.contracts.Factoria.methods["contratos"].cacheCall(i);
        matriculasKeys[i] = instance2.methods.matriculas.cacheCall(i);
    }


    if (changed) {
        // Actualizar el estado local
        this.setState({contadorKey, punteroKey, punteroIniKey,nmatriculasKey});
    }

    if (mustSetState) {
        this.setState({ matriculasKeys });
    }
  }

  }

  state = { stackId: null, visible: 0,name: null };

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

     event.preventDefault();
     alert('Matricula: ' + this.state.matricula);
     let array=new Array();
     array=this.obtenerMatriculas();
     console.log("OKKKK",array.length);
     this.setState({visible:2 });
     for(let i=0;i<array.length;i++){
       //this.setState({visible:2 });
       if(array[i]==this.state.matricula){
         this.setState({visible:1 });
       }
       console.log("Matricula-->",array[i]);
       console.log(this.state.matricula);
     }

    // Guardar stackId en el estado local

  }

  handleChangeNombre (e) {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      matricula: value
    })
  };

  obtenerMatriculas(){
    const { drizzle } = this.props;
    // Observar las valoraciones:
    const drizzleState = this.props.drizzle.store.getState();
    const instanceState = drizzleState.contracts[this.props.existeInvi];
    console.log(instanceState);
    let _nmatriculas=0;
    if (instanceState && instanceState.initialized) {
      const nmatriculas = instanceState.nmatriculas[this.state.nmatriculasKey];
      _nmatriculas = typeof nmatriculas === "undefined" ? 0 : nmatriculas.value;
    }
    console.log("OKKKK2222",_nmatriculas);

    let matriculas = [];

    for (let i=0 ; i<_nmatriculas ; i++) {
      //const addr = Factoria.contratos[this.state.matriculasKeys[i]];
      const addr = instanceState.matriculas[this.state.matriculasKeys[i]];
      matriculas[i] = addr && addr.value;
      //console.log("Matriculas", matriculas[i]);
    }
    return matriculas;
  }



  setVisible(addr) {
    if (this.state.visible !== 1) {
      this.setState({ visible: 1 });
    }
  }

  render() {
    if(this.state.visible==1){
      return(
        <div>
        <Alert color="success">
          Tiene Invitacion
        </Alert>
        </div>
      );
    }else if(this.state.visible==2){
      return(
        <div>
        <Alert color="danger">
          No tiene Invitacion
        </Alert>
        </div>
      );
    }
        return (
          <div>
            <form onSubmit={this.handleSubmit}>
              <label>Matricula</label>
              <Input placeholder="Matricula" value={this.state.matricula} onChange={this.handleChangeNombre} />
              <br />
              <Button type="submit" color="success">Verificar</Button>
            </form>
          </div>
  );





  }

}

export default VerificarMatricula;
