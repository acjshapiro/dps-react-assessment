import React from 'react';
import axios from 'axios';
import { Segment, Header, Grid, Divider, Card, Image, Icon, Button, Modal, Input } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';


class Locations extends React.Component{
  state = { locations: [], search: ''} 

  componentWillMount() {
    axios.get('/api/all_locations')
    .then(res => {
      let locations = res.data.entries;
      this.setState({ locations })
      this.props.dispatch({ type: 'HEADERS', headers: res.headers })
    }).catch(err => {
      console.log("NoBeerForYou = " + err)
    })
  }
  handleChange = (e) => {
    this.setState({ search: e.target.value }
    );
  }

  render(){
    let filteredLocations = this.state.locations.filter(
      (location) => {
        return location.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
      }
    )
    
    return(
      <Segment style={styles.header}>
        <Grid.Column computer={5} tablet={8} mobile={16}>
        <Segment inverted>
          <Header
            as='h1'
            textAlign='center'
            style={styles.whiteText}
          >
            Locations
            </Header>
          <Divider />
          <Grid centered>
              <Grid.Row>
                <Grid.Column mobile={16} tablet={16} computer={4}>
                  <Input
                    value={this.state.search}
                    onChange={this.handleChange}
                    icon={{ name: 'search', circular: true }}
                    placeholder="Search..."
                  />
                </Grid.Column>
              </Grid.Row>  
              {
                filteredLocations.map(l =>
                  <Grid.Column computer={4} tablet={8} mobile={16}>
                    <Card>
                      <Image style={styles.images} src={ l.brewery.images? l.brewery.images.large : 'https://sep.yimg.com/ay/kkapers2/store-locations-30.gif'} />
                      <Card.Content>
                        <Card.Header>{l.name}</Card.Header>
                        <Card.Description>Address: { l.street_address? l.street_address : 'N/A'}</Card.Description>
                        <Card.Description>City: {l.locality? l.locality : 'N/A'}</Card.Description>
                        <Card.Description>State: {l.region? l.region : 'N/A'}</Card.Description>
                        <Card.Description style={styles.description}>
                          {/* {l.description} */}
                        </Card.Description>
                        <Modal trigger={<Button fluid >More Info</Button>}>
                          <Modal.Header>Location Info</Modal.Header>
                          <Modal.Content image>
                            <Image wrapped size='large' src='https://sep.yimg.com/ay/kkapers2/store-locations-30.gif' />
                            <Modal.Description>
                              <Header>{l.name}</Header>
                              <p>Address: { l.street_address? l.street_address : 'N/A'}</p>
                              <p>City: {l.locality? l.locality : 'N/A'}</p>
                              <p>State: {l.region? l.region : 'N/A'}</p>
                            </Modal.Description>
                          </Modal.Content>
                        </Modal>
                      </Card.Content>
                    </Card>
                  </Grid.Column>
                )
              }
            </Grid> 
        </Segment>    
        </Grid.Column>
      </Segment>
    )  
  }

  

}

const styles = {
  header:{
    textAlign: 'center',
    color: 'black',
    fontHeight: 100,
  },
  description:{
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis', 
  },
  scroller: { 
    height: '60vh', 
    overflow: 'auto',
  },
  images: {
    height: '100px',
    width: '290px',
  }

}
export default Locations;