import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";


export const TransactionContext = React.createContext();



const { ethereum } = window;




const getEthereumContract = () => {
    

    if (!ethereum) {
        throw new Error("No ethereum object found");
    }

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);


  

    return transactionsContract;
};


// eslint-disable-next-line react/prop-types
export const TransactionProvider = ({children}) => {

    const [currentAccount, setCurrentAccount] = useState(null);
    const [formData, setformData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
    const [loading, setLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
    const [ transactions, setTransactions] = useState([]);

    const handleChange = (e, name) => {
       setformData((prevState) => ({...prevState,[name]:e.target.value })); 
    }


    const getallTransactions = async () => {
        try {
            if(!ethereum) return alert('Please install Metamasck');
            const transactionContract = getEthereumContract();
            const availableTransactions = await transactionContract.getAllTransactions();
            const structuredTransactions = availableTransactions.map((transaction) => ({
                addressTo: transaction.receiver,
                addressFrom: transaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                message: transaction.message,
                keyword: transaction.keyword,
                amount: parseInt(transaction.amount._hex) / (10 ** 18)
              }));
      
             
              console.log(structuredTransactions)
              setTransactions(structuredTransactions);
            
              



        } catch (error) {
            console.log("Error fetching transactions:", error);
        }
    };



    const checkWalletIsConnected = async() => {
        try{
           
         if(!ethereum) return alert('Please install Metamasck');

         const accounts = await ethereum.request({method: 'eth_accounts'});
         if(accounts.length){
            setCurrentAccount(accounts[0]);
            getallTransactions();
         }else{
            console.log("No accounts found");
         }  

         
        }catch(error){
            console.log(error);
        }

    };


    const checkIfTransactionsExists = async () => {
        try {
            const transactionContract = getEthereumContract();
            const transactionCount = await transactionContract.getTransactionCount();
            window.localStorage.setItem('transactionCount', transactionCount.toString());
            
        } catch (error) {
            console.log(error)
        }
    }


    const connectWallet = async () => {
        try {
            if(!ethereum) return alert('Please install Metamasck');
            const accounts = await ethereum.request({method: 'eth_requestAccounts'});
            setCurrentAccount(accounts[0]);
            getallTransactions();
        } catch (error) {
            console.log(error);
            throw new Error('No ethereum object');
        }
    }


    const disconnectWallet = async () => {
        try {
            setCurrentAccount(null);
            setTransactions([]);
            setTransactionCount(null);
            console.log('Wallet is disconnected');
            // At this point, currentAccount should be null
        } catch (error) {
            console.log(error);
            throw new Error('Failed to disconnect wallet');
        }
    };
    

    useEffect(() => {
       checkWalletIsConnected();
       checkIfTransactionsExists();   
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);


    const sendTransaction = async () => {
        try {
            if(!ethereum) return alert('Please install Metamasck');
            const {addressTo, amount, keyword, message } = formData;
            const transactionContract = getEthereumContract();
            const parseAmount = ethers.utils.parseEther(amount);

           await ethereum.request({
                method: 'eth_sendTransaction',
                params:[{
                    from:currentAccount,
                    to:addressTo,
                    gas:'0x5208',
                    value:parseAmount._hex,
                }]
            });

            const transactionHash = await transactionContract.addToBlockchain(addressTo, parseAmount, message, keyword);
            setLoading(true);
            console.log(`loading - ${transactionHash.hash}`);
            
            await transactionHash.wait();

          
            console.log(`sucsses - ${transactionHash.hash}`);
            setLoading(false);
            const transactionCount = await transactionContract.getTransactionCount();
            setTransactionCount(transactionCount.toNumber());
            window.location.reload();

        } catch (error) {
            console.log(error)
        }
    }

     return (
        <TransactionContext.Provider value = {{
        connectWallet,
        disconnectWallet, 
        currentAccount,
        setformData,
         formData, 
         handleChange,
         sendTransaction,
         loading,
         transactions,
         transactionCount  
         }}>
          {children}
       </TransactionContext.Provider>
     ) 
};








//chatGPT



// import React, { useEffect, useState } from "react";
// import { ethers } from "ethers";
// import { contractABI, contractAddress } from "../utils/constants";

// export const TransactionContext = React.createContext();

// const { ethereum } = window;

// const getEthereumContract = () => {
//     if (!ethereum) {
//         throw new Error("No ethereum object found");
//     }

//     const provider = new ethers.providers.Web3Provider(ethereum);
//     const signer = provider.getSigner();
//     const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

//     return transactionsContract;
// };

// // eslint-disable-next-line react/prop-types
// export const TransactionProvider = ({ children }) => {
//     const [currentAccount, setCurrentAccount] = useState(null);
//     const [formData, setformData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
//     const [loading, setLoading] = useState(false);
//     const [transactionCount, setTransactionCount] = useState(0);
//     const [transactions, setTransactions] = useState([]);

//     const handleChange = (e, name) => {
//         setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
//     };

//     const fetchTransactions = async () => {
//         try {
//             if (!ethereum) return alert("Please install MetaMask");
//             const transactionContract = getEthereumContract();
//             const availableTransactions = await transactionContract.getAllTransactions();
//             const structuredTransactions = availableTransactions.map((transaction) => ({
//                 addressTo: transaction.receiver,
//                 addressFrom: transaction.sender,
//                 timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
//                 message: transaction.message,
//                 keyword: transaction.keyword,
//                 amount: parseInt(transaction.amount._hex) / 10 ** 18,
//             }));

//             console.log(structuredTransactions);
//             setTransactions(structuredTransactions);

//             const transactionCount = await transactionContract.getTransactionCount();
//             setTransactionCount(transactionCount.toNumber());
//         } catch (error) {
//             console.log("Error fetching transactions:", error);
//         }
//     };

//     const checkWalletIsConnected = async () => {
//         try {
//             if (!ethereum) return alert("Please install MetaMask");

//             const accounts = await ethereum.request({ method: "eth_accounts" });
//             if (accounts.length) {
//                 setCurrentAccount(accounts[0]);
//                 await fetchTransactions();
//             } else {
//                 console.log("No accounts found");
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const connectWallet = async () => {
//         try {
//             if (!ethereum) return alert("Please install MetaMask");
//             const accounts = await ethereum.request({ method: "eth_requestAccounts" });
//             setCurrentAccount(accounts[0]);

//             // Fetch transactions after connecting
//             await fetchTransactions();
//         } catch (error) {
//             console.log(error);
//             throw new Error("No ethereum object");
//         }
//     };

//     const disconnectWallet = async () => {
//         try {
//             // Update the state to reflect the disconnected status
//             setCurrentAccount(null);
//             setTransactionCount(0);
//             setTransactions([]);
//             console.log('Wallet is disconnected');
//         } catch (error) {
//             console.log(error);
//             throw new Error("Failed to disconnect wallet");
//         }
//     };

//     useEffect(() => {
//         checkWalletIsConnected();
//         checkIfTransactionsExists();
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []);

//     const sendTransaction = async () => {
//         try {
//             if (!ethereum) return alert("Please install MetaMask");
//             const { addressTo, amount, keyword, message } = formData;
//             const transactionContract = getEthereumContract();
//             const parseAmount = ethers.utils.parseEther(amount);

//             await ethereum.request({
//                 method: "eth_sendTransaction",
//                 params: [
//                     {
//                         from: currentAccount,
//                         to: addressTo,
//                         gas: "0x5208",
//                         value: parseAmount._hex,
//                     },
//                 ],
//             });

//             const transactionHash = await transactionContract.addToBlockchain(addressTo, parseAmount, message, keyword);
//             setLoading(true);
//             console.log(`loading - ${transactionHash.hash}`);

//             await transactionHash.wait();

//             console.log(`success - ${transactionHash.hash}`);
//             setLoading(false);
//             const transactionCount = await transactionContract.getTransactionCount();
//             setTransactionCount(transactionCount.toNumber());
//             window.location.reload();
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     return (
//         <TransactionContext.Provider
//             value={{
//                 connectWallet,
//                 disconnectWallet,
//                 currentAccount,
//                 setformData,
//                 formData,
//                 handleChange,
//                 sendTransaction,
//                 loading,
//                 transactions,
//                 transactionCount,
//             }}
//         >
//             {children}
//         </TransactionContext.Provider>
//     );
// };

