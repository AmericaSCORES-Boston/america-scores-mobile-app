import React, { Component, PropTypes } from 'react';
import { Actions } from 'react-native-router-flux';
import { Text } from 'react-native';
import { Container, Content, List, ListItem } from 'native-base';
import scoresTheme from '../themes/scoresTheme';

import { connect } from 'react-redux';
import * as actions from '../actions/site';

import styles from '../styles';

class SitesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = props.state;
  }

  componentWillMount() {
    this.props.fetchSites();
  }

  componentWillReceiveProps(nextProps) {
    const newSitesState = nextProps.state.sitesState;
    if (newSitesState && newSitesState.sites) {
      this.state.sitesState = newSitesState;
    }
  }

  render() {
    return (
      <Container style={styles.container}>
          <Content theme={scoresTheme}>
            <List
              dataArray={this.state.sitesState.sites}
              renderRow={(rowData) => 
                <ListItem button onPress={()=>Actions.programs({title: rowData.site_name, site_id: rowData.site_id})}>
                  <Text>{rowData.site_name}</Text>
                </ListItem>
              }
            />
          </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  state
});

const mapDispatchToProps = (dispatch) => ({
  fetchSites: () => {
    dispatch(actions.fetchSites());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SitesContainer);
