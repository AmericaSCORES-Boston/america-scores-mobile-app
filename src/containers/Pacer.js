import React, { Component, PropTypes } from 'react';
import { ListView, View, TouchableOpacity, Text } from 'react-native';
import { Container, Header, Content, Button, H1, H2, H3 } from 'native-base';
import scoresTheme from '../themes/scoresTheme';
import { connect } from 'react-redux';
import * as actions from '../actions/pacer';

import styles from '../styles';

class PacerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = props.pacerState;
    this.state.pacerArray = [];
    this.state.level = 1;
    this.state.shuttle = 2;
    this.state.elapsed = '00';
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
    // Set the student's total shuttles here
    // Maybe modify the passed in students array with a new field?
  }

  handlePacerHold(rowData, rowId) {
    if (rowData > 0) {
      // Unset the student's total shuttles here if it was set
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
      <Container style={[styles.container, styles.containerPadding]}>
          <Content theme={scoresTheme}>
            <View style={[{flex: 1, flexDirection: 'row', justifyContent: 'center'}, styles.smallMarginTop]}>
              <H2 style={{marginRight: 20}}>Level: {this.state.level}</H2>
              <H2>Shuttle: {this.state.shuttle}</H2>
            </View>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
              <View style={[{borderColor: '#E4E4E4', borderWidth: 3, width: 130}, styles.mediumMarginTop]}>
                <H2 style={[styles.textCenter, styles.smallMarginTop]}>Total Shuttles</H2>
                <H1 style={[styles.textCenter, styles.smallMarginTop, styles.largeText]}>{this.state.elapsed}</H1>
              </View>
            </View>
            <ListView contentContainerStyle={[styles.gridList, styles.mediumMarginTop]}
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
