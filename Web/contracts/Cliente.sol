pragma solidity ^0.5.0;
contract Cliente {
    address public addr;
    string public matricula;


   function set(string memory _matricula, address _addr) public{
      matricula=_matricula;
      addr=_addr;
   }

    function() external {
        revert();
}
}
