import React, { Component } from "react";
import TutorialDataService from "../services/athlete.service";

export default class AddAthlete extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDob = this.onChangeDob.bind(this);
    this.saveAthlete = this.saveAthlete.bind(this);
    this.newAthlete = this.newAthlete.bind(this);

    this.state = {
      id: null,
      name: "",
      dob: "", 
      submitted: false
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeDob(e) {
    this.setState({
      dob: e.target.value
    });
  }

  saveAthlete() {
    var data = {
      name: this.state.name,
      dob: this.state.dob
    };

    TutorialDataService.create(data)
      .then(response => {
        this.setState({
          name: response.data.name,
          dob: response.data.dob,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newAthlete() {
    this.setState({
      name: "",
      dob: "",
      submitted: false
    });
  }

  render() {
    return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newAthlete}>
                Add
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  required
                  value={this.state.name}
                  onChange={this.onChangeName}
                  name="name"
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="dob">Dob</label>
                <input
                  type="text"
                  className="form-control"
                  id="dob"
                  required
                  value={this.state.dob}
                  onChange={this.onChangeDob}
                  name="dob"
                />
              </div>
                <br></br>
              <button onClick={this.saveAthlete} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
      );
  }
}