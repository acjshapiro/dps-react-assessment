import React from 'react';
import axios from 'axios';
import { Segment, Header, Grid, Divider, Card, Image, Icon, Button, Modal, Input } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';


class Beers extends React.Component{
  state = { beers: [], search: ''} 

  componentWillMount() {
    axios.get('/api/all_beers')
    .then(res => {
      let beers = res.data.entries;
      this.setState({ beers })
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
    let filteredBeers = this.state.beers.filter(
      (beer) => {
        return beer.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
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
            Check Out My Beers
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
                filteredBeers.map(b =>
                  <Grid.Column computer={4} tablet={8} mobile={16}>
                    <Card>
                      <Image style={styles.images} src={ b.labels? b.labels.large : 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2015/11/20/0/fnd_beer-istock.jpg.rend.hgtvcom.616.462.suffix/1448031613421.jpeg'} />
                      <Card.Content>
                        <Card.Header>{b.name}</Card.Header>
                        <Card.Description>ABV: { b.abv? b.abv : 'N/A'}%</Card.Description>
                        <Card.Description>IBU: {b.ibu? b.ibu : 'N/A'}</Card.Description>
                        <Card.Description style={styles.description}>
                          {b.description}
                        </Card.Description>
                        <Modal trigger={<Button fluid >More Info</Button>}>
                          <Modal.Header>Beer Info</Modal.Header>
                          <Modal.Content image>
                            <Image wrapped size='large' src='https://food.fnr.sndimg.com/content/dam/images/food/fullset/2015/11/20/0/fnd_beer-istock.jpg.rend.hgtvcom.616.462.suffix/1448031613421.jpeg' />
                            <Modal.Description>
                              <Header>{b.name}</Header>
                              <p>ABV: { b.abv? b.abv : 'N/A'}%</p>
                              <p>IBU: {b.ibu? b.ibu : 'N/A'}</p>
                              <p>{b.description}</p>
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
    height: '218px',
    width: '290px',
  }
}
export default Beers;