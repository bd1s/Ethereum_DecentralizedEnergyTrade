// src/contracts/SimpleEnergyMarket.sol
pragma solidity ^0.8.0;

contract SimpleEnergyMarket {
    address public owner;
    mapping(address => uint256) public energyBalance;

    constructor() {
        owner = msg.sender;
    }

    function buyEnergy() public payable {
        require(msg.value > 0, "Envoyer de l'ETH pour acheter de l'energie");
        energyBalance[msg.sender] += msg.value;
    }

    function sellEnergy(uint256 amount) public {
        require(energyBalance[msg.sender] >= amount, "Solde insuffisant");
        payable(msg.sender).transfer(amount);
        energyBalance[msg.sender] -= amount;
    }

    function getEnergyBalance(address account) public view returns (uint256) {
        return energyBalance[account];
    }
}
