import React, { Component } from "react";
import AthleteDataService from "../services/athlete.service";
import { withRouter } from '../common/with-router';
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBProgress,
    MDBProgressBar,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem
  } from 'mdb-react-ui-kit';

class Name extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDob = this.onChangeDob.bind(this);
    this.getName = this.getName.bind(this);
    this.getAthlete = this.getAthlete.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateName = this.updateName.bind(this);
    this.deleteName = this.deleteName.bind(this);

    this.state = {
      currentName: {
        id: null,
        name: "",
        dob: "",
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getName(this.props.router.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentName: {
          ...prevState.currentName,
          name: name
        }
      };
    });
  }

  onChangeDob(e) {
    const dob = e.target.value;
    
    this.setState(prevState => ({
      currentName: {
        ...prevState.currentName,
        dob: dob
      }
    }));
  }

  getName(id) {
    AthleteDataService.get(id)
      .then(response => {
        this.setState({
          currentName: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  getAthlete(id) {
    console.log(id);
    AthleteDataService.get(id)
      .then(response => {
        this.setState({
          currentName: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentName.id,
      name: this.state.currentName.name,
      dob: this.state.currentName.dob,
      published: status
    };

    AthleteDataService.update(this.state.currentName.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentName: {
            ...prevState.currentName,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateName() {
    AthleteDataService.update(
      this.state.currentName.id,
      this.state.currentName
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The athlete was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteName() {    
    AthleteDataService.delete(this.state.currentName.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/athletes');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentName } = this.state;

    return (
    //   <div>
    //     {currentName ? (
    //       <div className="edit-form">
    //         <h4>Name</h4>
    //         <form>
    //           <div className="form-group">
    //             <label htmlFor="name">Name</label>
    //             <input
    //               type="text"
    //               className="form-control"
    //               id="name"
    //               value={currentName.name}
    //               onChange={this.onChangeName}
    //             />
    //           </div>
    //           <div className="form-group">
    //             <label htmlFor="dob">Dob</label>
    //             <input
    //               type="text"
    //               className="form-control"
    //               id="dob"
    //               value={currentName.dob}
    //               onChange={this.onChangeDob}
    //             />
    //           </div>

    //           <div className="form-group">
    //             <label>
    //               <strong>Status:</strong>
    //             </label>
    //             {currentName.published ? "Published" : "Pending"}
    //           </div>
    //         </form>

    //         {currentName.published ? (
    //           <button
    //             className="badge badge-primary mr-2"
    //             onClick={() => this.updatePublished(false)}
    //           >
    //             UnPublish
    //           </button>
    //         ) : (
    //           <button
    //             className="badge badge-primary mr-2"
    //             onClick={() => this.updatePublished(true)}
    //           >
    //             Publish
    //           </button>
    //         )}

    //         <button
    //           className="badge badge-danger mr-2"
    //           onClick={this.deleteName}
    //         >
    //           Delete
    //         </button>

    //         <button
    //           type="submit"
    //           className="badge badge-success"
    //           onClick={this.updateName}
    //         >
    //           Update
    //         </button>
    //         <p>{this.state.message}</p>
    //       </div>
    //     ) : (
    //       <div>
    //         <br />
    //         <p>Please click on a Name...</p>
    //       </div>
    //     )}
    //   </div>
    <MDBContainer className="py-5">
     <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
                <p className="text-muted mb-4">{currentName.name}</p>
                <div className="d-flex justify-content-center mb-2">
                  <MDBBtn>Follow</MDBBtn>
                  <MDBBtn outline className="ms-1">Message</MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">
                  {/* <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fas icon="globe fa-lg text-warning" />
                    <MDBCardText>https://mdbootstrap.com</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fab icon="github fa-lg" style={{ color: '#333333' }} />
                    <MDBCardText>mdbootstrap</MDBCardText>
                  </MDBListGroupItem> */}
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fab icon="twitter fa-lg" style={{ color: '#55acee' }} />
                    <MDBCardText>Twitter page</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fab icon="instagram fa-lg" style={{ color: '#ac2bac' }} />
                    <MDBCardText>Instagram page</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fab icon="facebook fa-lg" style={{ color: '#3b5998' }} />
                    <MDBCardText>Facebook page</MDBCardText>
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{currentName.name}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Parent's name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">Someone's Name</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">example@example.com</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">(097) 234-5678</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Mobile</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">(098) 765-4321</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">Bay Area, San Francisco, CA</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

            <MDBRow>
              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">Scout</span></MDBCardText>
                    <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Games played</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Different positions played</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                    </MDBProgress>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status</MDBCardText>
                    <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                    </MDBProgress>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow> 
    </MDBContainer>
    );
  }
}

export default withRouter(Name);