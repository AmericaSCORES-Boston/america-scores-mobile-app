import React, { Component, PropTypes } from 'react';
import { Container, Content, Button, InputGroup, Input, List, Radio, ListItem } from 'native-base';

import { Text, Image } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions/createAccount';

import styles from '../styles';

class CreateAccountContainer extends Component {
  state = {

  };

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Image style={styles.textCenter} source={require('../img/logo.jpg')} />
          <InputGroup borderType='underline' >
            <Input placeholder='Username' />
          </InputGroup>
          <InputGroup borderType='underline' >
            <Input placeholder='Password' secureTextEntry />
          </InputGroup>
          <InputGroup borderType='underline' >
            <Input placeholder='Confirm Password' secureTextEntry />
          </InputGroup>
          <Button style={[styles.textCenter, styles.loginButton]}>Create Account</Button>
        </Content>
      </Container>
    );
  }
}

CreateAccountContainer.propTypes = {
  // fetchSites: PropTypes.func.isRequired,
  createAccountData: PropTypes.object.isRequired
};

CreateAccountContainer.defaultProps = {
  createAccountData: {}
};

const mapStateToProps = (state) => ({
  createAccountData: state.createAccountState
});

const mapDispatchToProps = (dispatch) => ({
  fetchSites: () => {
    dispatch(actions.fetchSites());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateAccountContainer);
