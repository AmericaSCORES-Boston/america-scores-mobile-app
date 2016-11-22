import React, { Component, PropTypes } from 'react';
import { Container, Content, Button, InputGroup, Input } from 'native-base';

import { Text, Image } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions/login';

import styles from '../styles';

class LoginContainer extends Component {
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
          <Button style={[styles.textCenter, styles.loginButton]}>Login</Button>
        </Content>
      </Container>
    );
  }
}

LoginContainer.propTypes = {
  // fetchSites: PropTypes.func.isRequired,
  loginData: PropTypes.object.isRequired
};

LoginContainer.defaultProps = {
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
)(LoginContainer);
