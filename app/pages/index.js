import instance from '../web3/factory';
import Image from 'next/image';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/layout';
import Link from 'next/link';

export default function Home({ campaigns }) {
  const allCampaigns = () => {
    const items = campaigns.map((address) => {
      return {
        header: address,
        description: <Link href={`/campaigns/${address}`}>click to view</Link>,
        fluid: true,
      };
    });
    return <Card.Group items={items} />;
  };

  return (
    <Layout>
      <div>
        <main>
          <h3>Open Campaigns</h3>
          <div>
            <Link href='/campaigns/create'>
              <Button
                style={{ marginTop: '10px' }}
                floated='right'
                content='Create campaign'
                icon='add circle'
                primary
              />
            </Link>
            {allCampaigns()}
          </div>
        </main>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const campaigns = await instance.methods.getDeployedContracts().call();
  // Pass data to the page via props
  return { props: { campaigns } };
}
