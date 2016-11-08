import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
});

const StudentRow = (student) => (
  <TouchableOpacity onPress={() => student.switchToDetailRoute(student)}>
    <View style={styles.container}>
      <Text>{ student.name }</Text>
      <Text style={styles.text}>{ student.number}</Text>
    </View>
  </TouchableOpacity>
);

export default StudentRow;
