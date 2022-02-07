/*
ERC-721 - every NFT is unique, even if they have the same image, name, and properties
ERC-1155 - mutliple people can be the holder of the same NFT(membership NFT - we can assign the same NFT to all our members) 
*/

import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const app = sdk.getAppModule("0xfd6EE97C297FA4457ABAE1e6b129804Cd1ac0cd6");

(async () => {
  try {
    const bundleDropModule = await app.deployBundleDropModule({
      // The collection's name, ex. CryptoPunks
      name: "AlgoDAO Membership",
      // A description for the collection.
      description: "A DAO for learning algorithms and data structures",
      // The image for the collection that will show up on OpenSea.
      image: readFileSync("scripts/assets/pic.png"),
      // We need to pass in the address of the person who will be receiving the proceeds from sales of nfts in the module.
      // We're planning on not charging people for the drop, so we'll pass in the 0x0 address
      // you can set this to your own wallet address if you want to charge for the drop.
      primarySaleRecipientAddress: ethers.constants.AddressZero,
    });

    console.log(
      "✅ Successfully deployed bundleDrop module, address:",
      bundleDropModule.address,
    );
    console.log(
      "✅ bundleDrop metadata:",
      await bundleDropModule.getMetadata(),
    );
  } catch (error) {
    console.log("failed to deploy bundleDrop module", error);
  }
})()