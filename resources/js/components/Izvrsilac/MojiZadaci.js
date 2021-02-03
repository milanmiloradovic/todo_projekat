import React, { Component } from "react";
import ReactDOM from "react-dom";
import Zadatak from "./Zadatak";

export default class MojiZadaci extends Component {
    constructor(props) {
        super(props);

        this.state = {
            zadaci: this.props.zadaci
        };
    }

    render() {
        console.log(this.state.zadaci);
        return (
            <table className="table table-warning table-bordered">
                <thead className="thead-light">
                    <tr>
                        <th>Naziv zadatka</th>
                        <th>Deadline</th>
                        <th>Zavrsen</th>
                        <th>Zadao</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.zadaci.map(z => {
                        return <Zadatak key={z.id} zadatak={z} />;
                    })}
                </tbody>
            </table>
        );
    }
}

if (document.getElementById("mojizadaci")) {
    const element = document.getElementById("mojizadaci");

    const zadaci = JSON.parse(element.dataset.zadaci);

    ReactDOM.render(
        <MojiZadaci zadaci={zadaci} />,
        document.getElementById("mojizadaci")
    );
}
