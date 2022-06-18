import { useNavigate, useLocation } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import { useEffect, useState } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";

import Modal from "react-bootstrap/Modal";

const HostelOwnerDashboard = (props) => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [forceReload, setForceReload] = useState(false);
  const [show, setShow] = useState(false);
  const [showPriceUpdate, setShowPriceUpdate] = useState(false);
  const [showSeatUpdate, setShowSeatUpdate] = useState(false);
  const [approvedHostels, setApprovedHostels] = useState([]);
  const [pendingHostels, setPendingHostels] = useState([]);
  const [bedDetails, setBedDetails] = useState([]);
  const [bookingDetails, setBookingDetails] = useState([]);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const handleUpdatePriceClose = () => setShowPriceUpdate(false);

  const handleUpdatePriceShow = () => setShowPriceUpdate(true);

  const handleUpdateSeatClose = () => setShowSeatUpdate(false);

  const handleUpdateSeatShow = () => setShowSeatUpdate(true);

  const handleGetHostels = () => {
    axios
      .get(`http://localhost:8000/hostel/${state.name}`)
      .then((res) => {
        setApprovedHostels(res.data.approvedHostelsByAdmin);
        setPendingHostels(res.data.pendingApprovalsByAdmin);
      })
      .catch((err) => console.log(err));
  };

  const handleGetBookings = (mode) => {
    axios
      .get(`http://localhost:8000/hostel/getBookingRequest/${state.name}/${mode}`)
      .then((res) => {
        setBookingDetails(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdate = (values) => {
    axios
      .patch(`http://localhost:8000/hostel/${bedDetails[0]._id}`, values)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleAddHostel = (values) => {
    console.log(values);
    axios
      .post("http://localhost:8000/hostel/addHostel", values)
      .then((res) => handleClose())
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleGetHostels();
    handleGetBookings('hostelOwner');
  }, [forceReload]);
  return (
    <div>
      <Modal
        show={showPriceUpdate}
        onHide={handleUpdatePriceClose}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="mx-5 text-center">
              <h3> Update Hostel</h3>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            <div
              className="card bg-light "
              style={{ margin: "30px auto", maxWidth: "45rem" }}
            >
              <Formik
                initialValues={{
                  singleBedPrice: 0,
                  doubleBedPrice: 0,
                }}
                onSubmit={(values, actions) => {
                  handleUpdate(values);
                  actions.setSubmitting(true);
                }}
              >
                {(formikProps) => (
                  <Form
                    onSubmit={formikProps.handleSubmit}
                    className="px-4 py-3"
                  >
                    <div className="form-group">
                      <label className="form-label" htmlFor="singleBedPrice">
                        Single Bed Price:
                      </label>
                      <Field
                        className="form-control"
                        type="number"
                        id="singleBedPrice"
                        name="singleBedPrice"
                      />
                      <div className="invalid-feedback d-block">
                        <ErrorMessage name="singleBedPrice" />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="doubleBedPrice">
                        Double Bed Price:
                      </label>
                      <Field
                        className="form-control"
                        type="number"
                        id="doubleBedPrice"
                        name="doubleBedPrice"
                      />
                      <div className="invalid-feedback d-block">
                        <ErrorMessage name="doubleBedPrice" />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-danger "
                      style={{ margin: "20px 40% " }}
                    >
                      Update Price
                    </button>

                  </Form>
                )}
              </Formik>
            </div>
          }
        </Modal.Body>
      </Modal>
  
      <Modal
        show={showSeatUpdate}
        onHide={handleUpdateSeatClose}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="mx-5 text-center">
              <h3> Update Hostel</h3>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            <div
              className="card bg-light "
              style={{ margin: "30px auto", maxWidth: "45rem" }}
            >
              <Formik
                initialValues={{
                  singleBed: 0,
                  doubleBed: 0,
                }}
                onSubmit={(values, actions) => {
                  handleUpdate(values);
                  actions.setSubmitting(true);
                }}
              >
                {(formikProps) => (
                  <Form
                    onSubmit={formikProps.handleSubmit}
                    className="px-4 py-3"
                  >
                    <div className="form-group">
                      <label className="form-label" htmlFor="singleBed">
                        Single Beds Available:
                      </label>
                      <Field
                        className="form-control"
                        type="number"
                        id="singleBed"
                        name="singleBed"
                      />
                      <div className="invalid-feedback d-block">
                        <ErrorMessage name="singleBed" />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="doubleBed">
                        Double Beds Available:
                      </label>
                      <Field
                        className="form-control"
                        type="number"
                        id="doubleBed"
                        name="doubleBed"
                      />
                      <div className="invalid-feedback d-block">
                        <ErrorMessage name="doubleBed" />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-danger "
                      style={{ margin: "20px 40% " }}
                    >
                      Update Seats
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          }
        </Modal.Body>
      </Modal>
      
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="mx-5 text-center">
              <h3> Add Hostel</h3>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            <div
              className="card bg-light "
              style={{ margin: "30px auto", maxWidth: "45rem" }}
            >
              <Formik
                initialValues={{
                  name: "",
                  location: "",
                  owner: "",
                  ownerEmail: "",
                  doubleBed: 0,
                  singleBed: 0,
                  singleBedPrice: 0,
                  doubleBedPrice: 0,
                  availableRooms: 0,
                  approvedByAdmin: false,
                }}
                onSubmit={(values, actions) => {
                  handleAddHostel(values);
                  actions.setSubmitting(true);
                }}
              >
                {(formikProps) => (
                  <Form
                    onSubmit={formikProps.handleSubmit}
                    className="px-4 py-3"
                  >
                    <div className="form-group">
                      <label className="form-label" htmlFor="name">
                        Name
                        <span className="text-danger">*</span>
                      </label>
                      <Field
                        className="form-control"
                        type="text"
                        id="name"
                        name="name"
                      />
                      <div className="invalid-feedback d-block">
                        <ErrorMessage name="name" />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="location">
                        Location
                        <span className="text-danger">*</span>
                      </label>
                      <Field
                        className="form-control"
                        type="text"
                        id="location"
                        name="location"
                      />
                      <div className="invalid-feedback d-block">
                        <ErrorMessage name="location" />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="owner">
                        Name of the Owner
                        <span className="text-danger">*</span>
                      </label>
                      <Field
                        className="form-control"
                        type="text"
                        id="owner"
                        name="owner"
                      />
                      <div className="invalid-feedback d-block">
                        <ErrorMessage name="owner" />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="ownerEmail">
                        Owner Email
                        <span className="text-danger">*</span>
                      </label>
                      <Field
                        className="form-control"
                        type="email"
                        id="ownerEmail"
                        name="ownerEmail"
                      />
                      <div className="invalid-feedback d-block">
                        <ErrorMessage name="ownerEmail" />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="singleBed">
                        No of Single Room Available
                        <span className="text-danger">*</span>
                      </label>
                      <Field
                        className="form-control"
                        type="text"
                        id="singleBed"
                        name="singleBed"
                      />
                      <div className="invalid-feedback d-block">
                        <ErrorMessage name="singleBed" />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="doubleBed">
                        No of Double Rooms Available
                        <span className="text-danger">*</span>
                      </label>
                      <Field
                        className="form-control"
                        type="text"
                        id="doubleBed"
                        name="doubleBed"
                      />
                      <div className="invalid-feedback d-block">
                        <ErrorMessage name="doubleBed" />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="availableRooms">
                        No of Rooms Available
                        <span className="text-danger">*</span>
                      </label>
                      <Field
                        className="form-control"
                        type="text"
                        id="availableRooms"
                        name="availableRooms"
                      />
                      <div className="invalid-feedback d-block">
                        <ErrorMessage name="availableRooms" />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="singleBedPrice">
                        Price of a Single Bed
                        <span className="text-danger">*</span>
                      </label>
                      <Field
                        className="form-control"
                        type="text"
                        id="singleBedPrice"
                        name="singleBedPrice"
                      />
                      <div className="invalid-feedback d-block">
                        <ErrorMessage name="singleBedPrice" />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="doubleBedPrice">
                        Price of a Double Bed
                        <span className="text-danger">*</span>
                      </label>
                      <Field
                        className="form-control"
                        type="text"
                        id="doubleBedPrice"
                        name="doubleBedPrice"
                      />
                      <div className="invalid-feedback d-block">
                        <ErrorMessage name="doubleBedPrice" />
                      </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="approvedByAdmin">
                            Approved By Admin:
                        </label>
                        <Field
                          className="form-control"
                          type="boolean"
                          disabled = {true}
                          id="approvedByAdmin"
                          name="approvedByAdmin"
                        />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-danger "
                      style={{ margin: "20px 40% " }}
                    >
                      Add Hostel
                    </button>

                  </Form>
                )}
              </Formik>
            </div>
          }
        </Modal.Body>
      </Modal>

      <div style={{ backgroundColor: "orange", borderRadius: '10px', width: '50%', margin: 'auto', marginTop: '20px', height: '100px', boxSizing: 'border-box', padding: '20px' }}>
          <h1 style={{color: 'black', textAlign: 'center'}}>Welcome {state.name} to your dashboard!</h1>
      </div>

      <br />

      <div style={{ padding: "10px" }}>
          <button
            style={{
              marginLeft: "90%",
              marginTop: "100px",
            }}
            className="btn btn-warning my-2 my-sm-0"
            onClick={() => navigate("/login")}
          >
              Logout
          </button>
          <hr style={{ color: "yellow", height: "3px" }}></hr>

          <br />
          <br />
          <button
            style={{
              marginLeft: "7.5%",
              marginTop: "100px",
            }}
            className="btn btn-warning my-2 my-sm-0"
            onClick={handleShow}
          >
            Add Hostel
          </button>

          <br />
          <br />
          <h2 style={{ marginLeft: "7.5%", color: "white" }}>
            Approved Hostels
          </h2>
          <table
            className="table container"
            style={{
              // marginTop: "10%",
              border: "1px solid green",
              backgroundColor: "white",
            }}
          >
            <thead style={{ backgroundColor: "#144d43", color: "#ffffff" }}>
              <tr>
                <th scope="col" width="20%">
                  <span>Hostel Name</span>
                </th>
                <th scope="col" width="12%">
                  <span>Location</span>
                </th>
                <th scope="col" width="9%">
                  <span>Available Rooms</span>
                </th>
                <th scope="col" width="9%">
                  <span>Available Single Rooms</span>
                </th>
                <th scope="col" width="9%">
                  <span>Available Double Rooms</span>
                </th>
                <th scope="col" width="9%">
                  <span>Single Room Price</span>
                </th>
                <th scope="col" width="9%">
                  <span>Double Room Price</span>
                </th>
                <th scope="col" width="10%">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {approvedHostels.map((details) => (
                <tr key={details._id}>
                  <td className="text-break">{details.name}</td>
                  <td className="text-break">{details.location}</td>
                  <td className="text-break">{details.availableRooms}</td>
                  <td className="text-break">{details.singleBed}</td>
                  <td className="text-break">{details.doubleBed}</td>
                  <td className="text-break">{details.singleBedPrice}</td>
                  <td className="text-break">{details.doubleBedPrice}</td>
                  <td data-for="Action">
                    <button
                      className="btn btn-outline-warning my-2 my-sm-0"
                      onClick={() => {
                        const seatToBeUpdated = approvedHostels.filter(
                          (d) => d._id === details._id
                        );
                        setBedDetails(seatToBeUpdated);
                        handleUpdateSeatShow();
                      }}
                    >
                      Update Seats
                    </button>
                    <br />
                    <br />
                    <button
                      className="btn btn-outline-warning my-2 my-sm-0"
                      onClick={() => {
                        const priceToBeUpdated = approvedHostels.filter(
                          (d) => d._id === details._id
                        );
                        setBedDetails(priceToBeUpdated);
                        handleUpdatePriceShow();
                      }}
                    >
                      Update Price
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <br /><br />

          <h2 style={{ marginLeft: "7.5%", color: "white" }}>
            Requested By Students
          </h2>

          <table
            className="table container"
            style={{
              // marginTop: "10%",
              border: "1px solid green",
              backgroundColor: "white",
            }}
          >
            <thead style={{ backgroundColor: "#144d43", color: "#ffffff" }}>
              <tr>
                <th scope="col" width="12%">
                  <span>Hostel Name</span>
                </th>
                <th scope="col" width="9%">
                  <span>Requested By</span>
                </th>
                <th scope="col" width="9%">
                  <span>Room Type</span>
                </th>
                <th scope="col" width="9%">
                  <span>Status</span>
                </th>
                <th scope="col" width="10%">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {bookingDetails.map((details) => (
                <tr key={details._id}>
                  <td className="text-break">{details.name}</td>
                  <td className="text-break">{details.bookerName}</td>
                  <td className="text-break">{details.bedType}</td>
                  <td className="text-break">
                    {details.pending === true
                      ? "Pending"
                      : details.approved === true
                      ? "Approved"
                      : "Rejected"}
                  </td>
                  <td data-for="Action">
                    <button
                      className="btn btn-outline-warning my-2 my-sm-0"
                      onClick={() => {
                        const approvedSeat = bookingDetails.filter(
                          (d) => d._id === details._id
                        );
                        approvedSeat[0].pending = false;
                        approvedSeat[0].rejected = false;
                        approvedSeat[0].approved = true;

                        axios
                          .patch(
                            `http://localhost:8000/hostelOwner/statusUpdate/${approvedSeat[0]._id}`,
                            approvedSeat[0]
                          )
                          .then((res) => {
                            console.log(res);
                            setForceReload(!forceReload);
                          })
                          .catch((err) => console.log(err));
                      }}
                    >
                      APPROVE
                    </button>
                    <br />
                    <br />
                    <button
                      className="btn btn-outline-danger my-2 my-sm-0"
                      onClick={() => {
                        const rejectedSeat = bookingDetails.filter(
                          (d) => d._id === details._id
                        );
                        rejectedSeat[0].pending = false;
                        rejectedSeat[0].approved = false;
                        rejectedSeat[0].rejected = true;

                        axios
                          .patch(
                            `http://localhost:8000/hostelOwner/statusUpdate/${rejectedSeat[0]._id}`,
                            rejectedSeat[0]
                          )
                          .then((res) => {
                            console.log(res);
                            setForceReload(!forceReload);
                          })
                          .catch((err) => console.log(err));
                      }}
                    >
                      REJECT
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <br />
          <br />
          
          <h2 style={{ marginLeft: "7.5%", color: "white" }}>
            Pending Approval
          </h2>
          
          <table
            className="table container"
            style={{
              // marginTop: "10%",
              border: "1px solid green",
              backgroundColor: "white",
            }}
          >
            <thead style={{ backgroundColor: "#144d43", color: "#ffffff" }}>
              <tr>
                <th scope="col" width="20%">
                  <span>Hostel Name</span>
                </th>
                <th scope="col" width="12%">
                  <span>Location</span>
                </th>
                <th scope="col" width="9%">
                  <span>Available Rooms</span>
                </th>
                <th scope="col" width="9%">
                  <span>Available Single Rooms</span>
                </th>
                <th scope="col" width="9%">
                  <span>Available Double Rooms</span>
                </th>
                <th scope="col" width="9%">
                  <span>Single Room Price</span>
                </th>
                <th scope="col" width="9%">
                  <span>Double Room Price</span>
                </th>
                <th scope="col" width="10%">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {pendingHostels.map((details) => (
                <tr key={details._id}>
                  <td className="text-break">{details.name}</td>
                  <td className="text-break">{details.location}</td>
                  <td className="text-break">{details.availableRooms}</td>
                  <td className="text-break">{details.singleBed}</td>
                  <td className="text-break">{details.doubleBed}</td>
                  <td className="text-break">{details.singleBedPrice}</td>
                  <td className="text-break">{details.doubleBedPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
      
      </div>

    </div>
  );
};

export default HostelOwnerDashboard;
