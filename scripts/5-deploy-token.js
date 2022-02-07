import sdk from "./1-initialize-sdk.js";


// In order to deploy the new contract we need our old friend the app module again.
const app = sdk.getAppModule("0xfd6EE97C297FA4457ABAE1e6b129804Cd1ac0cd6");

(async () => {
  try {
    // Deploy a standard ERC-20 contract.
    const tokenModule = await app.deployTokenModule({
      // What's your token's name? Ex. "Ethereum"
      name: "AlgoDAO Governance Token",
      // What's your token's symbol? Ex. "ETH"
      symbol: "ADO",
    });
    console.log(
      "✅ Successfully deployed token module, address:",
      tokenModule.address,
    );
  } catch (error) {
    console.error("failed to deploy token module", error);
  }
})();