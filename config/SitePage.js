import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
} from 'react-native';

import Site from './Site.js';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});

const SitePage = (props) => {
  const { sites, selected, selectSite } = props;
  const dataSource = ds.cloneWithRows(sites);
  return (
    <ListView
      dataSource={dataSource}
      renderRow={(site) => (
        <Site
          isSelected={site.id === selected}
          site={site}
          selectSite={selectSite}
        />
      )}
      contentContainerStyle={styles.list}
    />
  );
};

SitePage.propTypes = {
  sites: React.PropTypes.array.isRequired,
  selected: React.PropTypes.number,
  selectSite: React.PropTypes.func,
};

export const styles = StyleSheet.create({
  list: {
    paddingVertical: 40, // (48 - 8 of item padding)
  }
});

export default SitePage;
