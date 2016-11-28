import React, { Component, PropTypes } from 'react';
import { Actions } from 'react-native-router-flux';
import { Text } from 'react-native';
import { Container, Content, List, ListItem } from 'native-base';

import { connect } from 'react-redux';
import * as actions from '../actions/program';

import styles from '../styles';

class ProgramsContainer extends Component {
  constructor(props) {
    super(props);
    this.props.fetchPrograms(this.props.site_id);
    this.state = {
      dataSource: []
    }
    this.props.component.onRight = () => {
      Actions.addProgram({site_id: this.props.site_id});
    }
    this.props.component.rightTitle = 'Add';
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: nextProps.programData.programs
    });
  }

  render() {
    return (
      <Container style={styles.container}>
          <Content>
            <List
              dataArray={this.state.dataSource}
              renderRow={(rowData) =>
                <ListItem button onPress={()=>Actions.students({title: rowData.program_name, program_id: rowData.program_id})}>
                  <Text>{rowData.program_name}</Text>
                </ListItem>
              }
            />
          </Content>
      </Container>
    );
  }
}

ProgramsContainer.propTypes = {
  fetchPrograms: PropTypes.func.isRequired,
  programData: PropTypes.object.isRequired
};

ProgramsContainer.defaultProps = {
  programData: {}
};

const mapStateToProps = (state) => ({
  programData: state.programsState
});

const mapDispatchToProps = (dispatch) => ({
  fetchPrograms: (site_id) => {
    dispatch(actions.fetchPrograms(site_id));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgramsContainer);
