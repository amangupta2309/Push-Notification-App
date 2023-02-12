import React,  { useState, useEffect }from 'react';
import axios from 'axios';
import { Container, Form, InputGroup, Card, Row } from 'react-bootstrap';
import './CreateNotif.css';
import DateTime from '../DateTime/DateTime';
import Button from '../controls/Button';
import { useHistory } from 'react-router-dom';
import PageHeader from '../PageHeader';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import { Dropdown } from 'react-bootstrap';



export default function CreateNotif() {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    axios
      .get('https://push-notifications-513j.onrender.com/getusers')
      .then(response => {
        console.log(response, 'chjk');
        setUserData({ ...userData, ...response.data });
      })
      .catch(err => console.log(err));
  }, []);

  const [metaData, setMetaData] = useState({
    NotifTitle: '',
    NotifTopic: '',
    NotifMessage: '',
    scheduleTime: new Date(),
    timeToLive: new Date(),
  });

  const history = useHistory();

  const [isChecked1, setIsChecked1] = useState(false);

  const handleCheckboxChange1 = event => {
    setIsChecked1(event.target.checked);
  };
  const [isChecked2, setIsChecked2] = useState(false);

  const handleCheckboxChange2 = event => {
    setIsChecked2(event.target.checked);
  };
  const [teamCheck, setTeamCheck] = useState(false);

  const handleTeamCheck = event => {
    setTeamCheck(event.target.checked);
  };
  const [specificCheck, setSpecificCheck] = useState(false);

  const handleSpecificCheck = event => {
    setSpecificCheck(event.target.checked);
  };
  const [sendAllCheck, setSendAllCheck] = useState(false);

  const handleSendAllCheck = event => {
    setSendAllCheck(event.target.checked);
  };

  const options = ['None', 'Engineering', 'Marketing', 'Sales'];

  const [selectedOption, setSelectedOption] = useState('');

  const handleSelect = (eventKey, event) => {
    console.log(eventKey)
    setSelectedOption(eventKey);
  };

  const sendNotifToTeam = () => {
    var token = []
      for(var key in userData)
      {
        if(selectedOption==userData[key].team)
       token.push(userData[key].token) 
      }
    console.log(token,'kbzkvsb')
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: metaData.NotifTitle,
        topic: metaData.NotifTopic,
        message: metaData.NotifMessage,
        token: token,
        schedule: metaData.scheduleTime,
        timeToLive: metaData.timeToLive-Date.now(),
      }),
    };
    console.log(requestOptions.body);
    fetch('https://push-notifications-513j.onrender.com/notify', requestOptions)
      .then(response => response.json())
      .then(data => console.log(data));

      history.push({
        pathname: '/alert',
      });
  };

  const sendNotifToAll = () => {
    var token = []
      for(var key in userData)
      {
       token.push(userData[key].token) 
      }
    console.log(token,'kbzkvsb')
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: metaData.NotifTitle,
        topic: metaData.NotifTopic,
        message: metaData.NotifMessage,
        token: token,
        schedule: metaData.scheduleTime,
        timeToLive: metaData.timeToLive-Date.now(),
      }),
    };
    console.log(requestOptions.body);
    fetch('https://push-notifications-513j.onrender.com/notify', requestOptions)
      .then(response => response.json())
      .then(data => console.log(data));

      history.push({
        pathname: '/alert',
      });
  };
  return (
    <div style={{ backgroundColor: '#cbe0ff', height: '860px' }}>
      <PageHeader
        title="Create New Notification"
        subTitle="Notification Form"
        icon={<AddAlertIcon fontSize="large" />}
      />
      <Container>
        {/* <div style={{backgroundColor:'white'}}>
        <div
          
          style={{ zIndex: 1, height: '89vh', position: 'absolute'}}
        >  */}

        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div>
            <Card style={{ width: '30rem' }}>
              <Card.Body>
                <Card.Title>Title</Card.Title>
                <InputGroup>
                  <Form.Control
                    placeholder="Enter Title"
                    aria-label="NotifTitle"
                    aria-describedby="basic-addon1"
                    onChange={e => {
                      setMetaData({
                        ...metaData,
                        NotifTitle: e.target.value,
                      });
                    }}
                    value={metaData.NotifTitle}
                  />
                </InputGroup>
                <Card.Title>Message</Card.Title>
                <InputGroup>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Enter message "
                    aria-label="NotifMessage"
                    aria-describedby="basic-addon1"
                    onChange={e => {
                      setMetaData({
                        ...metaData,
                        NotifMessage: e.target.value,
                      });
                    }}
                    value={metaData.NotifMessage}
                  />
                </InputGroup>
              </Card.Body>
            </Card>
          </div>
          <div>
            <Card style={{ width: '30rem' }}>
              <Card.Body>
                {/* set schedule date and time  */}
                <Card.Title>Schedule Date and Time </Card.Title>
                <div style={{ row: '5' }}>
                  <input
                    type="checkbox"
                    checked={isChecked1}
                    onChange={handleCheckboxChange1}
                    className="checkBoxStyle"
                  />
                  <b>Select to Schedule Date and Time</b>
                  {isChecked1 && (
                    <DateTime
                      name="scheduleTime"
                      setMetaData={setMetaData}
                      val={metaData.scheduleTime}
                    />
                  )}
                </div>
                {/* set time to live  */}
                {/* <div style={{ height: '4rem' }}> </div>
                <div>
                  <input
                    type="checkbox"
                    checked={isChecked2}
                    onChange={handleCheckboxChange2}
                    className="checkBoxStyle"
                  />
                  <b>Select to set Lifespan </b>
                  {isChecked2 && (
                    <DateTime
                      name="timeToLive"
                      setMetaData={setMetaData}
                      val={metaData.timeToLive}
                    />
                  )}
                </div> */}
              </Card.Body>
            </Card>
          </div>
        </div>

        <div style={{ margin: '1rem 0' }}>
          <b>Note:</b> Please fill the Title and Message.
        </div>
        <PageHeader
          title="Select Audience"
          icon={<PeopleAltIcon fontSize="medium" />}
        />
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div>
            <input
              type="checkbox"
              checked={teamCheck}
              className="checkBoxStyle"
              onClick={e => {
                if (metaData.NotifTitle && metaData.NotifMessage) {
                  handleTeamCheck(e);
                  setSpecificCheck(false);
                  setSendAllCheck(false);
                } else alert('Please fill the Title and Message');
              }}
            />
            <b>Send to Team</b>
          </div>
          <div>
            <input
              type="checkbox"
              checked={specificCheck}
              className="checkBoxStyle"
              onClick={e => {
                if (metaData.NotifTitle && metaData.NotifMessage) {
                  handleSpecificCheck(e);
                  setSendAllCheck(false);
                  setTeamCheck(false);
                } else alert('Please fill the Title and Message');
              }}
            />
            <b>Send to specific users</b>
          </div>
          <div>
            <input
              type="checkbox"
              checked={sendAllCheck}
              className="checkBoxStyle"
              onClick={e => {
                if (metaData.NotifTitle && metaData.NotifMessage) {
                  handleSendAllCheck(e);
                  setSpecificCheck(false);
                  setTeamCheck(false);
                } else alert('Please fill the Title and Message');
              }}
            />
            <b>Send to all users</b>
          </div>
        </div>
        {metaData.NotifTitle && metaData.NotifMessage && teamCheck && (
          <Row
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              margin: '3rem',
            }}
          >
            <Dropdown
              onSelect={handleSelect}
              style={{ marignLeft: '2rem', padding: '10px' }}
            >
              <Dropdown.Toggle
                style={{ backgroundColor: '#3f51b5' }}
                id="dropdown-basic"
              >
                {selectedOption || 'Select Teams'}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {options.map(option => (
                  <Dropdown.Item key={option} eventKey={option}>
                    {option}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Button
              text="Send Team"
              size="Large"
              onClick={e => {
                const currTime = new Date();
                // const currTime = date.toISOString();
                if(((metaData.scheduleTime < currTime)&&isChecked1) || ((metaData.timeToLive < currTime)&&isChecked2))                 {
                  alert('Please fill the scheduled time correctly.');
                } else {
                  console.log(selectedOption);
                  sendNotifToTeam()
                }
                // console.log((new Date(metaData.scheduleTime)).toISOString(),'njn');
              }}
            ></Button>
          </Row>
        )}
        <div className="row d-flex justify-content-center mt-2 ">
          {metaData.NotifTitle && metaData.NotifMessage && specificCheck && (
            <Button
              text="Select Recepeint"
              size="Large"
              onClick={e => {
                const currTime = new Date();
                // const currTime = date.toISOString();
                if(((metaData.scheduleTime < currTime)&&isChecked1) || ((metaData.timeToLive < currTime)&&isChecked2)) 
                 {
                  alert('Please fill the scheduled time correctly.');
                } else
                  history.push({
                    pathname: '/addClient',
                    state: { data: metaData },
                  });
                // console.log((new Date(metaData.scheduleTime)).toISOString(),'njn');
              }}
            ></Button>
          )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          {metaData.NotifTitle && metaData.NotifMessage && sendAllCheck && (
            <Button
              text="Send All"
              size="Large"
              onClick={e => {
                const currTime = new Date();
                // const currTime = date.toISOString();
                if(((metaData.scheduleTime < currTime)&&isChecked1) || ((metaData.timeToLive < currTime)&&isChecked2)) 
                {
                  alert('Please fill the scheduled time correctly.');
                } else {

                  // console.log(selectedOption,'savb');
                  sendNotifToAll()
                }
              }}
            ></Button>
          )}
        </div>
      </Container>
    </div>
  );
}
