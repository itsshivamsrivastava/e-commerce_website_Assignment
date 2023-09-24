import React from "react";
import "./LoginSignup.css";
import { useState } from "react";

const LoginSignup = () => {
  const [action, setAction] = useState("Sign Up");
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    country: "",
    state: "",
    isdCode: "",
    mobile: "",
    fax: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);

    // Redirect to ProductsGallery Page
    if (Object.keys(formErrors).length === 0) {
      console.log(formValues);
      if (action === "Login") {
        window.location.href = "/productsGallery";
      } 
      else {
        window.location.href = "/";
      }
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.firstName) {
      errors.firstName = "First Name is required!";
    } else if (!values.lastName) {
      errors.lastName = "Last Name is required!";
    } else if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid Email!";
    } else if (!values.address) {
      errors.address = "Address is required!";
    } else if (values.country === "Country") {
      errors.country = "Country is required!";
    } else if (values.state === "State") {
      errors.state = "State is required!";
    } else if (values.isdCode === "ISD Code") {
      errors.isdCode = "ISD Code is required!";
    } else if (!values.mobile) {
      errors.mobile = "Mobile Number is required!";
    } else if (!values.password) {
      errors.password = "Password is required!";
    } else if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required!";
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Password and Confirm Password should match!";
    }
    return errors;
  };

  return (
    <>
      <div className="container my-3">
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        <div className="login-signup tab-pane fade show active" id={action}>
          <ul
            className="nav nav-pills nav-justified mb-5"
            id="ex1"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <div
                className={action === "Login" ? "submit gray" : "submit"}
                onClick={() => {
                  setAction("Login");
                }}
              >
                {" "}
                Login{" "}
              </div>
            </li>
            <li className="nav-item" role="presentation">
              <div
                className={action === "Sign Up" ? "submit gray" : "submit"}
                onClick={() => {
                  setAction("Sign Up");
                }}
              >
                {" "}
                Sign Up{" "}
              </div>
            </li>
          </ul>

          <form onSubmit={handleSubmit}>
            {/* <pre>{JSON.stringify(formValues, undefined, 2)}</pre> */}
            {action === "Login" ? (
              <div></div>
            ) : (
              <div className="nameInput form-outline mb-4">
                <input
                  name="firstName"
                  type="text"
                  id="firstName"
                  className="form-control"
                  placeholder="First Name"
                  onChange={handleChange}
                  value={formValues.firstName}
                />

                <input
                  name="lastName"
                  type="text"
                  id="lastName"
                  className="form-control"
                  placeholder="Last Name"
                  onChange={handleChange}
                  value={formValues.lastName}
                />
              </div>
            )}
            {action === "Login" ? (
              <p></p>
            ) : (
              <p className="formErrors">
                {formErrors.firstName} {formErrors.lastName}
              </p>
            )}

            <div className="form-outline mb-4">
              <input
                name="email"
                type="email"
                id="email"
                placeholder="Email"
                className={
                  action === "Login" ? "form-control email" : "form-control"
                }
                onChange={handleChange}
                value={formValues.email}
              />
            </div>
            {action === "Login" ? (<p className="formErrors"> {formErrors.email} </p>):(<p className="formErrors"> {formErrors.email} </p>)}
            

            {action === "Login" ? (
              <div></div>
            ) : (
              <div className="form-outline mb-4">
                <input
                  name="address"
                  type="text"
                  id="address"
                  placeholder="Address"
                  className="form-control"
                  onChange={handleChange}
                  value={formValues.address}
                />
              </div>
            )}
            <p className="formErrors"> {formErrors.address} </p>

            {action === "Login" ? (
              <div></div>
            ) : (
              <div className="nameInput form-outline mb-4">
                <select
                  name="country"
                  id="country"
                  className="form-control"
                  onChange={handleChange}
                  value={formValues.country}
                >
                  <option value="Country"> Country </option>
                  <option value="India"> India </option>
                </select>

                <select
                  name="state"
                  id="state"
                  className="form-control"
                  onChange={handleChange}
                  value={formValues.state}
                >
                  <option value="State"> State </option>
                  <option value="Uttar Pradesh"> Uttar Pradesh </option>
                </select>
              </div>
            )}
            <p className="formErrors">
              {" "}
              {formErrors.country} {formErrors.state}{" "}
            </p>

            {action === "Login" ? (
              <div></div>
            ) : (
              <div className="mobileInput form-outline mb-4">
                <select
                  name="isdCode"
                  id="isd-code"
                  className="form-control"
                  onChange={handleChange}
                  value={formValues.isdCode}
                >
                  <option value="ISD Code"> ISD Code </option>
                  <option value="+91"> +91 </option>
                </select>
                <input
                  name="mobile"
                  type="tel"
                  id="mobile"
                  placeholder="Mobile Number"
                  className="form-control"
                  onChange={handleChange}
                  value={formValues.mobile}
                />
              </div>
            )}
            <p className="formErrors">
              {" "}
              {formErrors.isdCode} {formErrors.mobile}{" "}
            </p>

            {action === "Login" ? (
              <div></div>
            ) : (
              <div className="nameInput form-outline mb-4">
                <input
                  name="fax"
                  type="tel"
                  id="fax"
                  className="form-control"
                  placeholder="Fax"
                  onChange={handleChange}
                  value={formValues.fax}
                />
                <input
                  name="phone"
                  type="tel"
                  id="phone"
                  className="form-control"
                  placeholder="Phone"
                  onChange={handleChange}
                  value={formValues.phone}
                />
              </div>
            )}

            <div className="nameInput form-outline mb-4">
              <input
                name="password"
                type="password"
                id="password"
                className="form-control"
                placeholder="Password"
                onChange={handleChange}
                value={formValues.password}
              />
              {action === "Login" ? (
                <div></div>
              ) : (
                <input
                  name="confirmPassword"
                  type="password"
                  id="confirmPassword"
                  className="form-control"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  value={formValues.confirmPassword}
                />
              )}
            </div>
            <p className="formErrors">
              {" "}
              {formErrors.password} {formErrors.confirmPassword}{" "}
            </p>

            {action === "Sign Up" ? (
              <div></div>
            ) : (
              <div className="row mb-4">
                <div className="lostPassword col-md-4 d-flex justify-content-center">
                  <a href="#!">Forgot password?</a>
                </div>
              </div>
            )}

            <button type="submit" className="loginSignupBtn submit mb-4">
              {action}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginSignup;
