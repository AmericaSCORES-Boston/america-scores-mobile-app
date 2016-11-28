import React, { Component, PropTypes } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, ListView, Text, StyleSheet } from 'react-native';
import { Container, Content, List, ListItem, InputGroup, Input } from 'native-base';

import { connect } from 'react-redux';
import * as actions from '../actions/program';

import styles from '../styles';

class AddProgramContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newProgramName: ''
    };
    this.props.component.onRight = () => {
      this.props.addProgram(this.props.site_id, this.state.newProgramName);
      Actions.pop();
    };
    this.props.component.rightTitle = 'Done';
  }

  render() {
    return (
      <Container style={[styles.container, styles.grayBg]}>
          <Content>
            <InputGroup style={[styles.mediumMarginTop, styles.inputGroup]}>
                <Input placeholder="Program Name" onChangeText={(newProgramName) => this.setState({newProgramName})}/>
            </InputGroup>
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
