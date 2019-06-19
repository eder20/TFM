pragma solidity ^0.5.0;
import "./Contador.sol";
import "./Invitacion.sol";
import "./Propietario.sol";
import "./Cliente.sol";
contract Factoria {
    address public addr;
    uint8 public nContratos = 0;
    uint8 public nPropietarios = 0;
    uint8 public nClientes = 0;
    event Tic(string msg, uint8 out);
    address[] public contratos;
    address[] public invitaciones;
    address[] public clientes;
    mapping(uint => address) public invi;
    address[] public propietarios;
    address newContract;


    constructor () public{
       addr = msg.sender;
    }

    function crearC() public {
        newContract= address(new Contador());
        contratos.push(newContract);
        nContratos++;
        emit Tic("Actualizado", nContratos);
    }

    function crearInvitacion(uint8 _dia, uint8 _puntero, uint8 _punteroIni) public {
        Invitacion newContract1= new Invitacion();
        newContract1.set(_dia);
        newContract1.anadirPuntero(_puntero,_punteroIni);
        invitaciones.push(address(newContract1));
        invi[_dia]=address(newContract1);
        nContratos++;
        emit Tic("Actualizado", nContratos);
    }

    function crearCliente(string memory _matricula) public {
        Cliente newContract1= new Cliente();
        newContract1.set(_matricula,msg.sender);
        clientes.push(address(newContract1));

        nClientes++;
        emit Tic("Actualizado", nContratos);
    }

    function crearPropietario(string memory _nombre, uint8  _codigo , uint8  _ninivitaciones, uint8  _precio) public {
        Propietario newContract1= new Propietario();
        newContract1.set(_nombre, _codigo, _ninivitaciones, _precio);
        propietarios.push(address(newContract1));
        nPropietarios++;
        emit Tic("Actualizado", nPropietarios);
    }

    function getInvitacion(uint _dia) public returns (address addr){
        return invi[_dia];
    }

    function() external {
        revert();
} }
