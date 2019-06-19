pragma solidity ^0.5.0;
contract Invitacion {
    uint8 public dia = 0;
    uint8 public puntero;
    uint8 public punteroIni;
    uint8 public contador = 1;
    string[] public matriculas;
    uint8[] public propietarios;
    uint8 public nmatriculas = 0;


   function set(uint8 _dia) public{
      dia=_dia;
   }

   function anadirMatricula(string memory matricula ) public{
      matriculas.push(matricula);
   }

   function anadirPuntero(uint8 _puntero, uint8 _punteroIni ) public{
      puntero=_puntero;
      punteroIni=_punteroIni;
   }

   function anadirContador(uint8 _contador ) public{
      contador=_contador;
   }

   function anadirCodigo(uint8 codigo ) public{
      propietarios.push(codigo);
   }

   function anadirTodo(string memory matricula,uint8 _puntero, uint8 _contador) public{
      matriculas.push(matricula);
      puntero=_puntero;
      contador=_contador;
      nmatriculas++;
   }


    function() external {
        revert();
} }
