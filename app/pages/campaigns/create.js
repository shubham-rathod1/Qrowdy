import { useState } from 'react';
import Layout from '../../components/layout';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import instance from '../../web3/factory';
import web3 from '../../web3/web3';
import Router from 'next/router';

export default function Create() {
  const [val, setVal] = useState(0);
  const [err, setErr] = useState('');
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    setErr('');
    try {
      const accounts = await web3.eth.getAccounts();
      await instance.methods.createCampaign(val).send({ from: accounts[0] });
      Router.push('/');
    } catch (e) {
      setErr(e.message);
    }
    setLoader(false);
  };
  return (
    <Layout>
      <div>Create a New Campaign</div>
      <Form onSubmit={handleSubmit} error={!!err}>
        <Form.Field>
          <label>Minimum contribution</label>
          <Input
            onChange={(e) => setVal(e.target.value)}
            value={val}
            type='number'
            labelPosition='right'
            label='wei'
          />
        </Form.Field>
        <Message error header='Oops!' content={err}></Message>
        <Button disabled={loader} loading={loader} primary>
          Create!
        </Button>
      </Form>
    </Layout>
  );
}
