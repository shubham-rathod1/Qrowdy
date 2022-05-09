// import React from 'react'
import Header from './header';
import { Container } from 'semantic-ui-react';

export default function Layout(props) {
  return (
    <div>
      <Container>
        <Header />
        {props.children}
      </Container>
    </div>
  );
}
