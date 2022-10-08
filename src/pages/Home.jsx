import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  ListGroup,
  Row
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const productsList = useSelector((state) => state.products);
  const [categories, setCategories] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    axios
      .get("https://ecommerce-api-react.herokuapp.com/api/v1/products/categories")
      .then((res) => setCategories(res.data.data.categories));
  }, []);

  useEffect(() => {
    setProductsFiltered(productsList);
  }, [productsList]);

  const filterCategory = (categoryId) => {
    const filtered = productsList.filter((products) => products.category.id === categoryId);
    setProductsFiltered(filtered);
  };

  const searchProducts = () => {
    const filtered = productsList.filter((products) =>
      products.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setProductsFiltered(filtered);
  };

  const displayProductsFiltered = () => {
    if (productsFiltered.data !== undefined) return <div></div> 
    else {
      return productsFiltered.map((products) => (
        <Col key={products.id}>
          <Card
            onClick={() => navigate(`/products/${products.id}`)}
            style={{ height: "100%" }}
          >
            <Card.Img className="img-card" variant="top" src={products.productImgs[0]} />
            <Card.Body>
              <Card.Title>{products.title}</Card.Title>
              <Card.Text>{products.description}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))
    }
  }

  const displayCategories = () => {
    if(categories === undefined) return <div></div>
    else {
      return <ListGroup>
      {categories.map((category) => (
        <ListGroup.Item
          key={category.id}
          onClick={() => filterCategory(category.id)}
          style={{ cursor: "pointer" }}
        >
        {category.name}
        </ListGroup.Item>
    ))}
    </ListGroup>
    }
    
  }

  return (
    <Row>
      <Col lg={3}>
        {displayCategories()}
      </Col>
      <Col>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Search Products"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
          <Button variant="outline-secondary" onClick={searchProducts}>
            Search
          </Button>
        </InputGroup>
        <Row xs={1} md={2} xl={3} className="g-4">
          {displayProductsFiltered()}
        </Row>
      </Col>
    </Row>
  );
};

export default Home;
