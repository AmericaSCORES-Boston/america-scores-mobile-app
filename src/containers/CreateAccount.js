import React, { Component, PropTypes } from 'react';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Button, InputGroup, Input, List, Radio, ListItem } from 'native-base';

import { Text, Image } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions/createAccount';

import styles from '../styles';

class CreateAccountContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'email': '',
      'username': '',
      'password': '',
      'first_name': '',
      'last_name': ''
    };
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Image style={styles.textCenter} source={require('../img/logo.jpg')} />
          <InputGroup borderType='underline' >
            <Input placeholder='Username' onChangeText={(username) => this.setState({username})} />
          </InputGroup>
          <InputGroup borderType='underline' >
            <Input placeholder='Email Address' onChangeText={(email) => this.setState({email})} />
          </InputGroup>
          <InputGroup borderType='underline' >
            <Input placeholder='First Name' onChangeText={(first_name) => this.setState({first_name})} />
          </InputGroup>
          <InputGroup borderType='underline' >
            <Input placeholder='Last Name' onChangeText={(last_name) => this.setState({last_name})} />
          </InputGroup>
          <InputGroup borderType='underline' >
            <Input placeholder='Password' secureTextEntry onChangeText={(password) => this.setState({password})} />
          </InputGroup>
          <InputGroup borderType='underline' >
            <Input placeholder='Confirm Password' secureTextEntry onChangeText={(newProgramName) => this.setState({newProgramName})} />
          </InputGroup>
          <Button style={[styles.textCenter, styles.loginButton]} onPress={() => this.props.createAccount(this.state.email, this.state.username, this.state.password, this.state.first_name, this.state.last_name)}>Create Account</Button>
        </Content>
      </Container>
    );
  }
}

CreateAccountContainer.propTypes = {
  createAccount: PropTypes.func.isRequired,
  createAccountData: PropTypes.object.isRequired
};

CreateAccountContainer.defaultProps = {
  createAccountData: {}
};

const mapStateToProps = (state) => ({
  createAccountData: state.createAccountState
});

const mapDispatchToProps = (dispatch) => ({
  createAccount: (email, username, password, first_name, last_name) => {
    dispatch(actions.createAccount(email, username, password, first_name, last_name));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateAccountContainer);
