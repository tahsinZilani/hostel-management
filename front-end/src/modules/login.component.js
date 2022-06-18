import axios from "axios";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";

import '../css/login.css';


const Login = () => {
    const navigate = useNavigate();

    const handleLogin = (values) => {
        const obj = {
            name: values.name,
            password: values.password
        }
        if(values.role === "student"){  
            console.log(obj);
            axios.post("http://localhost:8000/student/login", obj)
            .then(res => {
                localStorage.setItem("user",obj);
                navigate('/student/dashboard', { state: { name: obj.name }});
            })
            .catch(err => console.log(err))
        }else {
            axios.post("http://localhost:8000/hostelOwner/login", obj)
            .then(res => navigate('/hostelOwner/dashboard', { state: { name: obj.name }}))
            .catch(err => console.log(err))
        }

    }
    return ( 
        <>
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card border-0 shadow rounded-3 my-5">
                            <div className="card-body p-4 p-sm-5">
                                <h5 className="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
                                    <Formik 
                                        initialValues={{
                                            name: "",
                                            password:"",
                                            role: "student"
                                        }}
                                        onSubmit={(values, actions) => {
                                            handleLogin(values);
                                            actions.setSubmitting(true);
                                        }}
                                    >
                                    {(formikProps) => (
                                        <Form
                                            onSubmit={formikProps.handleSubmit}
                                            className="px-4 py-3"
                                        >
                                        <div
                                        className="form-group"
                                    >
                                        <label
                                            className="form-label"
                                            htmlFor="name"
                                        >
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
                                                <label
                                                    className="form-label"
                                                    htmlFor="password"
                                                >
                                                    Password
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <Field
                                                    className="form-control"
                                                    type="password"
                                                    id="password"
                                                    name="password"
                                                />
                                                <div className="invalid-feedback d-block">
                                                    <ErrorMessage name="password" />
                                                </div>
                                            </div>
                                            <br/>
                                            <div className="form-group">
                                                <label
                                                    className="form-label"
                                                    htmlFor="role"
                                                >
                                                    Role
                                                    <span className="text-danger">*</span>
                                                </label>

                                                <Field as="select" name="role">
                                                    <option value="student">Student</option>
                                                    <option value="shopOwner">Shop Owner</option>
                                                </Field>
                                                <div className="invalid-feedback d-block">
                                                    <ErrorMessage name="role" />
                                                </div>
                                            </div>

                                            <button
                                                type="submit"
                                                className="btn btn-danger "
                                                style={{ margin: "20px 40% " }}
                                            >
                                                Login
                                            </button>
                                        </Form>
                                    )}
                                    </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </> 
        );
}
 
export default Login;