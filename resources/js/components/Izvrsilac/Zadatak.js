import React, { Component } from "react";
import ReactDOM from "react-dom";

export default class Zadatak extends Component {
    constructor(props) {
        super(props);

        this.state = {
            zadatak: this.props.zadatak.zadatak,
            assignedBy: this.props.zadatak.zadatak.assigned_by
        };
        this.isFinished = this.isFinished.bind(this);
    }
    zavrsiZadatak() {
        axios
            .put(`http://127.0.0.1:8000/mojiZadaci/${this.state.zadatak.id}`)
            .then(res => {
                let zadatak = this.state.zadatak;
                zadatak.finished = true;
                this.setState({ zadatak });
            });
    }

    isFinished() {
        return this.state.zadatak.finished ? "green" : "red";
    }

    render() {
        return (
            <tr>
                <td>{this.state.zadatak.naziv}</td>
                <td>{this.state.zadatak.deadline}</td>
                <td
                    align="center"
                    style={{ color: `${this.isFinished()}`, cursor: "pointer" }}
                    onClick={this.zavrsiZadatak.bind(this)}
                >
                    {this.state.zadatak.finished ? "✓" : "✘"}
                </td>
                <td>{this.state.assignedBy.name}</td>
                <td>{this.state.assignedBy.email}</td>
                <td>
                    <a
                        href={`http://127.0.0.1:8000/mojiZadaci/${this.state.zadatak.id}`}
                    >
                        Pregled
                    </a>
                </td>
            </tr>
        );
    }
}

if (document.getElementById("zadatak")) {
    ReactDOM.render(<Zadatak />, document.getElementById("zadatak"));
}
