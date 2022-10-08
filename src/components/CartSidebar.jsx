import React from 'react';
import { Button, ListGroup, Offcanvas } from 'react-bootstrap';
import shoppingCartSlice, { getShoppingCartThunk, purchaseCartThunk } from '../store/slices/shoppingCart.slice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const CartSidebar = ({show, handleClose}) => {


  const dispatch = useDispatch();
  const shoppingCart = useSelector((state) => state.shoppingCart);
  console.log(shoppingCart); 

  useEffect(() => {
    dispatch(getShoppingCartThunk());
  }, [])

  const checkOut = () => {
    dispatch(purchaseCartThunk()); 
  }

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>My Shopping Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup>
            {shoppingCart?.map(product => (
              <ListGroup.Item key={product.id}>
                <Link to={`/products/${product.id}`}>
                  {product.title}
                </Link>
              </ListGroup.Item>
            ))}
          </ListGroup>

          <Button className='checkout-button' onClick={checkOut}> Checkout </Button>
        </Offcanvas.Body>
      </Offcanvas>
  );
};

export default CartSidebar;