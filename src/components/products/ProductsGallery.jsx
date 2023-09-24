import React, {useState, useEffect} from "react";
import "./ProductsGallery.css";
import axios from 'axios';
import { Link } from "react-router-dom";

export default function ProductsGallery() {

	const [products, setProducts] = useState([]);

	useEffect(() => {
		axios.get('https://fakestoreapi.com/products')
			.then(res => {
				setProducts(res.data);
			}
			)
			.catch(err => console.log(err));
	}, []);


  return (
    <>
      <section className="section-products">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-md-8 col-lg-6">
              <div className="header">
                <h3>Featured Product</h3>
                <h2>Popular Products</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="our-products col-md-6 col-lg-4 col-xl-3">
				{
					products.map(product => (
						<div key={product.id} id="product-1" className="single-product">
							<div className="part-1">
								<Link className="image-link" to={`/singleProduct/${product.id}`}>
									<img src={product.image} alt="" />
								</Link>
								<ul>
									<li>
										<Link to="#">
											<i className="fas fa-plus"></i>
										</Link>
									</li>
									<li>
										<Link to="#">
											<i className="fas fa-expand"></i>
										</Link>
									</li>
								</ul>
							</div>
							<div className="part-2">
								<h3 className="product-title">{product.title}</h3>
								<h4 className="product-price">$ {product.price}</h4>
								<h4 className="product-category">{product.category}</h4>
							</div>
						</div>
					))
				}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
