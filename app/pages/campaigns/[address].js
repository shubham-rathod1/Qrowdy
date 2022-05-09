import { useEffect, useState } from 'react';
import Layout from '../../components/layout';
import getCampaignInstance from '../../web3/campaigns';
import { Card, Grid, Button } from 'semantic-ui-react';
import web3 from '../../web3/web3';
import ContributeForm from '../../components/contributeForm';
import Link from 'next/link';

export default function Id(props) {
  const { address, balance, manager, minContri, noOfReq, noOfApprovers } =
    props;
  const renderData = () => {
    const items = [
      {
        header: manager,
        meta: 'the campaign creator address',
        description: 'manager can create request to withdraw funds',
        style: { overflowWrap: 'break-word', marginTop: '40px' },
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'campaign  balance in ether',
        description: 'The amount campaign is funded',
        style: { overflowWrap: 'break-word', marginTop: '40px' },
      },
      {
        header: minContri,
        meta: 'Min amount to be funded',
        description: `Please send min of ${minContri} to contribute to this campaign`,
        style: { overflowWrap: 'break-word', marginTop: '40px' },
      },
      {
        header: noOfReq,
        meta: 'Number of requests',
        description: 'requests tried to withdraw from this campaign',
        style: { overflowWrap: 'break-word', marginTop: '40px' },
      },
      {
        header: noOfApprovers,
        meta: 'Number of approvers',
        description: 'Number of people funded this campaign',
        style: { overflowWrap: 'break-word', marginTop: '40px' },
      },
    ];
    return <Card.Group items={items} />;
  };
  return (
    <Layout>
      <h2>Campaign description</h2>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            <div>{renderData()}</div>
          </Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm address={address} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Link href={`/campaigns/${address}/request`}>
              <Button primary>Transaction Request</Button>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  // The query params are set on `context.query`
  const { query } = context;
  const instance = await getCampaignInstance(query.address);
  const details = await instance.methods.campaignDetails().call();
  return {
    props: {
      address: query.address,
      minContri: details[0],
      balance: details[1],
      noOfReq: details[2],
      noOfApprovers: details[3],
      manager: details[4],
    },
  };
}
