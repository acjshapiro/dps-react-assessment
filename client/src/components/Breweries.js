import React from 'react';
import axios from 'axios';
import { Segment, Header, Grid, Divider, Card, Image, Icon , Button, Modal, Input} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Breweries extends React.Component{
  state = { breweries: [], search: '' }


  componentWillMount() {
    axios.get('/api/all_breweries')
    .then(res => {
      let breweries = res.data.entries;
      this.setState({ breweries, visible: res.data })
      this.props.dispatch({ type: 'HEADERS', headers: res.headers })
    }).catch(err => {
      console.log("NoBreweryForYou = " + err)
    })
  }
  handleChange = (e) => {
    this.setState({ search: e.target.value }
    );
  }

  render(){
    let filteredBreweries = this.state.breweries.filter(
      (brewery) => {
        return brewery.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
      }
    )

    return(
      <Segment style={styles.header}>
        <Grid.Column computer={5} tablet={8} mobile={16}>
        <Segment inverted>
          <Header
            as='h1'
            textAlign='center'
            style={styles.header}
          >
            Breweries
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
                filteredBreweries.map(b =>
                  <Grid.Column computer={4} tablet={8} mobile={16}>
                    <Card>
                      <Image style={styles.images} src={b.images? b.images.large :'http://c0.thejournal.ie/media/2018/03/pink-ipa-2-290x80.jpg' } />
                      <Card.Content>
                        <Card.Header>{b.name}</Card.Header>
                        <Card.Description>Established: {b.established? b.established : 'N/A'}</Card.Description>
                        <Card.Description>Class: {b.brand_classification? b.brand_classification : "N/A"}</Card.Description>
                        <Card.Description style={styles.description}>
                          {b.description? b.description : "N/A"}
                        </Card.Description>
                        <Modal trigger={<Button fluid>More Info</Button>}>
                          <Modal.Header>Brewery Info</Modal.Header>
                          <Modal.Content image>
                            <Image wrapped size='medium' src={ b.images? b.images.square_large : 'http://enlightenedbeer.com/img/brewery02.jpg'} />
                            <Modal.Description>
                              <Header>{b.name}</Header>
                              <p>Website: <a href={b.website}>
                                {b.website}</a>
                              </p>   
                              <p>Established: {b.established? b.established : 'N/A'}</p>
                              <p>Class: {b.brand_classification? b.brand_classification : "N/A"}</p>
                              <p>About: {b.description? b.description : "N/A"}</p>
                            </Modal.Description>
                          </Modal.Content>
                        </Modal>
                      </Card.Content>
                      <Card.Content extra>
                        <a href={b.website}>
                          <Icon name='external' />
                          {b.website}
                        </a>
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
// const brewModal = () => (
//   <Modal trigger={<Button>More Info</Button>}>
//     <Modal.Header>Select a Photo</Modal.Header>
//     <Modal.Content image>
//       <Image wrapped size='medium' src='/assets/images/avatar/large/rachel.png' />
//       <Modal.Description>
//         <Header>Default Profile Image</Header>
//         <p>We've found the following gravatar image associated with your e-mail address.</p>
//         <p>Is it okay to use this photo?</p>
//       </Modal.Description>
//     </Modal.Content>
//   </Modal>
// )

const styles = {
  header:{
    textAlign: 'center',
    color: 'white',
    fontHeight: 100,
  },
  description:{
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }
}
export default Breweries;