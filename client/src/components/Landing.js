import React from 'react';
import styled from 'styled-components';
import beers from '../images/beers.jpg';
import { Header } from 'semantic-ui-react';

const Content = styled.div`
  border: 1px solid #000;
  background-image: url(${beers});;
  height: 774px;
`
const styles = {
  Header: {
    textAlign: 'center',
    color: 'white',
    fontSize: '150px',
  }
}

class Landing extends React.Component {
  render() {
    return(
      <Content>
        <Header as='h1' style={styles.Header}>
          Beers!
        </Header>
      </Content>
    )
  } 

}

export default Landing;


