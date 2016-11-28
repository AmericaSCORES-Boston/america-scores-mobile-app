import React, { Component, PropTypes } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, ListView, Text, StyleSheet } from 'react-native';
import { Container, Content, List, ListItem } from 'native-base';

import { connect } from 'react-redux';
import * as actions from '../actions/program';

import styles from '../styles';

class ProgramsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = props.programsState;
  }

  componentWillMount() {
    this.props.fetchPrograms(this.props.site_id);
  }

  componentWillReceiveProps(nextProps) {
    const newProgramsState = nextProps.programsState;
    if (newProgramsState && newProgramsState.programs) {
      this.state = newProgramsState;
    }
  }

  render() {
    return (
      <Container style={styles.container}>
          <Content>
            <List
              dataArray={this.state.programs}
              renderRow={(rowData) =>
                <ListItem button onPress={()=>Actions.students({title: rowData.program_name, program_id: rowData.program_id})}>
                  <Text>{rowData.program_name}</Text>
                </ListItem>
              }
            />
          </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  programsState: state.programsState
});

const mapDispatchToProps = (dispatch) => ({
  fetchPrograms: (site_id) => {
    dispatch(actions.fetchPrograms(site_id));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgramsContainer);
