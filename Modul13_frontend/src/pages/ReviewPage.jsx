import { useState, useEffect } from "react";
import { Alert, Col, Container, Row, Spinner, Stack } from "react-bootstrap";
import { getThumbnail } from "../api";
import { GetMyReviews } from "../api/apiReview";
import ModalReview from "../components/modals/ModalReview";

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchReviews = () => {
    setIsLoading(true);
    GetMyReviews()
      .then((data) => {
        setReviews(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <Container className="mt-4">
      <Stack direction="horizontal" gap={3} className="mb-3">
        <h1 className="h4 fw-bold mb-0 text-nowrap">Review Video</h1>
        <hr className="border-top border-light opacity-50 w-100" />
      </Stack>
      {isLoading ? (
        <div className="text-center">
          <Spinner
            as="span"
            animation="border"
            variant="primary"
            size="lg"
            role="status"
            aria-hidden="true"
          />
          <h6 className="mt-2 mb-0">Loading...</h6>
        </div>
      ) : reviews?.length > 0 ? (
        <Row>
          {reviews?.map((review) => (
            <Col md={6} lg={4} className="mb-3" key={review.id}>
              <div
                className="card text-white"
                style={{ aspectRatio: "16 / 9" }}
              >
                <img
                  src={getThumbnail(review.content.thumbnail)}
                  className="card-img w-100 h-100 object-fit-cover bg-light"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title text-truncate">{review.content.title}</h5>
                  <p className="card-text">{review.content.description}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <img
                        src={getThumbnail(review.user.avatar)}
                        alt={review.user.name}
                        className="rounded-circle"
                        style={{ width: '40px', height: '40px', marginRight: '10px' }}
                      />
                      <span>{review.user.name}</span>
                    </div>
                    <ModalReview id={review.id} onClose={fetchReviews} />
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      ) : (
        <Alert variant="dark" className="text-center">
          Belum ada review, ayo tambahin review!
        </Alert>
      )}
    </Container>
  );
};

export default ReviewPage;
