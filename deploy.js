const main = async () => {
  const interactionContractFactory = await hre.ethers.getContractFactory("InteractionPortal");
  const interactionContract = await interactionContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.01"),
  });

  await interactionContract.deployed();

  console.log("InteractionPortal address: ", interactionContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();


