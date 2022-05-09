import { Form, Button, Input, Message } from 'semantic-ui-react';
import { useState } from 'react';
import getCampaignInstance from '../web3/campaigns';
import web3 from '../web3/web3';
import Router from 'next/router';

export default function ContributeForm({ address }) {
  const [amount, setAmount] = useState(0);
  const [err, setErr] = useState('');
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    setErr('');
    try {
      const accounts = await web3.eth.getAccounts();
      const instance = await getCampaignInstance(address);
      await instance.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(amount, 'ether'),
      });
      Router.push(`/campaigns/${address}`);
    } catch (e) {
      setErr(e.message);
    }
    setAmount(0);
    setLoader(false);
  };
  return (
    <div>
      <Form onSubmit={handleSubmit} error={!!err}>
        <Form.Field>
          <label>Amount to contribute</label>
          <Input
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            type='number'
            label='ether'
            labelPosition='right'
          />
        </Form.Field>
        <Message error header='Oops!' content={err}></Message>
        <Button disabled={loader} loading={loader} primary>
          Contribute
        </Button>
      </Form>
    </div>
  );
}
