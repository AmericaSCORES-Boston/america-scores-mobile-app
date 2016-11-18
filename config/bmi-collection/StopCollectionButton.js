const React = require('react');

module.exports = class StopCollectionButton extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <button className="stop-collection">Stop</button>
        );
    }

};