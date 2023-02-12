import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import hm from './images/hm.png'
import Button from "./controls/Button";
import { useHistory } from "react-router-dom";
import Card from "react-bootstrap/Card";

export default function Home() {
  const history = useHistory();
  return (
    <div  style={{
      backgroundColor:'#cbe0ff',
      height: '93.5vh',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    }}>
      <div className="align-items-center justify-content-center">
        <Container className='pt-0 mt-0'>
           <Row>
            <Col >
              <Card
                className="mt-5 pb-5 pt-5"
                style={{
                  // boxShadow: '1px 2px 9px #5621f4',
                  maxWidth: '550px',
                  minWidth: '300px',
                  minHeight: '60vh',
                  maxHeight: '70vh',
                  fontFamily: 'QuickSand',
                  backgroundColor: 'transparent',
                  borderColor:"transparent"


                }}
              >
                <Card.Body>
                  <Card.Title className="text-left">
                    <h1>Making Mobile </h1>
                    <h1>Engagement a Piece of 🍰</h1>
                  </Card.Title>
                  <Card.Text className="text-left mt-4">
                  <h3>For app-first companies, Notiify is the only solution that helps personalize and optimize all customer touch points, both inside and outside the app</h3>
                  </Card.Text>
                </Card.Body>
                <div className="mx-auto " style={{ width: '70%' }}>
                  <Button
                    text="Create Notif"
                    className="mr-3"
                    size="large"
                    color="primary"
                    onClick={e => {
                      history.push('/createnotif');
                    }}
                  ></Button>
                  {/* <Button text="Learn More" size="Large"></Button> */}
                </div>
              </Card>
            </Col>
            <Col>
              <div style={{ marginTop: "5rem" }}>
                <img
                  src={hm}
                  style={{
                    maxWidth: "700px",
                    minWidth: "500px",
                    Height: "90vh",
                  }}
                />
              </div>
            </Col>
          </Row>
        </Container>
        
      </div>
    </div>
  );
}
