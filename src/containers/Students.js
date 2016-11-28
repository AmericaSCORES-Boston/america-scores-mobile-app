import React, { Component, PropTypes } from 'react';
import { Actions } from 'react-native-router-flux';
import { Text } from 'react-native';
import { Container, Content, List, ListItem, Footer, FooterTab, Button } from 'native-base';

import { connect } from 'react-redux';
import * as actions from '../actions/student';

import styles from '../styles';

class StudentsContainer extends Component {
  constructor(props) {
    super(props);
    this.props.fetchStudents(this.props.program_id);
    this.state = {
      dataSource: []
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: nextProps.studentData.students
    });
  }

  render() {
    return (
      <Container style={styles.container}>
          <Content>
            <List
              dataArray={this.state.dataSource}
              renderRow={(rowData) => 
                <ListItem button onPress={()=>Actions.individualStudent({title: rowData.first_name + ' ' + rowData.last_name, student: rowData})}>
                  <Text>{rowData.first_name + ' ' + rowData.last_name}</Text>
                </ListItem>
              }
            />
          </Content>
          <Footer>
            <FooterTab>
              <Button onPress={()=>Actions.pacer()}>
                Pacer Test
              </Button>
              <Button onPress={()=>Actions.bmi()}>
                BMI Collection
              </Button>
            </FooterTab>
          </Footer>
      </Container>
    );
  }
}

StudentsContainer.propTypes = {
  fetchStudents: PropTypes.func.isRequired,
  studentData: PropTypes.object.isRequired
};

StudentsContainer.defaultProps = {
  studentData: {}
};

const mapStateToProps = (state) => ({
  studentData: state.studentsState
});

const mapDispatchToProps = (dispatch) => ({
  fetchStudents: (program_id) => {
    dispatch(actions.fetchStudents(program_id));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentsContainer);
