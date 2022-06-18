import { useNavigate } from "react-router-dom";


const Navbar = ({ openModal }) => {
  const navigate = useNavigate();


  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <a className="navbar-brand" href="#" style={{ color: "white" }}>
          TOMADER JONNO HOSTEL
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="form-inline my-2 my-lg-0">
            <button
              className="btn btn-outline-warning my-2 my-sm-0"
              style={{ marginRight: "10px" }}
              onClick={() => navigate('/login')}
            >
              Login
            </button>
            <button
              className="btn btn-outline-warning my-2 my-sm-0"
              type="submit"
              onClick={() => navigate('/signUp')}
            >
              Sign Up
            </button>
          </form>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
