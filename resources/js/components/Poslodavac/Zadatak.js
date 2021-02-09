import React, { Component } from "react";
import ReactDOM from "react-dom";
import Assignment from "./Assignment";
import Forma from "./Forma";

export default class Zadatak extends Component {
    constructor(props) {
        super(props);

        this.state = {
            zadatak: this.props.zadatak,
            assignments: this.props.zadatak.assignments,
            formaIzmena: false,
            tipForme: "izmeni"
        };
        this.isFinished = this.isFinished.bind(this);
        this.formaIzmena = this.formaIzmena.bind(this);
        this.prikazZadataka = this.prikazZadataka.bind(this);
    }
    zavrsiZadatak() {
        axios
            .put(`http://127.0.0.1:8000/sviZadaci/${this.state.zadatak.id}`)
            .then(res => {
                let zadatak = this.state.zadatak;
                zadatak.finished = true;
                this.setState({ zadatak });
            });
    }
    izbrisiZadatak() {
        axios
            .delete(`http://127.0.0.1:8000/sviZadaci/${this.state.zadatak.id}`)
            .then(res => {
                if (res.data.code == true) {
                    this.props.onDelete(this.state.zadatak.id);
                } else alert("Greska prilikom brisanja!");
            });
    }

    isFinished() {
        return this.state.zadatak.finished ? "green" : "red";
    }
    formaIzmena() {
        this.setState({ formaIzmena: !this.state.formaIzmena });
    }

    updateHandler(zadatak) {
        this.setState({ zadatak, formaIzmena: false });
    }

    prikazZadataka() {
        if (!this.state.formaIzmena) {
            return (
                <tr className="d-flex">
                    <td>{this.state.zadatak.naziv}</td>
                    <td>{this.state.zadatak.deadline}</td>
                    <td
                        align="center"
                        style={{
                            color: `${this.isFinished()}`,
                            cursor: "pointer"
                        }}
                        onClick={this.zavrsiZadatak.bind(this)}
                    >
                        {this.state.zadatak.finished ? "✓" : "✘"}
                    </td>

                    <td align="center">
                        <ul className="text-left">
                            {this.state.assignments.length
                                ? this.state.assignments.map(a => {
                                      return [<Assignment assignment={a} />];
                                  })
                                : "Nema izvrsioca"}
                        </ul>
                    </td>
                    <td>
                        <div className="dropdown">
                            <button
                                className="btn dropdown-toggle"
                                type="button"
                                id="akcijeMeni"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                Upravljanje
                            </button>
                            <div
                                className="dropdown-menu"
                                aria-labelledby="akcijeMeni"
                            >
                                <button
                                    onClick={this.izbrisiZadatak.bind(this)}
                                    className="dropdown-item"
                                >
                                    Izbrisi
                                </button>
                                <button
                                    onClick={this.formaIzmena}
                                    className="dropdown-item"
                                >
                                    Izmeni
                                </button>
                                <a
                                    className="dropdown-item"
                                    href={`http://127.0.0.1:8000/sviZadaci/${this.state.zadatak.id}`}
                                >
                                    Pregled
                                </a>
                            </div>
                        </div>
                    </td>
                </tr>
            );
        } else {
            return (
                <tr className="d-flex">
                    <Forma
                        onUpdate={this.updateHandler.bind(this)}
                        tipForme={this.state.tipForme}
                        zadatak={this.state.zadatak}
                    />
                    <td>
                        <div className="dropdown">
                            <button
                                className="btn dropdown-toggle"
                                type="button"
                                id="akcijeMeni"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                Upravljanje
                            </button>
                            <div
                                className="dropdown-menu"
                                aria-labelledby="akcijeMeni"
                            >
                                <button
                                    onClick={this.izbrisiZadatak.bind(this)}
                                    className="dropdown-item"
                                >
                                    Izbrisi
                                </button>
                                <button
                                    onClick={this.formaIzmena}
                                    className="dropdown-item"
                                >
                                    Izmeni
                                </button>
                                <a
                                    className="dropdown-item"
                                    href={`http://127.0.0.1:8000/sviZadaci/${this.state.zadatak.id}`}
                                >
                                    Pregled
                                </a>
                            </div>
                        </div>
                    </td>
                </tr>
            );
        }
    }

    render() {
        return this.prikazZadataka();
    }
}

if (document.getElementById("zadatak")) {
    ReactDOM.render(<Zadatak />, document.getElementById("zadatak"));
}
