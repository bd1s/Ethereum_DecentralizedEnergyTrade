// src/contracts/SimpleEnergyMarket.sol
// pragma solidity ^0.8.0;

// contract SimpleEnergyMarket {
//     address public owner;
//     mapping(address => uint256) public energyBalance;

//     constructor() {
//         owner = msg.sender;
//     }

//     function buyEnergy() public payable {
//         require(msg.value > 0, "Envoyer de l'ETH pour acheter de l'energie");
//         energyBalance[msg.sender] += msg.value;
//     }

//     function sellEnergy(uint256 amount) public {
//         require(energyBalance[msg.sender] >= amount, "Solde insuffisant");
//         payable(msg.sender).transfer(amount);
//         energyBalance[msg.sender] -= amount;
//     }

//     function getEnergyBalance(address account) public view returns (uint256) {
//         return energyBalance[account];
//     }
// }
pragma solidity ^0.8.0;

contract SimpleEnergyMarket {
    address public owner;
    mapping(address => uint256) public energyBalance;
    mapping(address => string) public roles; // Associe des rôles aux adresses

    // Constantes pour les rôles
    string constant BUYER = "Acheteur";
    string constant SELLER = "Vendeur";

    constructor() {
        owner = msg.sender;
    }

    // Fonction pour définir le rôle de l'utilisateur
    function setRole(string memory role) public {
        require(
            keccak256(abi.encodePacked(role)) == keccak256(abi.encodePacked(BUYER)) ||
            keccak256(abi.encodePacked(role)) == keccak256(abi.encodePacked(SELLER)),
            "Role invalide"
        );
        roles[msg.sender] = role;
    }

    // Fonction pour récupérer le rôle d'un utilisateur
    function getRole(address account) public view returns (string memory) {
        return roles[account];
    }

    // Fonction pour acheter de l'énergie (uniquement pour les acheteurs)
    function buyEnergy() public payable {
        require(
            keccak256(abi.encodePacked(roles[msg.sender])) == keccak256(abi.encodePacked(BUYER)),
            "Vous devez etre un Acheteur pour acheter de ldnergie"
        );
        require(msg.value > 0, "Envoyez de l'ETH pour acheter de lenergie");
        energyBalance[msg.sender] += msg.value;
    }

    // Fonction pour vendre de l'énergie (uniquement pour les vendeurs)
    function sellEnergy(uint256 amount) public {
        require(
            keccak256(abi.encodePacked(roles[msg.sender])) == keccak256(abi.encodePacked(SELLER)),
            "Vous devez etre un Vendeur pour vendre de lenergie"
        );
        require(energyBalance[msg.sender] >= amount, "Solde insuffisant");
        payable(msg.sender).transfer(amount);
        energyBalance[msg.sender] -= amount;
    }

    // Fonction pour récupérer le solde d'énergie d'un utilisateur
    function getEnergyBalance(address account) public view returns (uint256) {
        return energyBalance[account];
    }
}
