import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// import ThirdWeb
import { ThirdwebWeb3Provider } from '@3rdweb/hooks';

// Include what chains you wanna support.
// 4 = Rinkeby
const supportedChainIds = [4];

// Include what type of wallet you want to support
// In this case, we support MetaMask which is an "injected wallet"

const connectors = {
  injected: {},
};

// Wrap App with ThridwebWeb3Provider
// Render the App component to the DOM
ReactDOM.render(
  <React.StrictMode>
    <ThirdwebWeb3Provider
      connectors={connectors}
      supportedChainIds={supportedChainIds}
    >
      <App />
    </ThirdwebWeb3Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
