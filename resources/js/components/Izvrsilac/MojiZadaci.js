import React, { Component } from "react";
import ReactDOM from "react-dom";
import Zadatak from "./Zadatak";
import {} from "../style.css";
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
            <table className="table table-hover table-info table-striped header-fixed">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">Naziv zadatka</th>
                        <th scope="col">Deadline</th>
                        <th scope="col">Zavrsen</th>
                        <th scope="col">Zadao</th>
                        <th scope="col">Email</th>
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
