var Invitacion = artifacts.require("Invitacion");
module.exports = function(deployer) {
  // Use deployer to state migration tasks.
  deployer.deploy(Invitacion);
};
