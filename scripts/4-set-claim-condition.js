/*

Set up our "claim conditions"
What's the max # of NFTs that can be minted? When can users start minting NFTs? 
Again, this is usually custom logic you'd need to write into your contract but in this case thirdweb makes it easy. 
We can just use their newClaimPhase function and specify a few parameters.

*/

import sdk from "./1-initialize-sdk.js";

const bundleDrop = sdk.getBundleDropModule("0xeF464391C9508e5f6BA4DaB5803918B2039F628a");

(async () => {
  try {
    const claimConditionFactory = bundleDrop.getClaimConditionFactory();
    // Specify conditions
    claimConditionFactory.newClaimPhase({
      startTime: new Date(), //current time
      maxQuantity: 50_000,
      maxQuantityPerTransaction: 1, //specifies how many tokens someone can claim in a single transaction
    });

    await bundleDrop.setClaimCondition(0, claimConditionFactory); // Why do we pass in a 0? Well, basically our membership NFT has a tokenId of 0
    console.log("✅ Successfully set claim condition on bundle drop:", bundleDrop.address);
  }
  catch (error) {
    console.error("Failed to set claim condition", erorr);
  }
})()