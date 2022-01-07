import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import "./App.css";
import abi from "./utils/InteractionPortal.json"



const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [isMining, setIsMining] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  //State variable tracking user message
  const [messageValue, setmessageValue] = useState("");
  const [responseValue, setresponseValue] = useState("");





  /**
   * Create a variable here that holds the contract address after you deploy!
   */
  const contractAddress = "0xc39C16b1A00A5dAFE48591A9CFc16416b2dEcd26";

  const [allInteractions, setAllInteractions] = useState([]);

  const contractABI = abi.abi;


  /*
   * Create a method that gets all interactions from your contract
   */
  const getAllInteractions = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const InteractionPortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        /*
         * Call the getAllInteractions method from your Smart Contract
         */
        const interactions = await InteractionPortalContract.getAllInteractions();

        /*
         * We only need address, timestamp, message, and type of interaction in our UI so let's
         * pick those out
         */
        let interactionsCleaned = [];
       
        interactions.forEach(interaction => {
          

          interactionsCleaned.push({
            address: interaction.interacter,
            timestamp: new Date(interaction.timestamp * 1000),
            message: interaction.message,
            typeofinteraction: interaction.typeofinteraction
          });
        });
        /*
         * Store our data in React State
         */
        setAllInteractions(interactionsCleaned);
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error);
    }
  }
  /**
 * Listen in for emitter events!
 */
useEffect(() => {
  let interactionPortalContract;

  const onNewInteraction = (from, timestamp, message, typeofinteraction) => {
    console.log("NewInteraction", from, timestamp, message, typeofinteraction);
    setresponseValue(typeofinteraction);
    
    setAllInteractions(prevState => [
      ...prevState,
      {
        address: from,
        timestamp: new Date(timestamp * 1000),
        message: message,
        typeofinteraction: typeofinteraction,
      },
    ]);
  };

  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    interactionPortalContract = new ethers.Contract(contractAddress, contractABI, signer);
    interactionPortalContract.on("NewInteraction", onNewInteraction);
  }

  return () => {
    if (interactionPortalContract) {
      interactionPortalContract.off("NewInteraction", onNewInteraction);
    }
  };
}, []);

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);

      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account)
        getAllInteractions()
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
  * Implement your connectWallet method here
  */
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }
  const Spinning = async () => {
    setIsMining(currentisMining => !currentisMining)
  }


  const interact = async () => {

    try {
      const { ethereum } = window;

      console.log(messageValue)

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const InteractionPortalContract = new ethers.Contract(contractAddress, contractABI, signer);


        let count = await
          InteractionPortalContract.getTotal();
        console.log("Retrieved total small eth count...", count.toNumber());
        let countWaves = await
          InteractionPortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", countWaves.toNumber());
        let countFistbumps = await
          InteractionPortalContract.getTotalFistbumps();
        console.log("Retrieved total fist bump count...", countFistbumps.toNumber());
        let countHighfives = await
          InteractionPortalContract.getTotalHighfives();
        console.log("Retrieved total high five count...", countHighfives.toNumber());
        let countHandshakes = await
          InteractionPortalContract.getTotalHandshakes();
        console.log("Retrieved total hand shake count...", countHandshakes.toNumber());
        let countBows = await
          InteractionPortalContract.getTotalBows();
        console.log("Retrieved total bow count...", countBows.toNumber());

       



        /*
        * Execute the actual interaction from your smart contract
        */

        const interactionTxn = await InteractionPortalContract.dosomething(messageValue, { gasLimit: 300000 });

        const interactions = await InteractionPortalContract.getAllInteractions();
        interactions.forEach(interaction => {
          
          setresponseValue(interaction.typeofinteraction);

        });

        Spinning();
        console.log("Mining...", interactionTxn.hash);

        let seed = await InteractionPortalContract.getSeed();
        console.log("Seed = ", seed.toNumber());


        if (seed.toNumber() <= 25){
          setIsWinner(currentisWinner => !currentisWinner)
        }


        await interactionTxn.wait();

        
        setIsClicked(currentisClicked => !currentisClicked);
        console.log("Mined -- ", interactionTxn.hash);
        Spinning();


        count = await
          InteractionPortalContract.getTotal();
        console.log("Retrieved total small eth count...", count.toNumber());
        countWaves = await
          InteractionPortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", countWaves.toNumber());
        countFistbumps = await
          InteractionPortalContract.getTotalFistbumps();
        console.log("Retrieved total fist bump count...", countFistbumps.toNumber());
        countHighfives = await
          InteractionPortalContract.getTotalHighfives();
        console.log("Retrieved total high five count...", countHighfives.toNumber());
        countHandshakes = await
          InteractionPortalContract.getTotalHandshakes();
        console.log("Retrieved total hand shake count...", countHandshakes.toNumber());
        countBows = await
          InteractionPortalContract.getTotalBows();
        console.log("Retrieved total bow count...", countBows.toNumber());

        



      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }




  useEffect(() => {
    checkIfWalletIsConnected();
    
  }, [])

  return (
    

    <div className="mainContainer">
      <div className="dataContainer">
        
        <div className="header">
          Welcome to my site!
        </div>

        <div className="bio">
          My name is Dean and I am a junior in college and a computer science major! I also am working on my very own NFT collection right now.
        </div>

          
        <br/>

        {/*
        * If there is no currentAccount render this button
        */}
        {!currentAccount && (
          <button className="interactButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}

        

        { 
          currentAccount ? ( 
          <textarea name="messageArea"
            placeholder="Write me a message! (Wait at least 20 minutes between submissions)"
            type="text"
            id="messageSent"
            value={messageValue}
            onChange={w => setmessageValue(w.target.value)} ></textarea> ) : null
        }

        <button className="interactButton" onClick={interact}>
          Click me to send your message and recieve an interaction... with a 25% chance of winning .0001 ethereum :)
        </button>

       

        <div className="interactionTotals">
          Your eth = your interaction: <br></br>
          0 > 0.5 eth = None 😔 <br></br>
          0.5 > 1 eth = Wave 👋 <br></br>
          1 > 2 eth = Fist Bump 👊 <br></br>
          2 > 5 eth = High Five 🙌 <br></br>
          5 > 10 eth = Handshake 🤝<br></br>
          > 10 eth = Bow 🙇<br></br>

        </div>

        


        {isMining && (<div className="spin"></div>)}
        {isMining && (<div className="mining">
          Mining your interaction...
        </div>)}

        {(responseValue === "None") && isClicked && (<div className="Poor">
          😔
        </div>)}
        {(responseValue === "Wave") && isClicked && (<div className="Wave">
          👋
        </div>)}
        {(responseValue === "Fist Bump") && isClicked && (<div className="Fistbump">
          👊
        </div>)}
        {(responseValue === "High Five") && isClicked && (<div className="Highfive">
          🙌
        </div>)}
        {(responseValue === "Handshake") && isClicked && (<div className="Handshake">
          🤝
        </div>)}
        {(responseValue === "Bow") && isClicked && (<div className="Bow">
          🙇
        </div>)}
        {isWinner && isClicked && (<div className="Winner">
          You got lucky! You just won 0.0001 ethereum!
        </div>)}

        {allInteractions.map((interaction, index) => {
          return (
            <div key={index} style={{ backgroundColor: "OldLace", marginTop: "16px", padding: "8px" }}>
              <div>Address: {interaction.address}</div>
              <div>Time: {interaction.timestamp.toString()}</div>
              <div>Message: {interaction.message}</div>
              <div>Type of Interaction: {interaction.typeofinteraction}</div>
            </div>)
        })}


      </div>
    </div>
  );
}

export default App
