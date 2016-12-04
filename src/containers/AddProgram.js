import React, { Component, PropTypes } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, ListView, Text, StyleSheet } from 'react-native';
import { Container, Content, List, ListItem, InputGroup, Input, H3, Button, H1, } from 'native-base';

import { connect } from 'react-redux';
import * as actions from '../actions/program';

import scoresTheme from '../themes/scoresTheme';
import styles from '../styles';

class AddProgramContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newProgramName: ''
    };
  }

  createProgram() {
    this.props.addProgram(this.props.site_id, this.state.newProgramName);
    Actions.pop();
  }

  render() {
    return (
      <Container style={[styles.container, styles.containerPadding]}>
          <Content theme={scoresTheme}>
            <H3 style={styles.textAlignCenter}>A program is a collection of students at this site.</H3>
            <H3 style={styles.textAlignCenter}>Create a new program by giving it a name below (make it identifiable).</H3>
            <InputGroup style={[styles.mediumMarginTop, styles.inputGroup]}>
                <Input placeholder="Program Name" onChangeText={(newProgramName) => this.setState({newProgramName})}/>
            </InputGroup>
            <View style={styles.mediumMarginTop}>
              <Button large block disabled={!this.state.newProgramName} onPress={() => this.createProgram()} style={styles.smallVerticalMargin}>
                <H1 style={styles.white}>Create</H1>
              </Button>
            </View>
          </Content>
      </Container>
    );
  }
}

AddProgramContainer.propTypes = {
  addProgramData: PropTypes.object.isRequired
};

AddProgramContainer.defaultProps = {
  addProgramData: {}
};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  addProgram: (site_id, program_name) => {
    dispatch(actions.addProgram(site_id, program_name));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddProgramContainer);
