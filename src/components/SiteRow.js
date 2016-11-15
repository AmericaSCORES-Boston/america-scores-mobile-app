import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

const Site = (props) => {
  const { name, id, rosters } = props.site;
  const itemStyle = props.isSelected && [styles.item, styles.selected] || styles.item;
  return (
    <TouchableHighlight
      onPress={() => {props.selectSite(id)}}
      underlayColor='#E0F2F1'
    >
      <View style={itemStyle}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.stars}>{`${rosters} stars`}</Text>
      </View>
    </TouchableHighlight>
  );
};

Site.propTypes = {
  isSelected: React.PropTypes.bool,
  site: React.PropTypes.object.isRequired,
  selectSite: React.PropTypes.func,
};

Site.defaultProps = {
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

export default Site;
