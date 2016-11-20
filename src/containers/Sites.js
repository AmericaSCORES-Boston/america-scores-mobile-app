import React, { Component, PropTypes } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, ListView, Text, StyleSheet } from 'react-native';
import { Container, Content, List, ListItem } from 'native-base';

import { connect } from 'react-redux';
import * as actions from '../actions/site';

import styles from '../styles';

class SitesContainer extends Component {
  constructor(props) {
    super(props);
    this.props.fetchSites();
    this.state = {
      dataSource: []
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: nextProps.siteData.sites
    });
  }

  render() {
    return (
      <Container style={styles.container}>
          <Content>
            <List
              dataArray={this.state.dataSource}
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

SitesContainer.propTypes = {
  fetchSites: PropTypes.func.isRequired,
  siteData: PropTypes.object.isRequired
};

SitesContainer.defaultProps = {
  siteData: {}
};

const mapStateToProps = (state) => ({
  siteData: state.sitesState
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
