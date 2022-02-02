import { useEffect, useMemo, useState } from "react";
import { useWeb3 } from "@3rdweb/hooks";

const App = () => {
  // Use the conenctWallet hook thridweb gives us
  const { connectWallet, address, erroor, provider } = useWeb3();
  console.log("Address:", address)

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

  // User's have connected
  return (
    <div className="landing">
      <h1>Wallet connected</h1>
    </div>
  );
};

export default App;
