import React, { Component, PropTypes } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, ListView, Text, StyleSheet } from 'react-native';
import { Container, Content, List, ListItem } from 'native-base';

import { connect } from 'react-redux';
import * as actions from '../actions/program';

import styles from '../styles';

class ProgramsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: []
    }
  }

  componentDidMount() {
    this.props.fetchPrograms(this.props.site_id);
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
                <ListItem button onPress={()=>Actions.students({title: rowData.site_name, site_id: rowData.site_id})}>
                  <Text>{rowData.site_name}</Text>
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
