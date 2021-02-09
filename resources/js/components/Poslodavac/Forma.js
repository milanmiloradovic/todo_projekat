import React, { Component } from "react";
import ReactDOM from "react-dom";

export default class Forma extends Component {
    constructor(props) {
        super(props);

        this.state = {
            izvrsioci: [],
            tipForme: this.props.tipForme || "dodaj",
            zadatak: this.props.zadatak || null
        };
        this.getIzvrsioci();
        this.ispisiFormu = this.ispisiFormu.bind(this);
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
        if (this.state.zadatak) {
            let zadatak = this.state.zadatak;
            zadatak[e.target.name] = value;
            this.setState({ zadatak });
        }
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
    izmeniZadatak() {
        axios
            .put(`http://127.0.0.1:8000/sviZadaci/${this.state.zadatak.id}`, {
                naziv: this.state.zadatak.naziv,
                deadline: this.state.zadatak.deadline,
                users: this.state.selektovaniIzvrsioci
            })
            .then(res => {
                this.props.onUpdate(this.state.zadatak);
            });
    }

    ispisiFormu() {
        if (!this.state.zadatak) {
            return (
                <div
                    class="modal fade"
                    id="exampleModalLong"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLongTitle"
                    aria-hidden="true"
                >
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5
                                    class="modal-title"
                                    id="exampleModalLongTitle"
                                >
                                    Dodaj zadatak
                                </h5>
                                <button
                                    type="button"
                                    class="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <label for="naziv">Naziv zadatka</label>
                                    <input
                                        name="naziv"
                                        onChange={this.handleChange.bind(this)}
                                        className="form-control"
                                        type="text"
                                    ></input>
                                    <label for="deadline">Rok</label>
                                    <input
                                        name="deadline"
                                        onChange={this.handleChange.bind(this)}
                                        className="form-control"
                                        type="date"
                                    ></input>
                                    <label for="selektovaniIzvrsioci">
                                        Izvrsioci
                                    </label>
                                    <select
                                        className="form-control"
                                        name="selektovaniIzvrsioci"
                                        onChange={this.handleChange.bind(this)}
                                        multiple
                                    >
                                        {this.state.izvrsioci.map(i => {
                                            return (
                                                <option value={i.id}>
                                                    {i.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button
                                    type="button"
                                    class="btn btn-secondary"
                                    data-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={this.dodajZadatak.bind(this)}
                                    className="btn btn-success"
                                >
                                    {this.state.tipForme == "izmeni"
                                        ? "Izmeni"
                                        : "Dodaj"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return [
                <td>
                    <input
                        name="naziv"
                        onChange={this.handleChange.bind(this)}
                        className="form-control"
                        value={this.state.zadatak.naziv}
                        type="text"
                    ></input>
                </td>,
                <td>
                    <input
                        name="deadline"
                        onChange={this.handleChange.bind(this)}
                        className="form-control"
                        value={this.state.zadatak.deadline}
                        type="date"
                    ></input>
                </td>,
                <td>
                    <select
                        className="form-control"
                        name="selektovaniIzvrsioci"
                        onChange={this.handleChange.bind(this)}
                        multiple
                    >
                        {this.state.izvrsioci.map(i => {
                            let isSelected = false;
                            if (
                                this.state.zadatak.assignments.find(
                                    a => a.assigned_to.id == i.id
                                )
                            )
                                isSelected = true;
                            return (
                                <option selected={isSelected} value={i.id}>
                                    {i.name}
                                </option>
                            );
                        })}
                    </select>
                </td>,
                <td>
                    <button
                        onClick={this.izmeniZadatak.bind(this)}
                        className="btn btn-success btn-block"
                    >
                        {this.state.tipForme == "izmeni" ? "Izmeni" : "Dodaj"}
                    </button>
                </td>
            ];
        }
    }

    render() {
        return this.ispisiFormu();
    }
}

if (document.getElementById("forma")) {
    ReactDOM.render(<Forma />, document.getElementById("forma"));
}
