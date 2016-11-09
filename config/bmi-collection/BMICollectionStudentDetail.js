const React = require('react');

module.exports = class BMICollectionStudentDetail extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div
                className="bmi-collection-student-detail">
                <span>{this.props.student.id}</span>
                <span>{this.props.student.name}</span>
                <span>{this.props.student.dob}</span>
                <span>{this.props.student.height}</span>
                <span>{this.props.student.weight}</span>
            </div>
        );
    }
};