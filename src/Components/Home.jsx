import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Button, Alert } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Css/Card.css'

const Home = () => {


    const [search,setSearch]=useState("");
    const [limit,setLimit]=useState(8);
    const [email,setEmail]=useState(localStorage.getItem('email'));
    const navigate = useNavigate();
    const [currentpg,setCurrentpg]=useState(1);
    const [pages,setPages]=useState(1);
    const [items,setItems]=useState([]);





async function setPg(i) {
  setCurrentpg(i); // Update state

  axios.get(`http://localhost:3000/api/v1/food/items/${i}/${limit}/${search}`).then(
    (res)=>{
      setPages(res.data.totalPages)
      console.log("pg-"+currentpg);
      setItems(res.data.orderItems);
    }
  )
  console.log(items);
 
}
async function setLim(i) {
  setLimit(i); // Update state

    axios.get(`http://localhost:3000/api/v1/food/items/${setCurrentpg}/${i}/${search}`).then(

    (res)=>{
      setPages(res.data.totalPages)
      console.log("pg-"+currentpg);
      setItems(res.data.orderItems);
    }
  )
  console.log(items);
 
}

    function loadpage(){
    
      axios.get(`http://localhost:3000/api/v1/food/items/${currentpg}/${limit}/${search}`).then(
        (res)=>{
          setPages(res.data.totalPages)
          console.log("pg-"+currentpg);
          setItems(res.data.orderItems);
        }
      )
      console.log(items);
    }
    useEffect(() => {
loadpage();
},[])

if (email==undefined ||email==''||email===null) {
  console.log(email)
  navigate('/signin');
}
return (
    <div>
           <Navbar bg="primary" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">FoodOrder</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            
            <NavDropdown title={"limit : "+limit} id="basic-nav-dropdown">
              <NavDropdown.Item onClick={()=>{setLimit(4) ;setLim(4)}}>4</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>{setLimit(8) ;setLim(8)}}>8</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>{setLimit(12) ;setLim(12)}}>12</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>{setLimit(16) ;setLim(16)}}>16</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>{setLimit(20) ;setLim(20)}}>16</NavDropdown.Item>

            </NavDropdown>
          </Nav>
          
        </Navbar.Collapse>
        
      <Form inline>
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search"
              className=" mr-sm-2"
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
      

            />
          </Col>
          <Col xs="auto">
            <Button type="submit" onClick={(e) => { 
    e.preventDefault(); // Prevent the default form submission
    loadpage();    // Call your search function
  }}>Submit</Button>
          </Col>
        </Row>
      </Form>
      <Navbar.Text className='ms-5'>
               Signed in as: <a href="login">{email}</a>
          </Navbar.Text>
      </Container>
    </Navbar>


    <Row xs={4} md={4} className="g-4 m-2">
  {items.map((item) => (
    <Col key={item._id}>
      <Link to={item._id} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Card className="h-100 card-hover bg-dark text-light">
          {/* Custom class for hover effect */}
          <Card.Img 
            variant="top" 
            src={item.images[0].url} 
            style={{ height: '200px', objectFit: 'cover' }} // Fixes image height and cropping
          />
          <Card.Body>
            <div className="d-flex justify-content-between">
              <Card.Title>{item.name}</Card.Title>
              <span>{'₹'+item.price}</span>
            </div>
            <hr />
            <Card.Text>
              {item.description}
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  ))}
</Row>

              <center className='m-5'>
    {
      (() => {
        const buttons = [];
        for (let i = 1; i <= pages; i++) {
          buttons.push(
            <Button
            key={i}
            onClick={async() => {console.log(i) ;setPg(i)}}
            className="me-2"
            variant={currentpg === i ? 'primary' : 'light'}
            >
                  {i}
                </Button>
              );
            }
            return buttons;
          })()
        }
        </center>
    </div>
  )
}

export default Home 