import { useState, useEffect } from "react";
import "./Checkout.css";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Checkout() {
  const [checkoutProduct, setCheckoutProduct] = useState([]);
  const { id } = useParams();

  // Checkout form validation
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    address2: "",
    country: "",
    state: "",
    zipCode: "",
    sameAddress: "",
    saveInfo: "",
    creditCard: "",
    debitCard: "",
    paymentMethod: "",
    nameOnCard: "",
    creditCardNumber: "",
    expirationDate: "",
    cvv: "",
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
      window.location.href = "/productsGallery";
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
    } else if (!values.zipCode) {
      errors.zipCode = "Zip Code is required!";
    } else if (!values.creditCardNumber) {
      errors.creditCardNumber = "Credit Card Number is required!";
    } else if (!values.expirationDate) {
      errors.expirationDate = "Expiration Date is required!";
    } else if (!values.cvv) {
      errors.cvv = "CVV is required!";
    }
    return errors;
  };

  const checkoutCart = () => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        setCheckoutProduct(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    checkoutCart();
  }, []);

  return (
    <>
      <div className="container my-5">
        <div className="pb-5 text-center">
          <i className="fas fa-shopping-cart fa-3x d-block mx-auto mb-4"></i>
          <h2 className="text-uppercase">Checkout form</h2>
        </div>

        <div className="row">
          <div className="col-md-4 order-md-2 mb-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Your cart</span>
              <span className="badge badge-secondary badge-pill">3</span>
            </h4>
            <ul className="list-group mb-3">
              <li className="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <h6 className="my-0">{checkoutProduct.title}</h6>
                  <small className="text-muted">
                    {checkoutProduct.description}
                  </small>
                </div>
                <span className="text-muted">${checkoutProduct.price}</span>
              </li>

              <li className="list-group-item d-flex justify-content-between bg-light">
                <div className="text-success">
                  <h6 className="my-0">Promo code</h6>
                  <small>FIRSTORDER</small>
                </div>
                <span className="text-success">-$5</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>${checkoutProduct.price - 5}</strong>
              </li>
            </ul>

            <form className="card p-2" onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Promo code"
                />
                <div className="input-group-append">
                  <button type="submit" className="btn btn-secondary">
                    Redeem
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-8 order-md-1">
            <h4 className="mb-3">Billing address</h4>
            <form className="needs-validation" noValidate></form>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName">First name</label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  id="firstName"
                  placeholder="First Name"
                  value={formValues.firstName}
                  onChange={handleChange}
                />
                <div className="invalid-feedback">
                  {formErrors.firstName}
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="lastName">Last name</label>
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  id="lastName"
                  placeholder="Last Name"
                  value={formValues.lastName}
                  onChange={handleChange}
                />
                <div className="invalid-feedback">
                  {formErrors.lastName}
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="email">
                Email <span className="text-muted">(Optional)</span>
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                id="email"
                placeholder="you@example.com"
                value={formValues.email}
                onChange={handleChange}
              />
              <div className="invalid-feedback">
                {formErrors.email}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                className="form-control"
                id="address"
                placeholder="Address"
                value={formValues.address}
                onChange={handleChange}
              />
              <div className="invalid-feedback">
                Please enter your shipping address.
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="address2">
                Address 2 <span className="text-muted">(Optional)</span>
              </label>
              <input
                type="text"
                name="address2"
                className="form-control"
                id="address2"
                placeholder="Apartment or suite"
                value={formValues.address2}
                onChange={handleChange}
              />
            </div>

            <div className="row">
              <div className="col-md-5 mb-3">
                <label htmlFor="country">Country</label>
                <select
                  className="custom-select d-block w-100"
                  id="country"
                  name="country"
                  value={formValues.country}
                  onChange={handleChange}
                >
                  <option value="Choose">Choose</option>
                  <option value="India">India</option>
                  <option value="United States">United States</option>
                </select>
                <div className="invalid-feedback">
                  Please select a valid country.
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="state">State</label>
                <select 
                  name="state" 
                  className="custom-select d-block w-100" 
                  id="state" 
                  value={formValues.state}
                  onChange={handleChange}
                >
                  <option value="">Choose</option>
                  <option value="California">California</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="New Delhi">New Delhi</option>
                </select>
                <div className="invalid-feedback">
                  Please provide a valid state.
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="zip">Zip Code</label>
                <input
                  type="text"
                  name="zipCode"
                  className="form-control"
                  id="zip"
                  placeholder="Zip Code"
                  value="formValues.zipCode"
                  onChange={handleChange}
                />
                <div className="invalid-feedback">Zip code required.</div>
              </div>
            </div>
            <hr className="mb-4" />
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="same-address"
                name="sameAddress"
              /> {" "}
              <label className="custom-control-label" htmlFor="same-address">
                Shipping address is the same as my billing address
              </label>
            </div>
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="save-info"
                name="saveInfo"
              /> {" "}
              <label className="custom-control-label" htmlFor="save-info">
                Save this information for next time
              </label>
            </div>
            <hr className="mb-4" />

            <h4 className="mb-3">Payment</h4>

            <div className="d-block my-3">
              <div className="custom-control custom-radio">
                <input
                  id="credit"
                  name="creditCard"
                  type="radio"
                  className="custom-control-input"
                  value={formValues.creditCard}
                  onChange={handleChange}
                />{" "}
                <label className="custom-control-label" htmlFor="credit">
                  Credit card
                </label>
              </div>
              <div className="custom-control custom-radio">
                <input
                  id="debit"
                  name="debitCard"
                  type="radio"
                  className="custom-control-input"
                  value={formValues.debitCard}
                  onChange={handleChange}
                /> {" "}
                <label className="custom-control-label" htmlFor="debit">
                  Debit card
                </label>
              </div>
              <div className="custom-control custom-radio">
                <input
                  id="paypal"
                  name="paymentMethod"
                  type="radio"
                  className="custom-control-input"
                  value={formValues.paymentMethod}
                  onChange={handleChange}
                /> {" "}
                <label className="custom-control-label" htmlFor="paypal">
                  Paypal
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="cc-name">Name on card</label>
                <input
                  type="text"
                  className="form-control"
                  id="cc-name"
                  placeholder="Name on card"
                  name="nameOnCard"
                  value={formValues.nameOnCard}
                  onChange={handleChange}
                />
                <small className="text-muted">Full name as displayed on card</small>
                <div className="invalid-feedback">Name on card is required</div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="cc-number">Debit/Credit card number</label>
                <input
                  type="text"
                  className="form-control"
                  id="cc-number"
                  placeholder="Credit Card Number"
                  name="creditCardNumber"
                />
                <div className="invalid-feedback">
                  Credit card number is required
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3 mb-3">
                <label htmlFor="cc-expiration">Expiration</label>
                <input
                  type="text"
                  className="form-control"
                  id="cc-expiration"
                  name="expirationDate"
                  placeholder="Expiration Date"
                  value={formValues.expirationDate}
                  onChange={handleChange}
                />
                <div className="invalid-feedback">Expiration date required</div>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="cc-expiration">CVV</label>
                <input
                  type="text"
                  className="form-control"
                  id="cc-cvv"
                  placeholder="CVV"
                  name="cvv"
                  value={formValues.cvv}
                  onChange={handleChange}
                />
                <div className="invalid-feedback">Security code required</div>
              </div>
            </div>
            <hr className="mb-4" />
            <button className="btn btn-primary btn-lg btn-block" type="submit">
              Continue to checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
