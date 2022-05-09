import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../web3/web3';
import getCampaignInstance from '../web3/campaigns';

export default function RequestRow({ id, address, request, approversCount }) {
  const { Row, Cell } = Table;
  const _id = id.toString();
  const ready = request.approvalCount > approversCount / 2;
  const onApprove = async (id) => {
    const accounts = await web3.eth.getAccounts();
    const instance = await getCampaignInstance(address);
    await instance.methods.approveRequest(_id).send({ from: accounts[0] });
  };

  const onFinalize = async (id) => {
    const accounts = await web3.eth.getAccounts();
    const instance = await getCampaignInstance(address);
    await instance.methods.payout(_id).send({ from: accounts[0] });
  };

  return (
    <>
      <Row disabled={request.complete} positive={ready && !request.complete}>
        <Cell>{id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.amount, 'ether')}</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>
          {request.approvalCount} / {approversCount}
        </Cell>
        <Cell>
          <Button color='green' basic onClick={onApprove}>
            {request.complete ? 'Approved' : 'Approve'}
          </Button>
        </Cell>
        <Cell>
          <Button
            disabled={request.complete}
            basic
            color='teal'
            onClick={onFinalize}
          >
            Payout
          </Button>
        </Cell>
      </Row>
    </>
  );
}
