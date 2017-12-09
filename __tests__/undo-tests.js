import pacerState from '../src/reducers/pacer';
import * as pacerAction from '../src/actions/pacer';


describe('Pacer Undo Feature', () => {
  let state = {
    currentLevel: 0,
    currentShuttle: 1,
    totalShuttles: 0,
    pacerArray: []
  };
  //pass in the action
  state = pacerState(state, pacerAction);
  var sampleArray1 = [0, 0, 0];
  var sampleArray2 = [1, 2, 3, 0, 0];

  it('should return the initial state', () => {
    let reducer1 = pacerState(undefined, {});
    expect(reducer1).toEqual({});
  });

  it('should handle LOAD_PACER_TEST', () => {
    var loadPacerTestResult = pacerAction.loadPacerTest(undefined);
    state = pacerState(state, loadPacerTestResult);
    expect(state.currentLevel).toEqual(1);
    expect(state.currentShuttle).toEqual(0);
    expect(state.totalShuttles).toEqual(0);
    console.log("pacerArray: " + state.pacerArray);
    expect(state.pacerArray.length).toEqual(1);
    var loadPacerTestResult3 = pacerAction.loadPacerTest(3);
    state = pacerState(state, loadPacerTestResult3);
    expect(state.pacerArray.length).toEqual(3);

  });

  it('should handle PACER_ITEM_TAPPED', () => {
    // one set of array
    state.pacerArray = sampleArray1;
    var tapped0 = pacerAction.pacerItemTapped(0);
    state = pacerState(state, tapped0);
    expect(state.currentLevel).toEqual(1);
    expect(state.currentShuttle).toEqual(0);
    expect(state.totalShuttles).toEqual(0);
    expect(state.pacerArray[0]).toEqual(1);
    state = pacerState(state, tapped0);
    expect(state.pacerArray[0]).toEqual(2);
    state = pacerState(state, tapped0);
    console.log("pacerArray: " + state.pacerArray);
    // set #2
    state.pacerArray = sampleArray2;
    var tapped1 = pacerAction.pacerItemTapped(1);
    state = pacerState(state, tapped1);
    expect(state.pacerArray[0]).toEqual(1);
    expect(state.pacerArray[1]).toEqual(3);
    var tapped4 = pacerAction.pacerItemTapped(4);
    state = pacerState(state, tapped4);
    expect(state.pacerArray[4]).toEqual(1);
    console.log("pacerArray: " + state.pacerArray);
  });

  it('should handle PACER_ITEM_LONGPRESS', () => {
    // one set of array
    state.pacerArray = sampleArray2;
    // cancel one tap
    var long0 = pacerAction.pacerItemLongPress(0);
    state = pacerState(state, long0);
    expect(state.pacerArray[0]).toEqual(0);
    // retap the first item
    var tapped0 = pacerAction.pacerItemTapped(0);
    state = pacerState(state, tapped0);
    // cancel tap on the second idem
    var long1 = pacerAction.pacerItemLongPress(1);
    state = pacerState(state, long1);
    expect(state.pacerArray[0]).toEqual(1);
    expect(state.pacerArray[1]).toEqual(1);
  });

  it('should handle TIME_INTERVAL_ELAPSED', () => {
    var incrementTime = pacerAction.timeIntervalElapsed();
    state = pacerState(state, incrementTime);
    expect(state.currentShuttle).toEqual(1);
    expect(state.totalShuttles).toEqual(1);
  });

  it('should handle MAX_SHUTTLES_REACHED', () => {
    var shuttleMaxed = pacerAction.maxShuttlesReached();
    state = pacerState(state, shuttleMaxed);
    state = pacerState(state, shuttleMaxed);
    //increment current level twice, resets current shuttle
    expect(state.currentLevel).toEqual(3);
    expect(state.currentShuttle).toEqual(1);
  });

});
