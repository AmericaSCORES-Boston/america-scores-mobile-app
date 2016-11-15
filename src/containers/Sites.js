import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ListView,
  StyleSheet,
  Text,
} from 'react-native';

import SiteRow from '../components/SiteRow';
import fetchSites from '../actions/fetchSites';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});

class Sites extends React.Component {
  constructor(props) {
    super(props);
    props.onLoad();
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
      dataSource: this.ds.cloneWithRows(props.sites),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.ds.cloneWithRows(nextProps.sites)
    });
  }

  render() {
    return (
      <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={(data) => <SiteRow { ...data } />}
      />
    );
  }
}

// Sites.propTypes = {
//   sites: React.PropTypes.array.isRequired,
//   selected: React.PropTypes.number,
//   selectSite: React.PropTypes.func,
// };

const mapStateToProps = (state, ownProps) => {
  return {
    sites: ownProps.filter === state.visibilityFilter
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLoad: () => {
      dispatch(fetchSites())
    }
  }
}

export const styles = StyleSheet.create({
  list: {
    paddingVertical: 40, // (48 - 8 of item padding)
  }
});

const SitesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sites)

export default SitesContainer;
