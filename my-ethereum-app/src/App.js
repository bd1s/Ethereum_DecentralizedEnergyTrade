
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import SimpleEnergyMarket from './abi/SimpleEnergyMarket.json';
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

        const contractAddress = '0xfded03f2c0EF66e89aB50108301059Be0fD767E3';
        const contractInstance = new web3Instance.eth.Contract(
          SimpleEnergyMarket.abi,
          contractAddress
        );
        console.log("Contract methods: ", contractInstance.methods); // Vérifiez que getRole et setRole sont là


        console.log("Contract ABI: ", SimpleEnergyMarket.abi);  // Vérifiez que l'ABI est correcte
        console.log("Contract Address: ", contractAddress);  // Vérifiez l'adresse du contrat
        console.log("Contract methods: ", contractInstance.methods);

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



// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import ProducerDashboard from './components/ProducerDashboard';
// import ConsumerDashboard from './components/ConsumerDashboard';

// const App = ({ web3, contract, account }) => {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/producer" element={<ProducerDashboard contract={contract} account={account} web3={web3} />} />
//         <Route path="/consumer" element={<ConsumerDashboard contract={contract} account={account} web3={web3} />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
