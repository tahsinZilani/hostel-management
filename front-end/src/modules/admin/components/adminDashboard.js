import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = (props) => {
    const navigate = useNavigate();
    const [approvedHostel, setApprovedHostel] = useState([]);
    const [pendingHostel, setPendingHostel] = useState([]);

    const handleGetHostels = () => {
        axios.get("http://localhost:8000/hostel/adminGetHostels")
        .then(res => {
          setApprovedHostel(res.data.approvedHostelsByAdmin);
          setPendingHostel(res.data.pendingApprovalsByAdmin);
        })
        .catch(err => console.log(err))
    }

    const handleDeleteHostel = (id) => {
        axios.delete(`http://localhost:8000/hostel/${id}`)
        .then((res) => {
            console.log(res);
            const hostels = [...approvedHostel];
            const newList = hostels.filter((hostel) => hostel._id !== id);
            setApprovedHostel(newList);
        })
        .catch(err => console.log(err))
    }
    const handleApproveHostel = (id, mode) => {
        axios.patch(`http://localhost:8000/admin/approval/${id}/${mode}`)
        .then(res => {
            console.log(res);
        })
        .catch(err => console.log(err))
    }

    const handleRejectHostel = (id, mode) => {
        axios.patch(`http://localhost:8000/admin/approval/${id}/${mode}`)
        .then(res => {
            console.log(res);
        })
        .catch(err => console.log(err))
    }

    useEffect(()=>{
        handleGetHostels();
    },[]);

    return ( 
        <>
            <br />  <br />  <br />
            <button
                style={{
                marginLeft: "90%",
                marginTop: "100px",
                }}
                className="btn btn-warning my-2 my-sm-0"
                onClick={() => navigate("/admin/login")}
            >
              Logout
            </button>
            <hr style={{ color: "yellow", height: "3px" }}></hr>
            
            <h2 style={{ marginLeft: "7.5%", color: "white" }}>
                Approved Hostels
            </h2>
            <table className="table container" style={{marginTop: '50px', border: '1px solid green', backgroundColor: 'white'}}>
                <thead style={{ backgroundColor: '#144d43', color: '#ffffff' }}>
                    <tr>
                        <th scope="col" width="12%"><span>Hostel ID</span></th>
                        <th scope="col" width="20%"><span>Hostel Name</span></th>
                        <th scope="col" width="12%"><span>Location</span></th>
                        <th scope="col" width="12%"><span>Owner</span></th>
                        <th scope="col" width="10%">Action</th>
                    </tr>
                </thead>
            <tbody>
                {approvedHostel.map(details => (
                    <tr key={details.id}>
                        <td className="text-break">{details._id}</td>
                        <td className="text-break">{details.name}</td>
                        <td className="text-break">{details.location}</td>
                        <td className="text-break">{details.owner}</td>
                        <td data-for="Action">
                        <button onClick={() => handleDeleteHostel(details._id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
            </table>

            <h2 style={{ marginLeft: "7.5%", color: "white" }}>
               Pending Approval
            </h2>
            <table className="table container" style={{marginTop: '50px', border: '1px solid green', backgroundColor: 'white'}}>
                <thead style={{ backgroundColor: '#144d43', color: '#ffffff' }}>
                    <tr>
                        <th scope="col" width="12%"><span>Hostel ID</span></th>
                        <th scope="col" width="20%"><span>Hostel Name</span></th>
                        <th scope="col" width="12%"><span>Location</span></th>
                        <th scope="col" width="12%"><span>Owner</span></th>
                        <th scope="col" width="10%">Action</th>
                    </tr>
                </thead>
            <tbody>
                {pendingHostel.map(details => (
                    <tr key={details.id}>
                        <td className="text-break">{details._id}</td>
                        <td className="text-break">{details.name}</td>
                        <td className="text-break">{details.location}</td>
                        <td className="text-break">{details.owner}</td>
                        <td data-for="Action">
                        <button onClick={() => handleApproveHostel(details._id, 'APPROVE')}>APPROVE</button><br/><br/>
                        <button onClick={() => handleRejectHostel(details._id, 'REJECT')}>REJECT</button>
                        </td>
                    </tr>
                ))}
            </tbody>
            </table>
        </>
     );
}
 
export default AdminDashboard;