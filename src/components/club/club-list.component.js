import React, { Component } from "react";
import AthleteDataService from "../../services/athlete.service";
import { Link } from "react-router-dom";

import { MDBContainer, MDBTable, MDBTableHead, MDBTableBody, MDBBadge, MDBBtn } from 'mdb-react-ui-kit';

export default class ClubsList extends Component { 
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveAthletes = this.retrieveAthletes.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveAthlete = this.setActiveAthlete.bind(this);
    this.removeAllAthletes = this.removeAllAthletes.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      athletes: [],
      currentAthlete: null,
      currentIndex: -1,
      searchName: ""
    };
  }

  componentDidMount() {
    this.retrieveAthletes();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;
    this.setState({
      searchName: searchName
    });
  }

  retrieveAthletes() {
    AthleteDataService.getAll()
      .then(response => {
        this.setState({
          athletes: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveAthletes();
    this.setState({
      currentAthlete: null,
      currentIndex: -1
    });
  }

  setActiveAthlete(athlete, index) {
    this.setState({
      currentAthlete: athlete,
      currentIndex: index
    });
  }

  removeAllAthletes() {
    AthleteDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchName() {
    AthleteDataService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
          athletes: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { athletes} = this.state;
    return (
    //   <div className="list row">
    //     <div className="col-md-8">
    //       <div className="input-group mb-3">
    //         <input
    //           type="text"
    //           className="form-control"
    //           placeholder="Search by name"
    //           value={searchName}
    //           onChange={this.onChangeSearchName}
    //         />
    //         <div className="input-group-append">
    //           <button
    //             className="btn btn-outline-secondary"
    //             type="button"
    //             onClick={this.searchName}
    //           >
    //             Search
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="col-md-6">
    //       <h4>Athletes List</h4>

    //       <ul className="list-group">
    //         {athletes &&
    //           athletes.map((athlete, index) => (
    //             <li
    //               className={
    //                 "list-group-item " +
    //                 (index === currentIndex ? "active" : "")
    //               }
    //               onClick={() => this.setActiveAthlete(athlete, index)}
    //               key={index}
    //             >
    //               {athlete.title}
    //             </li>
    //           ))}
    //       </ul>

    //       <button
    //         className="m-3 btn btn-sm btn-danger"
    //         onClick={this.removeAllAthletes}
    //       >
    //         Remove All
    //       </button>
    //     </div>
    //     <div className="col-md-6">
    //       {currentAthlete ? (
    //         <div>
    //           <h4>Athlete</h4>
    //           <div>
    //             <label>
    //               <strong>Name:</strong>
    //             </label>{" "}
    //             {currentAthlete.name}
    //           </div>
    //           <div>
    //             <label>
    //               <strong>Date of Birth:</strong>
    //             </label>{" "}
    //             {currentAthlete.dob}
    //           </div>
    //           <div>
    //             <label>
    //               <strong>Status:</strong>
    //             </label>{" "}
    //             {currentAthlete.published ? "Published" : "Pending"}
    //           </div>

    //           <Link
    //             to={"/athletes/" + currentAthlete.id}
    //             className="badge badge-warning"
    //           >
    //             Edit
    //           </Link>
    //         </div>
    //       ) : (
    //         <div>
    //           <br />
    //           <p>Please click on a Athlete...</p>
    //         </div>
    //       )}
    //     </div>
    //   </div>
    <MDBContainer fluid>
      
       <Link to={"/add"}>
       <button className="m-3 btn btn-sm btn-success">Add Athlete </button>
        </Link>    
      <button className="m-3 btn btn-sm btn-danger" onClick={this.removeAllAthletes}>Remove All</button>
  </MDBContainer>
    );
  }
}