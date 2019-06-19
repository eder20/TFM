var Propietario = artifacts.require("Propietario");
module.exports = function(deployer) {
  // Use deployer to state migration tasks.
  deployer.deploy(Propietario);
};
