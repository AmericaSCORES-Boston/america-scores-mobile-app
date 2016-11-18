import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

const RosterItem = (props) => {
  const { name, id, people } = props.roster;
  const itemStyle = props.isSelected && [styles.item, styles.selected] || styles.item;
  return (
    <TouchableHighlight
      onPress={() => {props.selectRoster(id)}}
      underlayColor='#E0F2F1'
    >
      <View style={itemStyle}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.stars}>{`${people} stars`}</Text>
      </View>
    </TouchableHighlight>
  );
};

RosterItem.propTypes = {
  isSelected: React.PropTypes.bool,
  roster: React.PropTypes.object.isRequired,
  selectRoster: React.PropTypes.func,
};

RosterItem.defaultProps = {
  isSelected: false,
};

export const styles = StyleSheet.create({
  item: {
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  selected: {
    backgroundColor: '#B2DFDB',
  },
  stars: {
    paddingBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 4,
  },
});

export default RosterItem;
