import React from 'react';
import Button from '../controls/Button';
import Card from 'react-bootstrap/Card';
import { useHistory } from 'react-router-dom';

export default function AlertCard({ title, body, code }) {
  const history = useHistory();
  return (
    <Card
      className="mt-5 mx-auto pb-5 pt-5"
      style={{ width: '60vw', fontFamily: 'Futura', backgroundColor: '#ebfff8' }}
    >
      <Card.Body>
        <Card.Text className="text-center">
          <h2>Notification has been Scheduled Successfully</h2>
        </Card.Text>
      </Card.Body>
      <div className="mx-auto" style={{ width: 'fit-content' }}>
        <Button
          text="Go to Home"
          size="large"
          onClick={() => {
            history.push('/');
          }}
        ></Button>
      </div>
    </Card>
  );
}
