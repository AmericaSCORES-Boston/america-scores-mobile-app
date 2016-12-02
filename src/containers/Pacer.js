import React, { Component, PropTypes } from 'react';
import { Container, Content, Button, InputGroup, Input } from 'native-base';

import { ListView, View, TouchableOpacity, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions/pacer';

import styles from '../styles';

class PacerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = props.pacerState;
    this.state.pacerArray = [];
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state.dataSource = ds.cloneWithRows(this.state.pacerArray);
  }

  componentDidMount() {
    this.props.loadPacer(this.props.students.length);
  }

  componentWillReceiveProps(nextProps) {
    const newPacerState = nextProps.pacerState;
    if (newPacerState && newPacerState.pacerArray) {
      this.state.dataSource = this.state.dataSource.cloneWithRows( newPacerState.pacerArray );
    }
  }

  handlePacerPress(rowData, rowId) {
    if (rowData < 2) {
      this.props.incrementSquare(rowId);
    }
    // Set the student's time here
    // Maybe modify the passed in students array with a new field?
  }

  handlePacerHold(rowData, rowId) {
    if (rowData > 0) {
      // Unset the students time here if it was set
      this.props.decrementSquare(rowId);
    }
  }


  renderSquares(rowData, rowId) {
    rowId = parseInt(rowId, 10);
    let rowColor = '#E4E4E4';
    if (rowData === 1) {
      rowColor = '#FFF248';
    }
    else if (rowData === 2) {
      rowColor = '#FFA2AE';
    }
    return (
      <TouchableOpacity
        style={[styles.gridItem, {borderColor: rowColor}]}
        onPress={() => this.handlePacerPress(rowData, rowId)}
        onLongPress={() => this.handlePacerHold(rowData, rowId)} >
        <View>
          <Text>{rowId + 1}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <Container style={styles.container}>
          <Content>
            <ListView contentContainerStyle={styles.gridList}
              dataSource={this.state.dataSource}
              renderRow={(rowData, seciondId, rowId) => this.renderSquares(rowData, rowId)}
              enableEmptySections={true}
            />
          </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  pacerState: state.pacerState
});

const mapDispatchToProps = (dispatch) => ({
  loadPacer: (num) => {
    dispatch(actions.loadPacerTest(num));
  },
  incrementSquare: (index) => {
    dispatch(actions.pacerItemTapped(index));
  },
  decrementSquare: (index) => {
    dispatch(actions.pacerItemLongPress(index));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PacerContainer);
