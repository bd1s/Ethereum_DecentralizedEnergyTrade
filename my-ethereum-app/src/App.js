
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import SimpleEnergyMarket from './abi/SimpleEnergyMarket.json'; // L'ABI générée après compilation
import EnergyMarket from './components/EnergyMarket';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const initializeWeb3 = async () => {
      try {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);

        const networkId = await web3Instance.eth.net.getId();
        console.log("Network ID: ", Number(networkId)); // Assurez-vous que l'ID est un nombre entier

        const contractAddress = '0xADC180c909a16F68289a9aF2544bd2d327C0eBa1';
        const contractInstance = new web3Instance.eth.Contract(
          SimpleEnergyMarket.abi,
          contractAddress
        );

        console.log("Contract ABI: ", SimpleEnergyMarket.abi);  // Vérifiez que l'ABI est correcte
        console.log("Contract Address: ", contractAddress);  // Vérifiez l'adresse du contrat

        setContract(contractInstance);
      } catch (error) {
        console.error("Erreur d'initialisation de Web3 ou de contrat: ", error);
      }
    };

    initializeWeb3();
  }, []);

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title text-center">Marché d'énergie décentralisé</h1>
          <p className="card-text text-center">Compte connecté : {account}</p>
          {contract && web3 && account ? (
            <div>
              <p className="text-success text-center">Le contrat est déployé et prêt à interagir.</p>
              {/* Intégration du composant EnergyMarket */}
              <EnergyMarket web3={web3} account={account} contract={contract} />
            </div>
          ) : (
            <p className="text-warning text-center">Chargement...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

// import React, { useState, useEffect } from 'react';
// import Web3 from 'web3';
// import SimpleEnergyMarket from './abi/SimpleEnergyMarket.json';
// import EnergyMarket from './components/EnergyMarket';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const App = () => {
//   const [web3, setWeb3] = useState(null);
//   const [account, setAccount] = useState('');
//   const [contract, setContract] = useState(null);
//   const [networkError, setNetworkError] = useState('');

//   useEffect(() => {
//     const initializeWeb3 = async () => {
//       try {
//         const web3Instance = new Web3(window.ethereum);
//         setWeb3(web3Instance);

//         const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//         setAccount(accounts[0]);

//         const networkId = await web3Instance.eth.net.getId();
//         console.log("Network ID: ", Number(networkId)); 

//         const expectedNetworkId = 1337; // ID pour Ganache (modifiez-le selon votre réseau)
//         if (networkId !== expectedNetworkId) {
//           setNetworkError(`Réseau incorrect. Attendu: ${expectedNetworkId}, Obtenu: ${networkId}`);
//           return; // Arrêtez ici si le réseau est incorrect
//         }

//         const contractAddress = '0x9f3621B9FbC228EC7e56cE1922B4ebA9EC63836e'; // Adresse sur Ganache
//         const contractInstance = new web3Instance.eth.Contract(SimpleEnergyMarket.abi, contractAddress);
//         setContract(contractInstance);
//       } catch (error) {
//         console.error("Erreur d'initialisation de Web3 ou de contrat: ", error);
//       }
//     };

//     initializeWeb3();
//   }, []);

//   return (
//     <div className="container mt-5">
//       <div className="card">
//         <div className="card-body">
//           <h1 className="card-title text-center">Marché d'énergie décentralisé</h1>
//           <p className="card-text text-center">Compte connecté : {account}</p>
//           {networkError ? (
//             <p className="text-danger text-center">{networkError}. Veuillez changer de réseau dans MetaMask.</p>
//           ) : (
//             contract && web3 && account ? (
//               <div>
//                 <p className="text-success text-center">Le contrat est déployé et prêt à interagir.</p>
//                 <EnergyMarket web3={web3} account={account} contract={contract} />
//               </div>
//             ) : (
//               <p className="text-warning text-center">Chargement...</p>
//             )
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;
