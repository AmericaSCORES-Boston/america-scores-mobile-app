import React, { Component, PropTypes } from 'react';
import { Container, Content, Button, InputGroup, Input } from 'native-base';

import { Text, Image } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions/login';

import styles from '../styles';

class AddStudentContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

    onValueChange (value: string) {
        this.setState({
            selected1 : value
        });
    }


  render() {
    return (
      <Container style={[styles.container, styles.grayBg]}>
        <Content>
          <Text style={styles.textAlignCenter}>To add a student to this program, search by their first and last name, and date of birth.</Text>
          <InputGroup style={styles.inputGroup}>
              <Input placeholder="First Name"/>
          </InputGroup>
          <InputGroup style={styles.inputGroup}>
              <Input placeholder="Last Name"/>
          </InputGroup>

          <Button style={styles.textCenter}>
            Add
          </Button>
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
