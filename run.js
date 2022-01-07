const main = async () => {

    // Actually comnpiles our the contract and generates files
    const interactionContractFactory = await hre.ethers.getContractFactory('InteractionPortal');
    //Hardhat will create a local Ethereum network for us, but just for this contract. Then, after the script completes it'll destroy that local network. So, every time you run the contract, it'll be a fresh blockchain. 
    const interactionContract = await interactionContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
    });
    //wait until our contract is officially deployed to our local blockchain! Our constructor runs when we actually deploy.
    await interactionContract.deployed();
  
    //so that we can see who deployed the contract and who it is deployed to
    console.log("Contract deployed to:", interactionContract.address);
    //console.log("Contract deployed by:", owner.address);

    /*
   * Get Contract balance
   */
  let contractBalance = await hre.ethers.provider.getBalance(
    interactionContract.address
  );
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

   
  
    //Manually call our functions like in a normal API 
    //grab total num of waves
    let waveCount;
    waveCount = await interactionContract.getTotalWaves();

    let fistbumpCount;
    fistbumpCount = await interactionContract.getTotalFistbumps();

    let poorCount;
    poorCount = await interactionContract.getTotal();

    let highfiveCount;
    highfiveCount = await interactionContract.getTotalHighfives();

    let handshakeCount;
    handshakeCount = await interactionContract.getTotalHandshakes();

    let bowCount;
    bowCount = await interactionContract.getTotalBows();
    
    // do the interaction
    let interactionTxn = await interactionContract.dosomething("Message uno");
    await interactionTxn.wait();

    //simulate other people hitting our functions
    interactionTxn2 = await interactionContract.dosomething("Message dos");
    await interactionTxn2.wait();

    waveCount = await interactionContract.getTotalWaves();
    fistbumpCount = await interactionContract.getTotalFistbumps();
    poorCount = await interactionContract.getTotal();
    highfiveCount = await interactionContract.getTotalHighfives();
    handshakeCount = await interactionContract.getTotalHandshakes();
    bowCount = await interactionContract.getTotalBows();

    /*
   * Get Contract balance to see what happened!
   */
  contractBalance = await hre.ethers.provider.getBalance(interactionContract.address);
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

    let allInteractions = await interactionContract.getAllInteractions();
    console.log(allInteractions);
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();