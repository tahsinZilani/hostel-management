import { Field, Form, Formik, ErrorMessage } from "formik";

const CreateAdmin = () => {
  return (
    <>
      <Formik
        initialValues={{
          name: updating ? (user?.profile ? user?.profile.id : "") : "",
          first_name: updating ? user?.first_name : "",
          last_name: updating ? user?.last_name : "",
          email: updating ? user?.email : "",
          password: updating ? "1" : "",
          confirm_password: updating ? "1" : "",
          role_id: updating ? (user?.role ? user.role.id : "") : "",
        }}
        validationSchema={updateUserSchema}
        onSubmit={(values, actions) => {
          handleUpdateUser(values);
          actions.setSubmitting(true);
        }}
      >
        {(formikProps) => (
          <Form onSubmit={formikProps.handleSubmit} className="px-4 py-3">
            <div className="form-group">
              <label className="form-label" htmlFor="first_name">
                First Name
                <span className="text-danger">*</span>
              </label>
              <Field
                className="form-control"
                type="text"
                id="first_name"
                name="first_name"
              />
              <div className="invalid-feedback d-block">
                <ErrorMessage name="first_name" />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="last_name">
                Last Name
                <span className="text-danger">*</span>
              </label>
              <Field
                className="form-control"
                type="text"
                id="last_name"
                name="last_name"
              />
              <div className="invalid-feedback d-block">
                <ErrorMessage name="last_name" />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email
                <span className="text-danger">*</span>
              </label>
              <Field
                className="form-control"
                type="email"
                id="email"
                name="email"
                disabled={updating}
              />
              <div className="invalid-feedback d-block">
                <ErrorMessage name="email" />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">
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

            <div className="form-group">
              <label className="form-label" htmlFor="confirm_password">
                Confirm Password
                <span className="text-danger">*</span>
              </label>
              <Field
                className="form-control"
                type="confirm_password"
                id="confirm_password"
                name="confirm_password"
              />
              <div className="invalid-feedback d-block">
                <ErrorMessage name="confirm_password" />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="profile_id">
                Select Profile
                <span className="text-danger">*</span>
              </label>
              <Field
                className="form-control"
                as="select"
                id="profile_id"
                name="profile_id"
              >
                <option value={""} disabled={true}>
                  {" "}
                  Select a Profile{" "}
                </option>
                {profiles
                  ? profiles.map((profile, index) => (
                      <option key={index} value={profile.id}>
                        {profile.title}
                      </option>
                    ))
                  : ""}
              </Field>
              <div className="invalid-feedback d-block">
                <ErrorMessage name="profile_id" />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="role_id">
                Select Role
                <span className="text-danger">*</span>
              </label>
              <Field
                className="form-control"
                as="select"
                id="role_id"
                name="role_id"
              >
                <option value={""} disabled={true}>
                  {" "}
                  Select a Role{" "}
                </option>
                {roles
                  ? roles.map((role, index) => (
                      <option key={index} value={role.id}>
                        {role.title}
                      </option>
                    ))
                  : ""}
              </Field>
              <div className="invalid-feedback d-block">
                <ErrorMessage name="role_id" />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-danger "
              style={{ margin: "20px 40% " }}
            >
              {updating ? "Update" : "Create"}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateAdmin;
