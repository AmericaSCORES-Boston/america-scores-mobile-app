import React, { Component, PropTypes } from 'react';
import { Container, Content, Button, InputGroup, Input } from 'native-base';

import { Text, Image } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions/login';

import styles from '../styles';

class PacerContainer extends Component {
  state = {

  };

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    return (
      <Container style={[styles.container, styles.grayBg]}>
        <Content>
          <Text>Pacer Test will happen here</Text>
        </Content>
      </Container>
    );
  }
}

PacerContainer.propTypes = {
  // fetchSites: PropTypes.func.isRequired,
  pacerData: PropTypes.object.isRequired
};

PacerContainer.defaultProps = {
  pacerData: {}
};

const mapStateToProps = (state) => ({
  pacerData: state.loginState
});

const mapDispatchToProps = (dispatch) => ({
  fetchSites: () => {
    dispatch(actions.fetchSites());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PacerContainer);
