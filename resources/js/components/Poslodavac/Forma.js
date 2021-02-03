import React, { Component } from "react";
import ReactDOM from "react-dom";

export default class Forma extends Component {
    constructor(props) {
        super(props);

        this.state = {
            izvrsioci: []
        };
        this.getIzvrsioci();
    }
    getIzvrsioci() {
        axios.get("http://127.0.0.1:8000/users/get").then(res => {
            let izvrsioci = res.data.izvrsioci;
            this.setState({ izvrsioci });
        });
    }
    getIzvrsioci() {
        axios.get("http://127.0.0.1:8000/users/get").then(res => {
            let izvrsioci = res.data.izvrsioci;
            this.setState({ izvrsioci });
        });
    }
    handleChange(e) {
        let value;
        if (e.target.type == "select-multiple") {
            value = Array.from(
                e.target.selectedOptions,
                option => option.value
            );
        } else value = e.target.value;

        this.setState({ [e.target.name]: value });
    }

    dodajZadatak() {
        axios
            .post(`http://127.0.0.1:8000/sviZadaci`, {
                naziv: this.state.naziv,
                deadline: this.state.deadline,
                users: this.state.selektovaniIzvrsioci
            })
            .then(res => {});
    }

    render() {
        return (
            <table className="table table-warning table-bordered">
                <thead className="thead-light">
                    <tr>
                        <th>Naziv zadatka</th>
                        <th>Deadline</th>
                        <th>Izvrsioci</th>
                        <th>Dodaj!</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input
                                name="naziv"
                                onChange={this.handleChange.bind(this)}
                                className="form-control"
                                type="text"
                            ></input>
                        </td>
                        <td>
                            <input
                                name="deadline"
                                onChange={this.handleChange.bind(this)}
                                className="form-control"
                                type="date"
                            ></input>
                        </td>
                        <td>
                            <select
                                className="form-control"
                                name="selektovaniIzvrsioci"
                                onChange={this.handleChange.bind(this)}
                                multiple
                            >
                                {this.state.izvrsioci.map(i => {
                                    return (
                                        <option value={i.id}>{i.name}</option>
                                    );
                                })}
                            </select>
                        </td>
                        <td>
                            <button
                                onClick={this.dodajZadatak.bind(this)}
                                className="btn btn-success btn-block"
                            >
                                Dodaj
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

if (document.getElementById("forma")) {
    ReactDOM.render(<Forma />, document.getElementById("forma"));
}
