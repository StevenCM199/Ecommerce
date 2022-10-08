import React, { useEffect } from "react";
import { Col, ListGroup, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { addToCartThunk } from "../store/slices/shoppingCart.slice";

const ProductsDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch(); 

  const [quantity, setQuantity] = useState(1); 

  const productsList = useSelector((state) => state.products);

  const productsDetail = productsList.find((products) =>products.id === Number(id));
  const relatedProducts = productsList.filter(
    (products) => products.category.id === productsDetail.category.id
  );


  useEffect(() => {
    setQuantity(1);
  } , [id])


  const addToCart = () => {
    const product = {
      id: id,
      quantity: quantity
    };
    dispatch(addToCartThunk(product)); 
  };

  console.log(productsDetail); 

  return (
    <>
      <Row>
        <Col>
          <h1>{productsDetail?.title}</h1>
          <img className="img-fluid" src={productsDetail?.productImgs[0]} alt="" />
          <p>{productsDetail?.description}</p>
          <div className="quantity mb-5">
            <Button className="quantity-btn me-3" onClick={() => setQuantity(quantity - 1)}> - </Button>
              {quantity}
            <Button className="quantity-btn ms-3" onClick={() => setQuantity(quantity + 1)}> + </Button>
          </div>

          <div className='product-price'>
            <h3>Price: </h3>  <h4> ${productsDetail.price * quantity} </h4>
          </div>

          <br/> 
          <Button className="mt-2" onClick={addToCart}>
            Add to Cart
          </Button>
        </Col>
        <Col lg={3}>
          <ListGroup variant="flush">
          <h1>Related Products</h1>

            {relatedProducts.map((products) => (
              
              <ListGroup.Item key={products.id}>
                <Link to={`/products/${products.id}`}>
                  <img src={products.productImgs[0]} alt="" className="img-fluid" />
                  {products.title}
                </Link>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </>
    
  );
};

export default ProductsDetail;
