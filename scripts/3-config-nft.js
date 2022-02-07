/*

Okay, now we're going to actually deploy metadata associated with our membership NFT. We haven't done that yet. 
All we did so far was create the ERC-1155 contract and add some basic metadata.

*/

import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule("0xeF464391C9508e5f6BA4DaB5803918B2039F628a",);

(async () => {
  try {
    await bundleDrop.createBatch([   // set up our actual NFT on our ERC-1155 using createBatch
      {
        name: "AlgoDAO membership NFT",
        description: "This NFT will give you access to AlgoDAO",
        image: readFileSync("scripts/assets/tree.jpg"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  }
  catch (error) {
    console.error("failed to create the new NFT", error);
  }
})()
