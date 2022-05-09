import { Menu } from 'semantic-ui-react';
import Link from 'next/link';

export default function Header() {
  return (
    <Menu style={{ marginTop: '20px' }}>
      <Link href='/'>
        <Menu.Item>CrowdCoin</Menu.Item>
      </Link>
      <Menu.Menu position='right'>
        <Link href='/'>
          <Menu.Item>Campaigns</Menu.Item>
        </Link>
        <Link href='/campaigns/create'>
          <Menu.Item>+</Menu.Item>
        </Link>
      </Menu.Menu>
    </Menu>
  );
}
