// // src/components/EnergyMarket.js
// import React, { useState, useEffect } from 'react';
// import { SimpleEnergyMarketABI } from '../abi/SimpleEnergyMarket.json';

// const EnergyMarket = ({ web3, account, contract }) => {
//   const [energyBalance, setEnergyBalance] = useState(0);
//   const [amountToSell, setAmountToSell] = useState(0);

//   useEffect(() => {
//     if (contract && account) {
//       // Obtenir le solde d'énergie de l'utilisateur
//       const fetchEnergyBalance = async () => {
//         const balance = await contract.methods.getEnergyBalance(account).call();
//         setEnergyBalance(web3.utils.fromWei(balance, 'ether'));
//       };

//       fetchEnergyBalance();
//     }
//   }, [contract, account, web3]);

//   const buyEnergy = async () => {
//     if (contract && web3) {
//       try {
//         await contract.methods.buyEnergy().send({
//           from: account,
//           value: web3.utils.toWei('0.1', 'ether'), // Montant en ETH pour acheter de l'énergie
//         });
//         alert('Énergie achetée avec succès!');
//         // Mettre à jour le solde après l'achat
//         const newBalance = await contract.methods.getEnergyBalance(account).call();
//         setEnergyBalance(web3.utils.fromWei(newBalance, 'ether'));
//       } catch (error) {
//         console.error('Erreur lors de l\'achat d\'énergie', error);
//       }
//     }
//   };

//   const sellEnergy = async () => {
//     if (contract && web3 && amountToSell > 0) {
//       try {
//         await contract.methods.sellEnergy(web3.utils.toWei(amountToSell.toString(), 'ether')).send({
//           from: account,
//         });
//         alert('Énergie vendue avec succès!');
//         // Mettre à jour le solde après la vente
//         const newBalance = await contract.methods.getEnergyBalance(account).call();
//         setEnergyBalance(web3.utils.fromWei(newBalance, 'ether'));
//       } catch (error) {
//         console.error('Erreur lors de la vente d\'énergie', error);
//       }
//     } else {
//       alert('Veuillez entrer un montant valide pour vendre.');
//     }
//   };

//   return (
//     <div>
//       <h2>Marché de l'énergie</h2>
//       <p>Solde d'énergie: {energyBalance} ETH</p>

//       <button onClick={buyEnergy}>Acheter de l'énergie (0.1 ETH)</button>
      
//       <div>
//         <h3>Vendre de l'énergie</h3>
//         <input
//           type="number"
//           value={amountToSell}
//           onChange={(e) => setAmountToSell(e.target.value)}
//           placeholder="Montant en ETH"
//         />
//         <button onClick={sellEnergy}>Vendre</button>
//       </div>
//     </div>
//   );
// };

// export default EnergyMarket;


import React, { useState, useEffect } from 'react';

const EnergyMarket = ({ web3, account, contract }) => {
  const [energyBalance, setEnergyBalance] = useState(0);
  const [amountToSell, setAmountToSell] = useState(0);

  useEffect(() => {
    const fetchEnergyBalance = async () => {
      const balance = await contract.methods.getEnergyBalance(account).call();
      setEnergyBalance(web3.utils.fromWei(balance, 'ether'));
    };

    if (contract && account) {
      fetchEnergyBalance();
    }
  }, [contract, account, web3]);

  const buyEnergy = async () => {
    if (contract && web3) {
      await contract.methods.buyEnergy().send({
        from: account,
        value: web3.utils.toWei('0.1', 'ether'),
      });
      alert('Énergie achetée avec succès !');
      const newBalance = await contract.methods.getEnergyBalance(account).call();
      setEnergyBalance(web3.utils.fromWei(newBalance, 'ether'));
    }
  };

  const sellEnergy = async () => {
    if (contract && web3 && amountToSell > 0) {
      await contract.methods.sellEnergy(web3.utils.toWei(amountToSell.toString(), 'ether')).send({
        from: account,
      });
      alert('Énergie vendue avec succès !');
      const newBalance = await contract.methods.getEnergyBalance(account).call();
      setEnergyBalance(web3.utils.fromWei(newBalance, 'ether'));
    } else {
      alert('Veuillez entrer un montant valide pour vendre.');
    }
  };

  return (
    <div>
      <h2>Marché de l'énergie</h2>
      <p>Solde d'énergie: {energyBalance} ETH</p>
      <button onClick={buyEnergy}>Acheter de l'énergie (0.1 ETH)</button>
      <div>
        <h3>Vendre de l'énergie</h3>
        <input
          type="number"
          value={amountToSell}
          onChange={(e) => setAmountToSell(e.target.value)}
          placeholder="Montant en ETH"
        />
        <button onClick={sellEnergy}>Vendre</button>
      </div>
    </div>
  );
};

export default EnergyMarket;
