import { useEffect, useMemo, useState } from "react";
import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";

// Instantiate the sdk on Rinkeby
const sdk = new ThirdwebSDK("rinkeby");

// We can grab a reference to our ERC-1155 contract.
const bundleDropModule = sdk.getBundleDropModule(
  "0xeF464391C9508e5f6BA4DaB5803918B2039F628a",
);

const App = () => {
  // Use the conenctWallet hook thridweb gives us
  const { connectWallet, address, erroor, provider } = useWeb3();
  console.log("Address:", address)

  // signer is required to sign transactions on the blockchain. Without it, we can only read data, not write
  const signer = provider ? provider.getSigner() : undefined;

  // State variable for us to know if user has our NFT
  const [hasClaimemdNFT, setHasClaimedNFT] = useState(false);

  // isClaiming lets us easily keep a loading state while the NFT is minting
  const [isClaiming, setIsClaiming] = useState(false);

  useEffect(() => {
    sdk.setProviderOrSigner(signer);
  }, [signer]);

  useEffect(() => {
    // if they don't have an connected wallet, exit!
    if (!address) {
      return;
    }
    return bundleDropModule
      .balanceOf(address, "0") // check if user has our NFT, 0 is then tokenID of our membership NFT
      .then((balance) => {
        // if balance is greater than 0, they have our NFT
        if (balance.gt(0)) {
          setHasClaimedNFT(true);
          console.log("🌟 this user has a membership NFT!")
        } else {
          setHasClaimedNFT(false);
          console.log("😭 this user doesn't have a membership NFT.")
        }
      })
      .catch((error) => {
        setHasClaimedNFT(false);
        console.error("failed to nft balance", error);
      });
  }, [address]);

  // This is the case where the user hasn't connected their wallet to yoour web app
  if (!address) {
    return (
      <div className="landing">
        <h1>Welcome to AlgoDAO, get rewarded for solving LeetCode questions</h1>
        <button onClick={() => connectWallet("injected")} className="btn-hero">
          Connect your wallet
        </button>
      </div>
    )
  }

  if (hasClaimemdNFT) {
    return (
      <div className="member-page">
        <h1>🍪DAO Member Page</h1>
        <p>Congratulations on being a member</p>
      </div>
    )
  }

  const mintNft = () => {
    setIsClaiming(true);
    // Call bundleDropModule.claim("0", 1) to mint nft to user's wallet
    bundleDropModule
      .claim("0", 1)
      .then(() => {
        setHasClaimedNFT(true);
        // Show user their fancy new NFT!
        console.log(
          `🌊 Successfully Minted! Check it our on OpenSea: https://testnets.opensea.io/assets/${bundleDropModule.address.toLowerCase()}/0`
        );
      })
      .catch((err) => {
        console.error("failed to claim", err);
      })
      .finally(() => {
        setIsClaiming(false);
      });
  }


  // User's have connected
  return (
    <div className="mint-nft">
      <h1>Mint your free 🍪DAO Membership NFT</h1>
      <button
        disabled={isClaiming}
        onClick={() => mintNft()}
      >
        {isClaiming ? "Minting..." : "Mint your nft (FREE)"}
      </button>
    </div>
  );
};

export default App;
