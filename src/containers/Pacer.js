import React, { Component } from 'react';
import { ListView, View, TouchableOpacity, Text } from 'react-native';
import { Container, Content, Button, H1, H2 } from 'native-base';
import scoresTheme from '../themes/scoresTheme';
import { connect } from 'react-redux';
import pacerStages from '../util/pacerStages';
import * as actions from '../actions/pacer';

import styles from '../styles';

const Sound = require('react-native-sound');

class PacerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = props.pacerState;
    this.state.pacerArray = [];
    this.state.currentLevel = 0;
    this.state.currentShuttle = 1;
    this.state.totalShuttles = 0;
    this.state.disabled = false;
    this.state.pacerDone = false;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state.dataSource = ds.cloneWithRows(this.state.pacerArray);
  }

  componentDidMount() {
    this.props.loadPacer(this.props.students.length);
  }

  componentWillUnmount() {
    this.clearPacerTest();
  }

  componentWillReceiveProps(nextProps) {
    const newPacerState = nextProps.pacerState;
    if (newPacerState && newPacerState.pacerArray) {
      this.state.dataSource = this.state.dataSource.cloneWithRows( newPacerState.pacerArray );
      this.state.pacerArray = newPacerState.pacerArray;
      this.state.totalShuttles = newPacerState.totalShuttles;
      this.state.currentShuttle = newPacerState.currentShuttle;
      this.state.currentLevel = newPacerState.currentLevel;

      if (this.isPacerTestOver()) {
        this.clearPacerTest();
      }
    }
  }

  isPacerTestOver() {
    if (this.state.currentLevel >= 21) {
      return true;
    }

    // Check pacerArray for full completion (all = 2)
    const array = this.state.pacerArray;
    if (this.state.pacerArray.length == 0) {
      return false;
    }

    for (const item of array) {
      if (item != 2) {
        return false;
      }
    }
    return true;
  }

  clearPacerTest() {
    // Stop the audio
    if (this.state.pacerAudio !== undefined) {
      this.state.pacerAudio.stop();
      this.state.pacerAudio.release();
    }
    this.state.pacerDone = true;
    this.forceUpdate();
    console.log(this.props.students);
  }

  startPacerTest() {
    // Start the audio
    this.state.pacerAudio = new Sound('PacerAudio.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        // App doesn't work?
      }
      else {
        console.log('duration in seconds: ' + this.state.pacerAudio.getDuration());
        this.state.disabled = true;
        this.forceUpdate();
        this.state.pacerAudio.play();
      }
    });
  }

  incrementShuttle() {
    const stage = pacerStages[this.state.currentLevel];
    if (this.state.currentShuttle >= stage.laps) {
      this.props.timeIntervalElapsed();
      this.props.maxShuttlesReached();
    }
    else {
      this.props.timeIntervalElapsed();
    }
  }

  handlePacerPress(rowData, rowId) {
    if (rowData < 2) {
      this.props.incrementSquare(rowId);
    }

    // Set the student's total shuttles here
    this.props.students[parseInt(rowId, 10)].pacer = this.state.currentLevel;
    // Maybe modify the passed in students array with a new field?
  }

  handlePacerHold(rowData, rowId) {
    if (rowData > 0) {
      // Unset the student's total shuttles here if it was set
      this.props.students[parseInt(rowId, 10)].pacer = null;
      this.props.decrementSquare(rowId);
    }
  }

  renderSquares(rowData, rowId) {
    rowId = parseInt(rowId, 10);
    // Light gray
    let rowColor = '#E4E4E4';
    if (rowData === 1) {
      // Light yellow
      rowColor = '#FFF248';
    }
    else if (rowData === 2) {
      // Light red
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
              <H2 style={{marginRight: 20}}>Level: {this.state.currentLevel + 1}</H2>
              <H2>Shuttle: {this.state.totalShuttles}</H2>
            </View>
            <Button large block disabled={this.state.pacerDone || !this.state.disabled} onPress={() => this.incrementShuttle()} style={styles.mediumMarginTop}>
                <H1 style={styles.white}>Next Shuttle</H1>
            </Button>
            <ListView contentContainerStyle={[styles.gridList, styles.mediumMarginTop]}
              dataSource={this.state.dataSource}
              renderRow={(rowData, seciondId, rowId) => this.renderSquares(rowData, rowId)}
              enableEmptySections={true}
            />
          <Button large block disabled={this.state.disabled} onPress={() => this.startPacerTest()} style={styles.mediumMarginTop}>
              <H1 style={styles.white}>Start Test</H1>
            </Button>
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
  },
  timeIntervalElapsed: () => {
    dispatch(actions.timeIntervalElapsed());
  },
  maxShuttlesReached: () => {
    dispatch(actions.maxShuttlesReached());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PacerContainer);
