import web3 from './web3';
import Campaign from '../../artifacts/contracts/Campaign.sol/Campaign.json';
const getCampaignInstance = (address) => {
  const instance = new web3.eth.Contract(Campaign.abi, address);
  return instance;
};

export default getCampaignInstance;
