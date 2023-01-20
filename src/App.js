import './App.css';
import React, { Component }from 'react';
import { Routes, Route, Link } from "react-router-dom";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
} from 'mdb-react-ui-kit';

import AddAthlete from "./components/add-athlete.component";
import Athlete from "./components/athlete-component";
import AthletesList from "./components/athlete-list.component";

class App extends Component {
  render() {
    return (
    <section>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
              <MDBBreadcrumbItem>
              <Link to={"/home"}>Home</Link>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
              <Link to={"/athletes"}>Athletes</Link>
              </MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="container mt-3">
          <Routes>
            <Route path="/home/*" element={<AthletesList/>} />
            <Route path="/athletes/*" element={<AthletesList/>} />
            <Route path="/add" element={<AddAthlete/>} />
            <Route path="/athlete/:id" element={<Athlete/>} />
          </Routes>
        </div>
    </section> 
  );
  }
}

export default App;
