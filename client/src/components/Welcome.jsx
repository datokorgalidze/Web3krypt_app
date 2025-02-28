// import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContex";
import { Loader } from './';
import { shortenAddress } from "../utils/shortenAddress";

const commonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

// eslint-disable-next-line react/prop-types
const Input = ({placeholder, name, type, value, handleCange}) => (
    <input
      placeholder= {placeholder}
      type= {type}
      value={value}
      onChange={(e) => handleCange(e, name)}
      step= '0.0001'
      className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    />
)

    const Welcome = () => {
      const {connectWallet, currentAccount, handleChange, formData,sendTransaction, loading, disconnectWallet} = useContext(TransactionContext);

     

   

      const handleSubmit = (e) => {
         const {addressTo, amount, keyword, message } = formData;

         e.preventDefault();
         if (!addressTo || !amount || !keyword || !message) return;
         sendTransaction();
      }

        return (
           <div className="flex w-full justify-center items-center">
              <div className="flex md:flex-row flex-col items-start justify-between mf:p-20 py-12 px-4">
                 <div className="flex flex-1 items-start justify-start flex-col mf:mr-10">
                    <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
                       Send Crypto <br/> across the world
                    </h1>
                    <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
                        Explore the crypto world. Buy and sell cryptocurrencies easily on Krypto. 
                    </p>
                      {!currentAccount ? (
                        <button
                           type="button"
                           onClick={connectWallet}
                           className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
                        >
                           <p className="text-white font-semibold text-base">Connect Wallet</p> 
                        </button>):(
                           <button
                           type="button"
                           onClick={disconnectWallet}
                           className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
                        >
                           <p className="text-white font-semibold text-base">Disonnect Wallet</p> 
                        </button>
                        )}
                    <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
                       <div className= {`rounded-tl-2xl ${commonStyles}`}>
                          Reliability 
                       </div>
                        <div className={commonStyles}>Security</div>
                        <div className={`sm:rounded-tr-2xl ${commonStyles}`}>
                           Ethereum
                        </div>
                        <div className={`sm:rounded-bl-2xl ${commonStyles}`}>
                           Web 3.0
                        </div>
                        <div className={commonStyles}>Low Fees</div>
                        <div className={`rounded-br-2xl ${commonStyles}`}>
                           Blockchain
                        </div>
                    </div>
                 </div>

                 <div className="flex flex-1 flex-col justify-start items-center w-full mf:mt-0 mt-10">
                    <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism ">
                       <div className="flex flex-col justify-between w-full h-full">
                          <div className="flex justify-between items-start">
                             <div className="flex justify-center items-center rounded-full w-10 h-10 border-white border-2">
                               <SiEthereum fontSize = {23} color="#fff"/>
                             </div>
                               <BsInfoCircle fontSize={20} color="#9dd9f3"/>  
                          </div>
                          <div>
                            <p className="text-white font-light text-sm">
                              {currentAccount && shortenAddress(currentAccount)}
                            </p>
                            <p className="text-white font-semibold text-lg">
                              Ethereum
                            </p>
                          </div>
                       </div>
                    </div>

                    <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                        <Input placeholder= 'Address To' name = 'addressTo' type='text' handleCange={handleChange}/>
                        <Input placeholder= 'Amount (ETH)' name = 'amount' type='number' handleCange={handleChange}/>
                        <Input placeholder= 'Keyword (Gif)' name = 'keyword' type='text' handleCange={handleChange}/>
                        <Input placeholder= 'Enter message' name = 'message' type='text' handleCange={handleChange}/>
                        <div className="h-[1px] w-full my-2 bg-gray-400"/>
                        {loading 
                        ? (
                           <Loader/>
                        ):(
                          <button
                            type="submit"
                            onClick={handleSubmit}
                            className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                          >
                            Send Now
                          </button>
                        )}
                    </div> 
                 </div>
              </div>
           </div>
        );
     }
   
     export default Welcome;