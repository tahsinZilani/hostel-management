import { Route, Routes, useNavigate } from "react-router-dom";
import { Field, Form, Formik, ErrorMessage } from "formik";
import axios from 'axios';

const AdminLogin = (props) => {

  const navigate = useNavigate();
  
  const handleAdminLogin = (values) => {
    axios.post("http://localhost:8000/admin/login", values)
    .then(res => navigate('/admin/dashboard'))
    .catch(err => console.log(err))
  }
  return (
    <div style={{width: '500px', border: '1px solid white', margin: 'auto', marginTop: '100px',borderRadius: '5px'}}>
        <Formik 
            initialValues={{
              email:"",
              password:""
            }}
            onSubmit={(values, actions) => {
                handleAdminLogin(values);
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
                              htmlFor="email"
                              style={{color: 'white'}}
                          >
                              Email
                              <span className="text-danger">*</span>
                          </label>
                          <Field 
                              
                              className="form-control"
                              type="email"
                              id="email"
                              name="email"
                          />
                          <div className="invalid-feedback d-block">
                              <ErrorMessage name="email" />
                          </div>
                      </div>

                      <div className="form-group">
                          <label
                              className="form-label"
                              htmlFor="password"
                              style={{color: 'white'}}
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
  );
};


export default AdminLogin;
