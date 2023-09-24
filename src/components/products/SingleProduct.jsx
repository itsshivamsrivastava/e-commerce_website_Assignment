import React, { useState, useEffect } from "react";
import "./SingleProduct.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function SingleProduct() {
  const [singleProduct, setSingleProduct] = useState([]);
  const [rating, setRating] = useState([]);
  const [count, setCount] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        setSingleProduct(res.data);
        setRating(res.data.rating.rate);
        setCount(res.data.rating.count);
      })
      .catch((err) => console.log(err));
  }, []);

  // Showing stars based on rating
    let stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<i className="fa fa-star text-danger"></i>);
    }
    for (let i = 0; i < 5 - rating; i++) {
      stars.push(<i className="fa fa-star text-muted"></i>);
    }

  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="row d-flex justify-content-center">
            <div className="col-md-10">
              <div className="card">
                <div className="row">
                  <div className="col-md-6">
                    <div className="images p-3">
                        
                    

                      <div className="text-center p-4">
                        {" "}
                        <img
                          id="main-image"
                          src={singleProduct.image}
                          width="250"
                        />{" "}
                      </div>
                      <div className="thumbnail text-center">
                        {" "}
                        <img
                          src={singleProduct.image}
                          width="70"
                        />{" "}
                        <img src={singleProduct.image} width="70" />{" "}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="product p-4">
                      
                      <div className="mt-4 mb-3">
                        <span className="text-uppercase text-muted brand">
                          {singleProduct.category}
                        </span>
                        <h5 className="text-uppercase">
                          {singleProduct.title}
                        </h5>
                        <div className="price d-flex flex-row align-items-center">
                          <span className="act-price">${singleProduct.price}</span>
                        </div>
                      </div>
                      <p className="about">
                        {singleProduct.description}
                      </p>
                        <div className="rating d-flex flex-row align-items-center">
                            <span className="ml-2"> {stars} {rating} ({count} ratings) </span>
                        </div>
                      <div className="sizes mt-5">
                        <h6 className="text-uppercase">Size</h6>{" "}
                        <label className="radio">
                          {" "}
                          <input type="radio" name="size" value="S" />{" "}
                          <span>S</span>{" "}
                        </label>{" "}
                        <label className="radio">
                          {" "}
                          <input type="radio" name="size" value="M" />{" "}
                          <span>M</span>{" "}
                        </label>{" "}
                        <label className="radio">
                          {" "}
                          <input type="radio" name="size" value="L" />{" "}
                          <span>L</span>{" "}
                        </label>{" "}
                        <label className="radio">
                          {" "}
                          <input type="radio" name="size" value="XL" />{" "}
                          <span>XL</span>{" "}
                        </label>{" "}
                        <label className="radio">
                          {" "}
                          <input type="radio" name="size" value="XXL" />{" "}
                          <span>XXL</span>{" "}
                        </label>
                      </div>
                      <div className="cart mt-4 align-items-center">
                        {" "}
                        <Link to={`/checkout/${singleProduct.id}`} className="btn btn-danger text-uppercase mr-2 px-4">
                          Add to cart
                        </Link>{" "}
                        <i className="fa fa-heart text-muted"></i>{" "}
                        <i className="fa fa-share-alt text-muted"></i>{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </>
  );
}
