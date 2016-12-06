import React, { Component, PropTypes } from 'react';
import { Container, Content, Button, InputGroup, Input, H1 } from 'native-base';

import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as actions from '../actions/login';

import scoresTheme from '../themes/scoresTheme';
import styles from '../styles';

class LoginContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loginData.user) {
      Actions.sites();
    }
  }

  login() {
    this.props.loginUser();
  }

  render() {
    return (
      <Container style={[styles.container, styles.containerPadding]}>
        <Content theme={scoresTheme}>
          <Image style={styles.textCenter} source={require('../img/logo.jpg')} />
          <View style={styles.mediumMarginTop}>
            <Button large block onPress={() => this.login()}>
              <H1 style={styles.white}>Login</H1>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

LoginContainer.propTypes = {
  loginData: PropTypes.object.isRequired
};

LoginContainer.defaultProps = {
  loginData: {}
};

const mapStateToProps = (state) => ({
  loginData: state.loginState
});

const mapDispatchToProps = (dispatch) => ({
  loginUser: () => {
    dispatch(actions.loginUser());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);
