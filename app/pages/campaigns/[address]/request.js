import Link from 'next/link';
import getCampaignInstance from '../../../web3/campaigns';
import Layout from '../../../components/layout';
import { Button, Table } from 'semantic-ui-react';
import RequestRow from '../../../components/requestRow';
import { useEffect, useState } from 'react';

export default function Request(props) {
  const { address, data, totalRequest, approversCount } = props;
  const { Header, Row, HeaderCell, Body } = Table;
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    setRowData(data);
  }, [data]);

  const renderRow = () => {
    return rowData.map((item, index) => {
      return (
        <RequestRow
          request={item}
          key={index}
          id={index}
          address={address}
          approversCount={approversCount}
        />
      );
    });
  };

  return (
    <Layout>
      <div>request</div>
      <Link href={`/campaigns/${address}/request/new`}>
        <Button primary floated='right' style={{ marginBottom: '10px' }}>
          Add Request
        </Button>
      </Link>
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>ApprovalCount</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>
        <Body>{renderRow()}</Body>
      </Table>
      <div>
        <h3>Found {totalRequest} Transactions!</h3>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  // The query params are set on `context.query`
  const { query } = context;
  const instance = await getCampaignInstance(query.address);
  const totalRequest = await instance.methods.getReqCount().call();
  const approversCount = await instance.methods.approversCount().call();

  const request = await Promise.all(
    Array(parseInt(totalRequest))
      .fill()
      .map((item, index) => {
        return instance.methods.requests(index).call();
      })
  );
  let data = [];
  request.map((item) => {
    return data.push({
      description: item.description,
      amount: item.amount,
      recipient: item.recipient,
      complete: item.complete,
      approvalCount: item.approvalCount,
    });
  });
  return {
    props: {
      address: query.address,
      data,
      approversCount,
      totalRequest,
    },
  };
}
