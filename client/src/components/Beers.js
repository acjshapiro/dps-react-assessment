import React from 'react';
import axios from 'axios';
import { Segment, Header, Grid, Divider, Card, Image, Icon, Button, Modal } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


class Beers extends React.Component{
  state = { beers: [], open: false }

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
  show = dimmer => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })  

  render(){
    const beers = this.state.beers
    const { open, dimmer } = this.state

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
              {
                beers.map(b =>
                  <Grid.Column computer={5} tablet={8} mobile={16}>
                    <Card>
                      <Image src='https://food.fnr.sndimg.com/content/dam/images/food/fullset/2015/11/20/0/fnd_beer-istock.jpg.rend.hgtvcom.616.462.suffix/1448031613421.jpeg' />
                      <Card.Content>
                        <Card.Header>{b.name}</Card.Header>
                        <Card.Description>ABV: {b.abv}%</Card.Description>
                        <Card.Description>IBU: {b.ibu}</Card.Description>
                        <Card.Description style={styles.description}>
                          {b.description}
                        </Card.Description>
                        <Modal trigger={<Button primary fluid >More Info</Button>}>
                          <Modal.Header>Beer Info</Modal.Header>
                          <Modal.Content image>
                            <Image wrapped size='large' src='https://food.fnr.sndimg.com/content/dam/images/food/fullset/2015/11/20/0/fnd_beer-istock.jpg.rend.hgtvcom.616.462.suffix/1448031613421.jpeg' />
                            <Modal.Description>
                              <Header>{b.name}</Header>
                              <p>ABV: {b.abv}%</p>
                              <p>IBU: {b.ibu}</p>
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
    
  }
}
export default Beers;