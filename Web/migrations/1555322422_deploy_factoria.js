var Factoria = artifacts.require("Factoria");
module.exports = function(deployer) {
  // Use deployer to state migration tasks.
  deployer.deploy(Factoria);
};
