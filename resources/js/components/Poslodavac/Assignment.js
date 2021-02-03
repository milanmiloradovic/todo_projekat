import React, { Component } from "react";
import ReactDOM from "react-dom";

export default class Assignment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            assignment: this.props.assignment
        };
        // this.isFinished = this.isFinished.bind(this);
    }
    // zavrsiZadatak() {
    //     axios
    //         .put(`http://127.0.0.1:8000/sviZadaci/${this.state.zadatak.id}`)
    //         .then(res => {
    //             let zadatak = this.state.zadatak;
    //             zadatak.finished = true;
    //             this.setState({ zadatak });
    //         });
    // }

    // isFinished() {
    //     return this.state.zadatak.finished ? "green" : "red";
    // }

    render() {
        return <b>{this.state.assignment.assigned_to.name}</b>;
    }
}

if (document.getElementById("assignment")) {
    ReactDOM.render(<Assignment />, document.getElementById("assignment"));
}
