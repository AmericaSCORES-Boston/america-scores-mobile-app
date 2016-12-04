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
    this.state = props.sitesState;
  }

  componentWillMount() {
    this.props.fetchSites();
  }

  componentWillReceiveProps(nextProps) {
    const newSitesState = nextProps.sitesState;
    if (newSitesState && newSitesState.sites) {
      this.state = newSitesState;
    }
  }

  render() {
    return (
      <Container style={styles.container}>
          <Content theme={scoresTheme}>
            <List
              dataArray={this.state.sites}
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
  sitesState: state.sitesState
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
