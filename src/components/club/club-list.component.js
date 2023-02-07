import React, { Component } from "react";
import ClubDataService from "../../services/club.service";
import { Link } from "react-router-dom";

import { MDBContainer, MDBTable, MDBTableHead, MDBTableBody, MDBBadge, MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,MDBRow,
  MDBCol } from 'mdb-react-ui-kit';
  

export default class ClubsList extends Component { 
  
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveAthletes = this.retrieveAthletes.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveClub = this.setActiveClub.bind(this);
    this.removeAllClubs = this.removeAllClubs.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      clubs: [],
      currentClub: null,
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
    ClubDataService.getAll()
      .then(response => {
        this.setState({
          clubs: response.data
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
      currentClub: null,
      currentIndex: -1
    });
  }

  setActiveClub(club, index) {
    this.setState({
      currentClub: club,
      currentIndex: index
    });
  }

  removeAllClubs() {
    ClubDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchName() {
    ClubDataService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
          clubs: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { clubs} = this.state;

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
    //         {clubs &&
    //           clubs.map((club, index) => (
    //             <li
    //               className={
    //                 "list-group-item " +
    //                 (index === currentIndex ? "active" : "")
    //               }
    //               onClick={() => this.setActiveClub(club, index)}
    //               key={index}
    //             >
    //               {club.title}
    //             </li>
    //           ))}
    //       </ul>

    //       <button
    //         className="m-3 btn btn-sm btn-danger"
    //         onClick={this.removeAllClubs}
    //       >
    //         Remove All
    //       </button>
    //     </div>
    //     <div className="col-md-6">
    //       {currentClub ? (
    //         <div>
    //           <h4>Athlete</h4>
    //           <div>
    //             <label>
    //               <strong>Name:</strong>
    //             </label>{" "}
    //             {currentClub.name}
    //           </div>
    //           <div>
    //             <label>
    //               <strong>Date of Birth:</strong>
    //             </label>{" "}
    //             {currentClub.dob}
    //           </div>
    //           <div>
    //             <label>
    //               <strong>Status:</strong>
    //             </label>{" "}
    //             {currentClub.published ? "Published" : "Pending"}
    //           </div>

    //           <Link
    //             to={"/clubs/" + currentClub.id}
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
      <MDBTable>
      {clubs &&
              clubs.map((club, index) => {
                return( 
      <MDBCard style={{ maxWidth: '540px' }}>
      
      <MDBRow className='g-0' key={index}>
        <MDBCol md='4'>
          <MDBCardImage src={require('./logo.jpg')} alt='...' fluid />
        </MDBCol>
        <MDBCol md='8'>
          <MDBCardBody>  
            <MDBCardTitle>{club.clubName}</MDBCardTitle>
            <MDBCardText>
              This is a wider card with supporting text below as a natural lead-in to additional content. This
              content is a little bit longer.
            </MDBCardText>
            <MDBCardText>
              <small className='text-muted'>Last updated 3 mins ago</small>
            </MDBCardText>
            <Link to={`/athletes/club?clubId=${club.clubId}`}>
            <MDBBtn>More details</MDBBtn>
            </Link>

          </MDBCardBody>
        </MDBCol>
      </MDBRow>
    </MDBCard>
                                    )

                                  })}
    </MDBTable>
  </MDBContainer>
    );
  }
}