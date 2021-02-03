import React, { Component } from "react";
import ReactDOM from "react-dom";
import Zadatak from "./Zadatak";
import Forma from "./Forma";

export default class SviZadaci extends Component {
    constructor(props) {
        super(props);

        this.state = {
            zadaci: this.props.zadaci
        };
    }

    handleDelete(id) {
        const id_zadatka = id;
        this.setState(state => {
            console.log(state.zadaci, id_zadatka);
            return { zadaci: state.zadaci.filter(z => z.id != id_zadatka) };
        });
    }
    handleSubmit(noviZadatak) {
        this.setState(state => {
            let zadaci = state.zadaci;
            zadaci.push(noviZadatak);
            return { zadaci: zadaci };
        });
    }

    render() {
        return [
            <table className="table table-warning table-bordered">
                <thead className="thead-light">
                    <tr>
                        <th>Naziv zadatka</th>
                        <th>Deadline</th>
                        <th>Zavrsen</th>
                        <th>Izvrsioci</th>
                        <th>Akcije</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.zadaci.map(z => {
                        return (
                            <Zadatak
                                onDelete={this.handleDelete.bind(this)}
                                key={z.id}
                                zadatak={z}
                            />
                        );
                    })}
                </tbody>
            </table>,
            <Forma onSubmit={this.handleSubmit.bind(this)} />
        ];
    }
}

if (document.getElementById("svizadaci")) {
    const element = document.getElementById("svizadaci");

    const zadaci = JSON.parse(element.dataset.zadaci);

    ReactDOM.render(
        <SviZadaci zadaci={zadaci} />,
        document.getElementById("svizadaci")
    );
}
