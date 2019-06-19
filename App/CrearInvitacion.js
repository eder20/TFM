/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput, Container, TouchableOpacity} from 'react-native';
import ReactNativeComponentTree from 'react-native';

import PrepararInvitacion from "./PrepararInvitacion"
type Props = {};
export default class CrearInvitacion extends Component<Props> {
  constructor(props) {
      super(props);
      this.comprar = this.comprar.bind(this);
      this.handleChangeMatricula = this.handleChangeMatricula.bind(this);
      this.state = {
        visible:1,
        agotado:0,
        puntero: 0,
        punteroIniKey: null,
        ninvitacionesKey:null,
        precioKey:null,
        contador:1,
        contadorKey:null,
        punteroKey:null,
        matricula:'',
        comprado:0,
        arrayMatriculas:new Array(),
        arrayCodigo:new Array()
      };
    }

    state = {ninvitacionesKey:null,
    precioKey:null, nombreKey:null,codigoKey:null };

    componentDidMount (){
        //console.log("==============Montando crear Invitacion============-->", this.props.nPropietarios);

            const { drizzle } = this.props;
            const json = require('./build/contracts/Propietario.json');

            const contractConfig = {
                contractName: this.props.contractAddr,
                web3Contract: new drizzle.web3.eth.Contract(json.abi, this.props.contractAddr)
              };
            drizzle.addContract(contractConfig, []);
            //console.log("Contrato-->", drizzle.contracts);
            this.state.puntero=this.props.puntero;


            if(this.props.existeInvi!=0 || this.props.existeInvi!=0x0000000000000000000000000000000000000000){
              const json1 = require('./build/contracts/Invitacion.json');

              const contractConfig1 = {
                  contractName: this.props.existeInvi,
                  web3Contract: new drizzle.web3.eth.Contract(json1.abi, this.props.existeInvi)
                };
              drizzle.addContract(contractConfig1, []);
            }

            //console.log("==============Montando crear Invitacion============-->", this.props.nPropietarios);
    }



    componentDidUpdate(prevProps, prevState, snapshoot) {

      //console.log("==============Actualizando crear Invitacion=============-->", this.props.nPropietarios);
      const { drizzle } = this.props;

      //console.log("OK CCCCCCC-->", drizzle.contracts[this.props.contractAddr]);
      const instance = drizzle.contracts[this.props.contractAddr];

      //console.log("instance111111111->", instance);

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
      //console.log("instance state-->", instanceState);
      const nombre = instanceState.nombre[this.state.nombreKey];
      const codigo = instanceState.codigo[this.state.codigoKey];
      const ninvitaciones = instanceState.ninvitaciones[this.state.ninvitacionesKey];
      const precio = instanceState.precio[this.state.ninvitacionesKey];

      if (changed) {
          // Actualizar el estado local
          this.setState({ nombreKey,codigoKey,ninvitacionesKey,precioKey  });
      }

      //////////LECTURA 2
      if(this.props.existeInvi!=0 || this.props.existeInvi!=0x0000000000000000000000000000000000000000){
      const instance2 = drizzle.contracts[this.props.existeInvi];
      //console.log("Contratos->", drizzle.contracts);
      //console.log("instance2222222222->", instance2);

      if (!instance2) return;

      let changed = false;

      let { contadorKey, punteroKey, punteroIniKey} = this.state;

      //console.log("OKIIIIII-->", instance.methods);
      if (!contadorKey && !punteroKey && !punteroIniKey) {
          // Decirle a drizzle que queremos observar el metodo PropietarioPagos().
          contadorKey = instance2.methods.contador.cacheCall();
          punteroKey = instance2.methods.puntero.cacheCall();
          punteroIniKey = instance2.methods.punteroIni.cacheCall();
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

      if (changed) {
          // Actualizar el estado local
          this.setState({contadorKey, punteroKey, punteroIniKey});
      }
    }

    }



    comprar(event) {
              event.preventDefault();
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

              const { drizzle } = this.props;

              const drizzleState = this.props.drizzle.store.getState();
              const instanceState = drizzleState.contracts[this.props.contractAddr];
              //console.log("instanceState 111111-->", instanceState);
              //console.log("OKSSSSSS2222222-->", instanceState.propietario[this.state.nombreKey]);
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

              //console.log("Ninvitaciones-->", _ninvitaciones);
              //console.log("Precio-->", _precio);
              let array=new Array();
              array=this.obtenerTodo();
              //console.log("puntero 0-->", array[1]);
              //console.log("Contaodr 0-->", array[0]);
              //console.log("puntero Ini 0-->", array[2]);
              if(array[1]==array[2] && array[0]>=_ninvitaciones){
                //console.log("Ya no hay mas Propietarios-->", array[1]);
                array[0]++;
                this.setState({ agotado: 1 });
                this.setState({ visible: 0 });
                this.setState({ comprado: 1 });
                this.agregarMatricula(array[1],array[0]);
                this.crearPropietario();
              }else if(array[0]>=_ninvitaciones){
                    //this.agregarMatricula();
                    //console.log("Ya no hay mas invitaciones-->", this.state.contador);
                    array[1]++;
                    this.state.puntero=array[1];
                    array[0]=1;
                    //console.log("puntero 1-->", array[1]);
                    //console.log("Contador 1-->", array[0]);
                    this.setState({ visible: 0 });
                    /*if(array[1]==array[2]){
                      console.log("Ya no hay mas propietarios-->", array[1]);
                      this.setState({ agotado: 1 });
                    }else*/ if(array[1]>=this.props.nPropietarios){
                      array[1]=0;
                      //console.log("Empieza la lista-->", array[1]);
                      //this.setState({ agotado: 1 });
                    }else{
                      //Comprar la del siguiente propietar
                    }
                    this.setState({ comprado: 1 });
                    this.agregarMatricula(array[1],array[0]);
                    this.crearPropietario();
              }else{
                array[0]++;
                //console.log("Contador 1-->", array[0]);
                this.setState({ comprado: 1 });
                this.agregarMatricula(array[1],array[0]);
                this.crearPropietario();
                //console.log("Ha comprado Invitacion-->", array[0]);
              }


            }


      agregarMatricula (x,y) {
        const { drizzle, drizzleState } = this.props;
        /*const json = require('../../contracts/Invitacion.json');

        const contractConfig = {
            contractName: this.props.existeInvi,
            web3Contract: new drizzle.web3.eth.Contract(json.abi, this.props.existeInvi)
          };
        drizzle.addContract(contractConfig, []);*/
        //console.log("Contrato-->", drizzle.contracts[this.props.existeInvi]);


        const instance = drizzle.contracts[this.props.existeInvi];
        //console.log("instance-->", instance);
        const stackId = instance.methods.anadirTodo.cacheSend(this.state.matricula,x,y,{
            from: drizzleState.accounts[0], gas: '1000000'
          });
      }

      crearPropietario(){
        const { drizzle, drizzleState } = this.props;
        const instance = drizzle.contracts.Factoria;
    		const stackId = instance.methods.crearCliente.cacheSend(this.state.matricula,{
    				from: drizzleState.accounts[0], gas: '1000000'
    			});
      }


      obtenerTodo(){

          /*const json = require('../../contracts/Invitacion.json');

          const contractConfig = {
              contractName: this.props.existeInvi,
              web3Contract: new drizzle.web3.eth.Contract(json.abi, this.props.existeInvi)
            };
          drizzle.addContract(contractConfig, []);
          console.log("Contrato-->", drizzle.contracts[this.props.existeInvi]);*/


          //console.log("==============Actualizando crear Invitacion=============-->", this.props.nPropietarios);


          //console.log("OK CCCCCCC-->", drizzle.contracts[this.props.contractAddr]);



          //console.log("OKIIIIII-->", instance.methods);

          const { drizzle } = this.props;
          // Observar las valoraciones:
          const drizzleState = this.props.drizzle.store.getState();
          const instanceState = drizzleState.contracts[this.props.existeInvi];
          //console.log("instance contracts-->", drizzleState.contracts[this.props.existeInvi]);
          //console.log("instance state-->", instanceState);
          let _contador=0;
          let _puntero=0;
          let _punteroIni=0;
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


      componentWillUnmount() {

        //console.log("==== COMPONENTE IRS DESMONTADO ============", this.props.contractAddr );

        const { drizzle, contractAddr } = this.props;

        drizzle.deleteContract(contractAddr);
      }

      handleChangeMatricula (e) {
        //e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
          matricula: value
        })
      };


  	setVisible(addr) {
  		if (this.state.visible !== addr) {
  			this.setState({ visible: addr });
  		}
  	}

  	render() {
      const { drizzle } = this.props;

      const drizzleState = this.props.drizzle.store.getState();
      const instanceState = drizzleState.contracts[this.props.contractAddr];
      //console.log("instanceState 111111-->", instanceState);
      //console.log("OKSSSSSS2222222-->", instanceState);
      //console.log("OKSSSSSS2222222-->", instanceState.propietario[this.state.nombreKey]);
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

      let array=new Array();
      array=this.obtenerTodo();
      if(array[1]==array[2] && array[0]>_ninvitaciones){
        return(
          <View style={styles.container}>
          <Text>
            No quedan invitaciones
          </Text>
          </View>
        );
      }else if(this.state.visible==1 && this.state.comprado==0){
        return(

          <View style={styles.container}>
            <Text style={styles.welcome2}>Introduce la matricula</Text>
            <TextInput  placeholder={"Matricula"} style={styles.input}  onChangeText={(matricula) => this.setState({matricula})} />
            <Text style={styles.baseText}>Propietario: {_nombre}</Text>
            <View style={styles.footer}>
            <TouchableOpacity style={styles.startButton} onPress={this.comprar}>
         <Text> Comprar </Text>
       </TouchableOpacity>
       </View>
          </View>

          );

        }else if(this.state.visible==0 && this.state.agotado==0){
          return(
            <PrepararInvitacion drizzle={this.props.drizzle}
                                  drizzleState={this.props.drizzleState}
                                  puntero={this.state.puntero}
                                  contractAddrs={this.props.contractAddrs}
                                  nPropietarios={this.props.nPropietarios}
                                  existeInvi={this.props.existeInvi}/>
          );
        }else if(this.state.agotado==1){
          return(
            <View style={styles.container}>
            <Text>
              No quedan invitaciones
            </Text>
              </View>
          );
        }else if(this.state.comprado==1){
          return(
            <View style={styles.container}>
            <Text>
              Invitacion Comprada
            </Text>
              </View>
          );
        }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#95D3BF',
  },
  container2: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: '#95D3BF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
  },
  welcome2: {
    fontSize: 16,
    textAlign: 'center',
    margin: 20,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  baseText: {
   fontFamily: 'Arial',
 },
 buttonStyle: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
     shadowOffset: { height: 1, width: 1 }, // IOS
     shadowOpacity: 1, // IOS
     shadowRadius: 1, //IOS
     backgroundColor: 'blue',
     elevation: 2, // Android
     height: 50,
     width: 100,
     justifyContent: 'center',
     alignItems: 'center',
     flexDirection: 'row',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 40,
    width: 70,
    borderRadius: 5,
    margin: 5,
    position:'absolute'
  },
  startButton: {
    width: 300,
    height: 45,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20
  },
  footer:{
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0
  },
  input: {
     //margin: 5,
     height: 40,
     borderColor: 'green',
     borderWidth: 1
  },

});
