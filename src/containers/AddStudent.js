import React, { Component, PropTypes } from 'react';
import { Container, Content, Button, InputGroup, Input } from 'native-base';

import { Text, Image } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions/login';

import styles from '../styles';

class AddStudentContainer extends Component {
  state = {

  };

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    return (
      <Container style={[styles.container, styles.containerPadding]}>
        <Content>
          <Text style={styles.textAlignCenter}>To add a student to this program, search by their first and last name, and date of birth.</Text>
        </Content>
      </Container>
    );
  }
}

AddStudentContainer.propTypes = {
  // fetchSites: PropTypes.func.isRequired,
  loginData: PropTypes.object.isRequired
};

AddStudentContainer.defaultProps = {
  loginData: {}
};

const mapStateToProps = (state) => ({
  loginData: state.loginState
});

const mapDispatchToProps = (dispatch) => ({
  fetchSites: () => {
    dispatch(actions.fetchSites());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddStudentContainer);
