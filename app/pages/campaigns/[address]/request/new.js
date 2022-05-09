import { Form, Button, Input, Message } from 'semantic-ui-react';
import { useState } from 'react';
import getCampaignInstance from '../../../../web3/campaigns';
import web3 from '../../../../web3/web3';
import Router from 'next/router';
import Layout from '../../../../components/layout';

export default function New(props) {
  const [amount, setAmount] = useState(0);
  const [recipient, setRecipient] = useState('');
  const [description, setDescription] = useState('');
  const [err, setErr] = useState('');
  const [loader, setLoader] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    setErr('');
    try {
      const accounts = await web3.eth.getAccounts();
      const instance = await getCampaignInstance(props.address);
      await instance.methods
        .createRequest(description, web3.utils.toWei(amount, 'ether'), recipient)
        .send({
          from: accounts[0],
        });
      Router.push(`/campaigns/${props.address}/request`);
    } catch (e) {
      setErr(e.message);
    }
    setAmount(0);
    setLoader(false);
  };

  return (
    <Layout>
      <div>
        <h3>Create a Request</h3>
        <Form onSubmit={handleSubmit} error={!!err}>
          <Form.Field>
            <label>Description</label>
            <Input
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              type='string'
            />
          </Form.Field>
          <Form.Field>
            <label>Amount to contribute</label>
            <Input
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              type='number'
            />
          </Form.Field>
          <Form.Field>
            <label>Recipient</label>
            <Input
              onChange={(e) => setRecipient(e.target.value)}
              value={recipient}
              type='string'
            />
          </Form.Field>
          <Message error header='Oops!' content={err}></Message>
          <Button disabled={loader} loading={loader} primary>
            Create!
          </Button>
        </Form>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
    // The query params are set on `context.query`
    const { query } = context;
    return {
      props: {
        address: query.address,
      },
    };
  }