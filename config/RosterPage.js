import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
} from 'react-native';

import RosterItem from './RosterItem.js';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});

const RosterPage = (props) => {
  const { rosters, selected, selectRoster } = props;
  const dataSource = ds.cloneWithRows(rosters);
  return (
    <ListView
      dataSource={dataSource}
      renderRow={(roster) => (
        <RosterItem
          isSelected={roster.id === selected}
          roster={roster}
          selectRoster={selectRoster}
        />
      )}
      contentContainerStyle={styles.list}
    />
  );
};

RosterPage.propTypes = {
  rosters: React.PropTypes.array.isRequired,
  selected: React.PropTypes.number,
  selectRoster: React.PropTypes.func,
};

export const styles = StyleSheet.create({
  list: {
    paddingVertical: 40, // (48 - 8 of item padding)
  }
});

export default RosterPage;
