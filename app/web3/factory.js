import web3 from './web3';
import CampaignFactory from '../artifacts/contracts/Campaign.sol/CampaignFactory.json';
const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  // '0x4C857FE1334Cc1B607E33dEe69c06bB2B05A8bF8'
  // '0x03043116b843b864b192858D3D096c8C08107d17'
  '0x2c8197503C19B7e99eAe71791429F1706A59284d'
);

export default instance;
