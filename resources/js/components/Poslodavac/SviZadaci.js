import React, { Component } from "react";
import ReactDOM from "react-dom";
import Zadatak from "./Zadatak";
import Forma from "./Forma";
import {} from "../style.css";
export default class SviZadaci extends Component {
    constructor(props) {
        super(props);

        this.state = {
            zadaci: this.props.zadaci,
            sorted: true
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

    sortByDate() {
        this.setState(state => {
            return {
                zadaci: state.zadaci.sort((a, b) => {
                    if (state.sorted === true) {
                        return (
                            new Date(a.deadline).getTime() -
                            new Date(b.deadline).getTime()
                        );
                    } else {
                        return (
                            new Date(b.deadline).getTime() -
                            new Date(a.deadline).getTime()
                        );
                    }
                })
            };
        });
        this.setState({ sorted: !this.state.sorted });
    }

    render() {
        return [
            <button
                type="button"
                class="btn btn-primary dodajNoviZadatakDugme shadow"
                data-toggle="modal"
                data-target="#exampleModalLong"
            >
                +
            </button>,
            <div className="">
                <table className="table table-hover table-info table-striped header-fixed">
                    <thead className="thead-fixed thead-light">
                        <tr>
                            <th>Naziv zadatka</th>
                            <th
                                style={{ cursor: "pointer" }}
                                onClick={this.sortByDate.bind(this)}
                            >
                                Deadline <i className="fas fa-sort"></i>
                            </th>
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
                </table>
            </div>,
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
