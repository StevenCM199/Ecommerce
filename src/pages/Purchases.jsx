import React, { useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import purchasesSlice, { getPurchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const purchases = useSelector((state) => state.purchases);

  //console.log(purchases); 

  const options = {weekdasy: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  useEffect(() => {
    dispatch(getPurchasesThunk());
  }, [])

  return (
    <div>
      <h1>Purchases</h1>

      <ListGroup>
        {purchases.map((purchase) => (
          <ListGroup.Item>
            <h1>{purchase.createdAt}</h1>
            {purchase.cart.products.map((product) => (
              <div style={{cursor:"pointer"}} onClick={() => navigate(`/products/${product.id}`)}> {product.title} </div>
            ))}
            <br/>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Purchases;