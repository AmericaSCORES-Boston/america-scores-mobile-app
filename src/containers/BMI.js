import React, { Component, PropTypes } from 'react';
import { Container, Content, Button, InputGroup, Input } from 'native-base';

import { Text, Image } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions/login';

import styles from '../styles';

class BMIContainer extends Component {
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
          <Text>BMI Collection will happen here</Text>
        </Content>
      </Container>
    );
  }
}

BMIContainer.propTypes = {
  // fetchSites: PropTypes.func.isRequired,
  bmiData: PropTypes.object.isRequired
};

BMIContainer.defaultProps = {
  bmiData: {}
};

const mapStateToProps = (state) => ({
  bmiData: state.loginState
});

const mapDispatchToProps = (dispatch) => ({
  fetchSites: () => {
    dispatch(actions.fetchSites());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BMIContainer);
