import { connect } from 'react-redux'
import React from 'react';
import { ListView, StyleSheet } from 'react-native';
import StudentRow from '../components/StudentRow';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  }
});

class StudentsList extends React.Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
      dataSource: this.ds.cloneWithRows(props.students),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.ds.cloneWithRows(nextProps.students)
    });
  }

  render() {
    return (
      <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={(data) => <StudentRow { ...data } />}
      />
    );
  }
}

export default StudentsList;
