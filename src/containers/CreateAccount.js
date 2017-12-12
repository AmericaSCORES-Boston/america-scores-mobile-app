import React, { Component, PropTypes } from 'react';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Button, InputGroup, Input, List, Radio, ListItem, H1 } from 'native-base';

import { View, Alert, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions/createAccount';

import scoresTheme from '../themes/scoresTheme';
import styles from '../styles';

class CreateAccountContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'email': '',
      'username': '',
      'password': '',
      'confirmPassword': '',
      'first_name': '',
      'last_name': ''
    };
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.createAccountData) {
      Actions.login();
    }
  }

  createAccount() {
    if (!this.state.email || !this.validateEmail(this.state.email)) {
      Alert.alert('Email address is required.');
      return;
    }
    if (!this.state.username) {
      Alert.alert('Username is required.');
      return;
    }
    if (!this.state.first_name || !this.state.last_name) {
      Alert.alert('First & last name are required.');
      return;
    }
    if (!this.state.password || !this.state.confirmPassword || !this.validatePassword(this.state.password)) {
      Alert.alert('Password Required,At least one Upper case, Lower case, Digit, Special Character(@#$%^&*) and Minimum Length 8');
      return;
    }
    if(this.state.password !== this.state.confirmPassword){
      Alert.alert('Passwords don\'t match');
      return
    }
    this.props.createAccount(this.state.email, this.state.username, this.state.password, this.state.first_name, this.state.last_name);
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validatePassword(pass){
      var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#\$%\^&\*])(?=.{8,})");
      var result = strongRegex.test(pass);
      return result;
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content theme={scoresTheme}>
          <Image style={styles.textCenter} source={require('../img/logo2.png')} />
          <InputGroup borderType='underline'>
            <Input autoFocus={true} autoCapitalize="none" keyboardType="email-address" placeholder='Email Address' onChangeText={(email) => this.setState({email})} />
          </InputGroup>
          <InputGroup borderType='underline'>
            <Input autoCapitalize="none" placeholder='Username' onChangeText={(username) => this.setState({username})} />
          </InputGroup>
          <InputGroup borderType='underline'>
            <Input placeholder='First Name' onChangeText={(first_name) => this.setState({first_name})} />
          </InputGroup>
          <InputGroup borderType='underline'>
            <Input placeholder='Last Name' onChangeText={(last_name) => this.setState({last_name})} />
          </InputGroup>
          <InputGroup borderType='underline'>
            <Input autoCapitalize="none" placeholder='Password' secureTextEntry onChangeText={(password) => this.setState({password})} />
          </InputGroup>
          <InputGroup borderType='underline'>
            <Input autoCapitalize="none" placeholder='Confirm Password' secureTextEntry onChangeText={(confirmPassword) => this.setState({confirmPassword})} />
          </InputGroup>
          <View style={styles.mediumMarginTop}>
            <Button large block style={[styles.textCenter]} onPress={() => this.createAccount()}>
              <H1 style={styles.white}>Create Account</H1>
            </Button>
          </View>
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
