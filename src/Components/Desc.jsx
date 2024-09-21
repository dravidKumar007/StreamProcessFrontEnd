import { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Container, Row, Col, ListGroup, Badge, Button } from 'react-bootstrap';
import '../Css/Desc.css';

const Desc = () => {
  const { id } = useParams();
  const [foodItem, setFoodItem] = useState(null);
 const navigate=useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/food/search/${id}`)
      .then((response) => {
        setFoodItem(response.data);
      })
      .catch((error) => {
        console.error('Error fetching food data:', error);
      });

    const handlePopState = () => {
      const email = localStorage.getItem('email') || "logs@example.com";
      axios.post('http://localhost:5000/kafka/publish', {
        email: email,
        id: id
      })
      .then((response) => {
        console.log('Successfully sent back button data:', response);
        navigate('/')

      })
      .catch((error) => {
        console.error('Error sending back button data:', error);
        navigate('/')

      });
    };

    window.addEventListener('popstate', handlePopState);

    window.history.pushState(null, '');

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [id]);

  if (!foodItem) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <Card className="food-card shadow-lg">
            <Card.Img
              variant="top"
              src={foodItem.images[0].url}
              alt={foodItem.name}
              style={{ height: '300px', objectFit: 'cover' }}
            />
            <Card.Body>
              <Card.Title className="text-primary">{foodItem.name}</Card.Title>
              <Card.Text className="text-muted">{foodItem.description}</Card.Text>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Price:</strong>{' '}
                  <span className="text-success">
                    &#8377; {foodItem.price}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Ratings:</strong>{' '}
                  <Badge bg="warning" text="dark">
                    {foodItem.ratings} / 5
                  </Badge>
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Stock:</strong> {foodItem.stock}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Number of Reviews:</strong> {foodItem.numOfReviews}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button variant="outline-primary">Buy</Button><br /><br />
                  <Button variant="outline-danger">Add to CART</Button>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <h3 className="text-primary">Customer Reviews</h3>
          {foodItem.reviews.map((review) => (
            <Card key={review._id} className="mb-3 review-card">
              <Card.Body>
                <Card.Title className="text-dark">{review.name}</Card.Title>
                <Card.Text>
                  <strong>Rating:</strong> {review.rating} / 5 <br />
                  <strong>Comment:</strong> {review.Comment}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Desc;
