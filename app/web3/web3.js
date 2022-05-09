import Web3 from 'web3';
// window.ethereum.request({ method: 'eth_requestAccounts' });

let web3;
if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  window.ethereum.request({ method: 'eth_requestAccounts' });
  web3 = new Web3(window.ethereum);
} else {
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/a44ba5a185844cd8b2a0d799c5e773c9'
  );
  web3 = new Web3(provider);
}

export default web3;
