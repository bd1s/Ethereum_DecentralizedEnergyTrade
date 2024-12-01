// // // src/components/EnergyMarket.js
// import React, { useState, useEffect } from 'react';

// const EnergyMarket = ({ web3, account, contract }) => {
//   const [energyBalance, setEnergyBalance] = useState(0);
//   const [amountToSell, setAmountToSell] = useState(0);
  
//   // Fonction pour récupérer le solde d'énergie de l'utilisateur
//   const fetchEnergyBalance = async () => {
//     try {
//       const balance = await contract.methods.getEnergyBalance(account).call();
//       console.log("Balance récupérée: ", balance); // Log pour vérifier
//       setEnergyBalance(web3.utils.fromWei(balance, 'ether')); // Convertir en ETH
//     } catch (error) {
//       console.error('Erreur lors de la récupération du solde d\'énergie', error);
//     }
//   };

//   // Appeler fetchEnergyBalance chaque fois que le contrat ou le compte change
//   useEffect(() => {
//     if (contract && account) {
//       fetchEnergyBalance();
//     }
//   }, [contract, account, web3]);

//   // Fonction pour acheter de l'énergie
//   const buyEnergy = async () => {
//     try {
//       await contract.methods.buyEnergy().send({
//         from: account,
//         value: web3.utils.toWei('0.1', 'ether'), // Montant en ETH
//       });
//       alert('Énergie achetée avec succès!');
//       fetchEnergyBalance(); // Mettre à jour le solde après l'achat
//     } catch (error) {
//       console.error('Erreur lors de l\'achat d\'énergie', error);
//     }
//   };

//   // Fonction pour vendre de l'énergie
//   const sellEnergy = async () => {
//     if (amountToSell > 0 && amountToSell <= energyBalance) {
//       try {
//         await contract.methods.sellEnergy(web3.utils.toWei(amountToSell.toString(), 'ether')).send({
//           from: account,
//         });
//         alert('Énergie vendue avec succès!');
//         fetchEnergyBalance(); // Mettre à jour le solde après la vente
//       } catch (error) {
//         console.error('Erreur lors de la vente d\'énergie', error);
//         alert('Erreur lors de la vente d\'énergie. Vérifiez la console pour plus de détails.');
//       }
//     } else {
//       alert('Veuillez entrer un montant valide pour vendre (moins que votre solde d\'énergie).');
//     }
//   };
  

//   return (
//     <div>
//       <h3>Marché de l'énergie</h3>
//       <p>Solde d'énergie: {energyBalance} ETH</p>
//       <button onClick={buyEnergy}>Acheter de l'énergie (0.1 ETH)</button>
//       <div>
//         <input
//           type="number"
//           value={amountToSell}
//           onChange={(e) => setAmountToSell(e.target.value)}
//           placeholder="Montant à vendre"
//         />
//         <button onClick={sellEnergy}>Vendre de l'énergie</button>
//       </div>
//     </div>
//   );
// };

// export default EnergyMarket;


import React, { useState, useEffect } from 'react';

const EnergyMarket = ({ web3, account, contract }) => {
  const [energyBalance, setEnergyBalance] = useState(0);
  const [amountToSell, setAmountToSell] = useState(0);
  const [role, setRole] = useState('');

  // Fonction pour récupérer le solde d'énergie de l'utilisateur
  const fetchEnergyBalance = async () => {
    try {
      const balance = await contract.methods.getEnergyBalance(account).call();
      setEnergyBalance(web3.utils.fromWei(balance, 'ether')); // Convertir en ETH
    } catch (error) {
      console.error('Erreur lors de la récupération du solde d\'énergie', error);
    }
  };

  const fetchRole = async () => {
    try {
      const userRole = await contract.methods.getRole(account).call();
      setRole(userRole);
    } catch (error) {
      console.error('Erreur lors de la récupération du rôle', error);
    }
  };
  
  const setUserRole = async (role) => {
    try {
      await contract.methods.setRole(role).send({ from: account });
      alert(`Rôle défini avec succès: ${role}`);
      fetchRole(); // Rafraîchir le rôle après la mise à jour
    } catch (error) {
      console.error('Erreur lors de la définition du rôle', error);
    }
  };
  

  useEffect(() => {
    if (contract && account) {
      fetchEnergyBalance();
      fetchRole();  // Récupérer le rôle de l'utilisateur
    }
  }, [contract, account, web3]);

  // Fonction pour acheter de l'énergie
  const buyEnergy = async () => {
    try {
      await contract.methods.buyEnergy().send({
        from: account,
        value: web3.utils.toWei('0.1', 'ether'), // Montant en ETH
      });
      alert('Énergie achetée avec succès!');
      fetchEnergyBalance(); // Mettre à jour le solde après l'achat
    } catch (error) {
      console.error('Erreur lors de l\'achat d\'énergie', error);
    }
  };

  // Fonction pour vendre de l'énergie
  const sellEnergy = async () => {
    if (amountToSell > 0 && amountToSell <= energyBalance) {
      try {
        await contract.methods.sellEnergy(web3.utils.toWei(amountToSell.toString(), 'ether')).send({
          from: account,
        });
        alert('Énergie vendue avec succès!');
        fetchEnergyBalance(); // Mettre à jour le solde après la vente
      } catch (error) {
        console.error('Erreur lors de la vente d\'énergie', error);
      }
    } else {
      alert('Veuillez entrer un montant valide pour vendre.');
    }
  };

 

  return (
    <div>
      <h3>Marché de l'énergie</h3>
      <p>Solde d'énergie: {energyBalance} ETH</p>

      {/* Choisir le rôle */}
      <div>
        <h4>Choisir votre rôle :</h4>
        <button onClick={() => setUserRole('Acheteur')}>Acheteur</button>
        <button onClick={() => setUserRole('Vendeur')}>Vendeur</button>
      </div>

      {/* Afficher l'action disponible en fonction du rôle */}
      {role === 'Acheteur' && (
        <div>
          <button onClick={buyEnergy}>Acheter de l'énergie (0.1 ETH)</button>
        </div>
      )}
      {role === 'Vendeur' && (
        <div>
          <input
            type="number"
            value={amountToSell}
            onChange={(e) => setAmountToSell(e.target.value)}
            placeholder="Montant à vendre"
          />
          <button onClick={sellEnergy}>Vendre de l'énergie</button>
        </div>
      )}
    </div>
  );
};

export default EnergyMarket;
