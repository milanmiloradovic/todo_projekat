import React, { Component } from "react";
import ReactDOM from "react-dom";

export default class MojiZadaci extends Component {
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">
                                MojiZadaci Component
                            </div>

                            <div className="card-body">
                                I'm an mojizadaci component!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById("mojizadaci")) {
    const element = document.getElementById("iznajmljivanja");
    ReactDOM.render(<MojiZadaci />, document.getElementById("mojizadaci"));
}
