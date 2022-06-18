import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Field, Form, Formik, ErrorMessage } from "formik";
import Modal from "react-bootstrap/Modal";


const StudentDashboard = () => {
    const navigate = useNavigate();
    const { state } = useLocation();

    const [hostel, setHostel] = useState([]);
    const [bookingModal, setBookingModal] = useState(false);
    const [bookingDetails, setBookingDetails] = useState([]);
    const [bookings, setBookings] = useState([]); 

    const handleGetHostels = () => {
        axios.get("http://localhost:8000/hostel")
        .then(res => {
        //   console.log(res);
          setHostel(res.data);
        })
        .catch(err => console.log(err));
    }

    const handleHostelBookingModalShow = (obj) => {
        setBookingDetails((prevState)=> ({
            ...prevState,
            obj
        }));
        setBookingModal(true);
    }

    const handleHostelBookingModalClose = (id) => setBookingModal(false);

    const handleBooking = (values) => {
        const booking = values.obj;
        axios.post("http://localhost:8000/student/bookHostel", booking)
        .then(res => {
          console.log(res);
        })
        .catch(err => console.log(err.message));
    }
    
    const handleGetBookings = (mode) => {
        axios.get(`http://localhost:8000/hostel/getBookingRequest/${state.name}/${mode}`)
        .then( res => {
            setBookings(res.data);
        })
        .catch(err => console.log(err))
    }

    useEffect(()=>{
        handleGetHostels();
        handleGetBookings('student');
    },[]);
    
    return (  
        <>
            <div>
                <br/>
                <br/>
                <button 
                    style={{
                        marginLeft: '90%',
                        marginTop: '100px'
                    }}
                    className="btn btn-warning my-2 my-sm-0"
                    onClick={()=> navigate('/login')}
                >
                    Logout
                </button>

            </div>

            <Modal show={bookingModal} onHide={handleHostelBookingModalClose} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <div className="mx-5 text-center">
                        <h3> Book Hostel</h3>
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
                                initialValues={bookingDetails}
                                onSubmit={(values, actions) => {
                                    handleBooking(values);
                                    actions.setSubmitting(true);
                                }}
                            >
                                {(formikProps) => (
                                    <Form
                                        onSubmit={formikProps.handleSubmit}
                                        className="px-4 py-3"
                                    >
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="hostel_id">
                                                Hostel ID: 
                                            </label>
                                            <Field
                                                className="form-control"
                                                type="number"
                                                id="hostel_id"
                                                name="hostel_id"
                                                disabled={true}
                                            />
                                            <div className="invalid-feedback d-block">
                                                <ErrorMessage name="hostel_id" />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                        <label className="form-label" htmlFor="name">
                                            Name:
                                        </label>
                                        <Field
                                            className="form-control"
                                            type="number"
                                            id="name"
                                            name="name"
                                            disabled={true}
                                        />
                                        <div className="invalid-feedback d-block">
                                            <ErrorMessage name="name" />
                                        </div>
                                        </div>
                                        
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="owner">
                                                Hostel Owner: 
                                            </label>
                                            <Field
                                                className="form-control"
                                                type="number"
                                                id="owner"
                                                name="owner"
                                                disabled={true}
                                            />
                                            <div className="invalid-feedback d-block">
                                                <ErrorMessage name="owner" />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label" htmlFor="bedType">
                                                Bed Type: 
                                            </label>
                                            <select
                                                name="bedType"
                                                id="bedType"
                                                style={{ display: 'block' }}
                                            >
                                                <option value="" label="Select Bed Type" />
                                                <option value="single" label="single" />
                                                <option value="double" label="double" />
                                            </select>
                                            <div className="invalid-feedback d-block">
                                                <ErrorMessage name="bedType" />
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn btn-danger "
                                            style={{ margin: "20px 40% " }}
                                        >
                                            Book
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    }
                </Modal.Body>
            </Modal>

            <table className="table container" style={{marginTop: '10%', border: '1px solid green', backgroundColor: 'white'}}>
                <thead style={{ backgroundColor: '#144d43', color: '#ffffff' }}>
                    <tr>
                        <th scope="col" width="20%"><span>Hostel Name</span></th>
                        <th scope="col" width="12%"><span>Location</span></th>
                        <th scope="col" width="9%"><span>Available Rooms</span></th>
                        <th scope="col" width="9%"><span>Available Single Rooms</span></th>
                        <th scope="col" width="9%"><span>Available Double Rooms</span></th>
                        <th scope="col" width="9%"><span>Single Room Price</span></th>
                        <th scope="col" width="9%"><span>Double Room Price</span></th>
                        
                        <th scope="col" width="10%">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {hostel.map(details => (
                        <tr key={details._id}> 
                            <td className="text-break">{details.name}</td>
                            <td className="text-break">{details.location}</td>
                            <td className="text-break">{details.availableRooms}</td>
                            <td className="text-break">{details.singleBed}</td>
                            <td className="text-break">{details.doubleBed}</td>
                            <td className="text-break">{details.singleBedPrice}</td>
                            <td className="text-break">{details.doubleBedPrice}</td> 
                            <td data-for="Action">
                            <button onClick={() => {
                                const obj = {
                                    hostel_id: details._id,
                                    name: details.name,
                                    owner: details.owner,
                                    pending: true,
                                    rejected: false,
                                    approved: false,
                                    bedType: "single",
                                    bookerName: state.name
                                }
                                handleHostelBookingModalShow(obj);
                            }}>Book Now</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
            <h2 style={{ marginLeft: "7.5%", color: "white" }}> Bookings </h2>

            <table className="table container" style={{marginTop: '30px', border: '1px solid green', backgroundColor: 'white'}}>
            <thead style={{ backgroundColor: '#144d43', color: '#ffffff' }}>
                <tr>
                    <th scope="col" width="20%"><span>Hostel Name</span></th>
                    <th scope="col" width="12%"><span>Bed Type</span></th>
                    <th scope="col" width="12%"><span>Owner</span></th>
                    <th scope="col" width="9%"><span>Status</span></th>
                </tr>
            </thead>
            <tbody>
                {bookings.map(details => (
                    <tr key={details._id}> 
                        <td className="text-break">{details.name}</td>
                        <td className="text-break">{details.bedType}</td> 
                        <td className="text-break">{details.owner}</td>
                        <td className="text-break">{details.pending == true? 'Pending': details.approved == true ? 'Approved' : 'Rejected'}</td> 
                    </tr>
                ))}
            </tbody>
        </table>

        </>
    );
}
 
export default StudentDashboard;