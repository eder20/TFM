pragma solidity ^0.5.0;
contract Propietario {
    string public nombre;
    uint8 public codigo;
    uint8 public ninvitaciones;
    uint8 public precio;

   function set(string memory _nombre, uint8  _codigo , uint8  _ninvitaciones, uint8  _precio ) public{
      nombre=_nombre;
      codigo=_codigo;
      ninvitaciones=_ninvitaciones;
      precio=_precio;
   }

    function() external {
        revert();
} }
