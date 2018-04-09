import React from 'react';
import axios from 'axios';
import { Segment, Header, Grid, Divider, Card, Image, Icon, Button, Modal, Input } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';


class Glassware extends React.Component{
  state = { glassware: [], search: ''} 

  componentWillMount() {
    axios.get('/api/all_glassware')
    .then(res => {
      let glassware = res.data.entries;
      this.setState({ glassware })
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
    let filteredGlassware = this.state.glassware.filter(
      (glassware) => {
        return glassware.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
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
            Glassware
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
                filteredGlassware.map(g =>
                  <Grid.Column computer={5} tablet={8} mobile={16}>
                    <Card>
                      <Image src='http://cdn.hiconsumption.com/wp-content/uploads/2016/04/Beer-Drinkers-Guide-To-Glassware-0.jpg' />
                      <Card.Content>
                        <Card.Header>{g.name}</Card.Header>
                        <Modal trigger={<Button fluid >More Info</Button>}>
                          <Modal.Header>Location Info</Modal.Header>
                          <Modal.Content image>
                            <Image wrapped size='large' src='http://cdn.hiconsumption.com/wp-content/uploads/2016/04/Beer-Drinkers-Guide-To-Glassware-0.jpg' />
                            <Modal.Description>
                              <Header>{g.name}</Header>
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
  }
}
export default Glassware;