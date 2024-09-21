import { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
  
    axios.get('http://localhost:4000/api/v1/users/login', {
      params: { email, password }
    })
    .then((response) => {
      if (response.status === 200) {
        const { token } = response.data.token;
        localStorage.setItem('token', token);
  
        navigate('/');
      } else {
        setError(response.data.error)
        console.error('Unexpected response:', response);
      }
    })
    .catch((error) => {
      if (error.response) {
        console.error('Error response:', error.response);
        setError(error.response.data.error || 'Login failed. Please try again.');
      } else if (error.request) {
        console.error('No response from server:', error.request);
        setError('No response from server. Please try again later.');
      } else {
        console.error('Error', error.message);
        setError('An error occurred. Please try again.');
      }
    });
  };
  
  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="justify-content-center">
        <Col>
          <div className="p-4 border rounded bg-light shadow-lg">
            <h2 className="text-center mb-4">Login</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mt-3">
                Login
              </Button>
            </Form>
          </div>
        </Col>
        <p className="text-center mt-3">
          Don't have an account?{' '}
          <Link to="/signin">Sign up here</Link>
        </p>
      </Row>
    </Container>
  );
};

export default Login;
