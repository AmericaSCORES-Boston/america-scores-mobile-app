import React, { Component } from 'react';
import { ListView, View, TouchableOpacity, Text } from 'react-native';
import { Container, Content, Button, H1, H2 } from 'native-base';
import scoresTheme from '../themes/scoresTheme';
import { connect } from 'react-redux';
import pacerStages from '../util/pacerStages';
import * as actions from '../actions/pacer';
import { Actions } from 'react-native-router-flux';
import * as eventActions from '../actions/event';
import dates from '../util/dates';
// import {Modal,TouchableHighlight} from 'react-native';

import styles from '../styles';
import Sound from 'react-native-sound';

class PacerContainer extends Component {
    constructor(props) {
        super(props);
        this.state = props.pacerState;
        //this.state = {...props.programsState, ...props.pacerState};

        this.state.pacerArray = [];
        this.state.currentLevel = 1;
        this.state.currentShuttle = 1;
        this.state.totalShuttles = 0;
        this.state.disabled = false;
        this.state.pacerDone = false;
        // adding an event for passing the event_id
        this.state.event = props.event;
        this.state.status=false;

        //modal visibility toggle
        //this.state.modalVisible=false,

        // adding a new array for logging all the actions, each element specifies
        // the student index that refers to the student that just got modified
        this.state.actionHistory = [];
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state.dataSource = ds.cloneWithRows(this.state.pacerArray);
        this.props.component.onRight = () => {
            if (this.state.pacerDone) {
                this.passPacerData();
                alert('Pacer Results Submitted');
                Actions.pop();
            }
            else {
                alert('Pacer Test Incomplete');
            }

        }
        this.props.component.rightTitle = 'Submit';
    }

    // adding events
    componentWillMount() {
        this.props.createEvent(this.props.program.program_id, this.props.season);
    }

    componentDidMount() {
        this.props.loadPacer(this.props.students.length);
    }

    componentWillUnmount() {
        this.clearPacerTest();
    }

    componentWillReceiveProps(nextProps) {
        // handling events

        const newEventsState = nextProps.eventsState;
        if (newEventsState && newEventsState.events) {
            this.state.events = newEventsState.events;
            const filteredEvents = this.state.events.slice().filter(function (event) {
                return dates.getDateStringFromSql(event.event_date) === dates.getTodayDateString();
            });
            let len  = filteredEvents.length;
            const event = (len > 0) ? filteredEvents[len-1] : null;
            this.state.event = event;
        }

        // handling pacerArray
        const newPacerState = nextProps.pacerState;
        if (newPacerState && newPacerState.pacerArray) {
            this.state.dataSource = this.state.dataSource.cloneWithRows( newPacerState.pacerArray );
            this.state.pacerArray = newPacerState.pacerArray;
            this.state.totalShuttles = newPacerState.totalShuttles;
            this.state.currentShuttle = newPacerState.currentShuttle;
            this.state.currentLevel = newPacerState.currentLevel;
            // adding a new array for logging all the actions
            this.state.actionHistory = newPacerState.actionHistory;
            if (this.isPacerTestOver()) {
                this.clearPacerTest();
            }
        }
    }

    passPacerData(){
        var studentList = this.props.students;
        for (var i = 0; i < studentList.length; i++) {
            var dataArray = [];
            const event = this.state.event || this.props.event;
            const student_id = studentList[parseInt(i, 10)].student_id,
                // pacerLevel=studentList[parseInt(i,10)].pacer+pacerStages[this.state.currentLevel-1].laps,
                pacerLevel = studentList[parseInt(i, 10)].pacer,
                //pacerLevel=studentList.pacerData
                pacerData = {student_id, pacerLevel};


            this.props.savePacerData(event.event_id, dataArray.concat([pacerData]));
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
    }

    startPacerTest() {
        this.state.pacerAudio = new Sound('pacer.mp3', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                // App doesn't work?
            }
            else {
                this.state.disabled = true;
                this.forceUpdate();
                this.state.pacerAudio.play(() => this.state.pacerAudio.release); //release when done
                setTimeout(() => {
                    this.incrementShuttle()
                }, 50100);//50200
            }
        });
    }

    incrementShuttle() {
        // assuming that currentLevel incremements when level changes
        let stage = pacerStages[this.state.currentLevel-1];
        if(!this.state.pacerDone){
            if (this.state.currentShuttle >= stage.laps) {
                this.props.timeIntervalElapsed();
                this.props.maxShuttlesReached();
                stage = pacerStages[this.state.currentLevel-1];
            }
            else {
                //if  ! max shuttle reached
                this.props.timeIntervalElapsed();
            }
        }

        if(this.state.totalShuttles!==236 && !this.state.pacerDone){
            setTimeout(() => {
                this.incrementShuttle()
            }, stage.time);
        } else{
        }
    }

    handlePacerPress(rowData, rowId) {
        // put the action in history whether it is the the second or the first miss
        this.state.actionHistory.push(rowId);
        // set the data when the item is tapped the second time
        if (rowData <2) {
            this.props.incrementSquare(rowId);
        }
    }

    handlePacerHold(rowData, rowId) {
        if (rowData > 0) {
            // Unset the student's total shuttles here if it was set
            this.props.students[parseInt(rowId, 10)].pacer = null;
            this.props.decrementSquare(rowId);
        }
    }

    handleUndo() {
        if (this.state.actionHistory.length > 0 && this.state.actionHistory != null) {
            // get the last index that an action is performed on, basicaly an rowId
            var lastId = this.state.actionHistory.pop();
            // get the data of the last index
            var lastData = this.state.pacerArray[parseInt(lastId, 10)];
            // refers to the hold function
            this.handlePacerHold(lastData, lastId);
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
        else if(rowData === 2){
            // Light red
            rowColor = '#FFA2AE';
            this.props.students[parseInt(rowId, 10)].pacer = this.state.totalShuttles;
            // this.state.rowColor = '#FFA2AE';
        }
        return (
            <TouchableOpacity
                style={[styles.gridItem, {borderColor: rowColor}]}
                onPress={() => this.handlePacerPress(rowData, rowId)}
                onLongPress={() => this.handlePacerHold(rowData, rowId)} >
              <View>
                  {/*<Text>{rowId + 1}</Text>*/}
                <Text>{this.props.students[parseInt(rowId, 10)].last_name+ " " + this.props.students[parseInt(rowId, 10)].first_name.substr(0,2)}</Text>
              </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (

            <Container style={[styles.container, styles.containerPadding]}>
              <Content  theme={scoresTheme}>
                <View style={[{flex: 0, flexDirection: 'row', justifyContent: 'center', height:30}, styles.smallMarginTop]}>
                  <H2 style={{marginRight: 20}}>Level: {this.state.currentLevel}</H2>
                  <H2>Shuttle: {this.state.totalShuttles}</H2>
                </View>
                  {/*  <Button id='shuttleIncButton'  large block disabled={this.state.pacerDone || !this.state.disabled} onPress={() => this.incrementShuttle()} style={styles.mediumMarginTop}>
                <H1 style={styles.white}>Next Shuttle</H1>
              </Button>*/}
                <ListView contentContainerStyle={[styles.gridList, styles.mediumMarginTop]}
                          dataSource={this.state.dataSource}
                    // added by Bhupendra
                          initialListSize={this.state.pacerArray.length}
                          renderRow={(rowData, seciondId, rowId) => this.renderSquares(rowData, rowId)}
                          enableEmptySections={true}
                />
                <Button large block disabled={this.state.disabled} onPress={() => this.startPacerTest()} style={styles.mediumMarginTop}>
                  <H1 style={styles.white}>Start Test</H1>
                </Button>
                <Button large block disabled={this.state.pacerDone} onPress={() => this.handleUndo()} style={styles.mediumMarginTop}>
                  <H1 style={styles.white}>Undo</H1>
                </Button>

                  <Button large block disabled={!this.state.pacerDone}
                          onPress={()=>Actions.result({program:this.props.program, students: this.props.students, event: this.state.event})}
                          style={styles.mediumMarginTop}>
                      <H1 style={styles.white}>See Results</H1>
                  </Button>


              </Content>

            </Container>

        );
    }
}

const mapStateToProps = (state) => ({
    pacerState: state.pacerState,
    eventsState: state.eventsState
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
    },
    //maps to action save pacer data
    savePacerData: (event_id, stats, season) => {
        dispatch(actions.savePacerData(event_id, stats));
    },
    //create an event
    createEvent: (program_id,season) => {
        dispatch(eventActions.createEvent(program_id,season));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PacerContainer);
