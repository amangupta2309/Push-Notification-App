import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useLocation, useHistory } from 'react-router-dom';
import PageHeader from '../Utils/PageHeader';
import { Paper, TableBody, TableRow, TableCell, Toolbar, Checkbox, InputAdornment } from '@mui/material';
import useTable from '../Utils/useTable';
import Controls from '../controls/Controls';
import { Search } from '@mui/icons-material';

const StyledRoot = styled('div')(({theme})=>(
  {
      "& .pageContent":{
        margin: 0,
        padding: theme.spacing(2),
      },
      "& .searchInput": {
        width: '75%'
      }
  }
)
)

// extracting notification details

const headCells = [
  // {<Checkbox />},
  { id: 'istarget', label: 'Select' },
  { id: 'clientName', label: 'Name' },
  { id: 'clientEmail', label: 'Email' },
  { id: 'clientStatus', label: 'Status' },
];

export default function AddClient(props) {

const history = useHistory();
  const [apiResponse, setApiResponse] = useState({});

  const location = useLocation();

  useEffect(() => {
    console.log('hi');
    console.log(location.state.data, 'hi');
  }, [location]);

  useEffect(() => {
    axios
      .get("https://push-notifications-513j.onrender.com/getusers")
      .then(response => {
        // console.log(response,"chjk")
        setApiResponse({ ...apiResponse, ...response.data });
      })
      .catch(err => console.log(err));
  }, []);
  console.log(apiResponse,"hiii");

  const [filterFn, setFilterFn] = useState({
    fn: userData => {
      return userData;
    },
  });

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(Object.values(apiResponse), headCells, filterFn);

  const handleSearch = e => {
    let target = e.target;
    setFilterFn({
      fn: userData => {
        // console.log(userData);
        if (target.value === '') return userData;
        else
          return userData.filter(x =>
            x.name.toLowerCase().includes(target.value.toLowerCase())
          );
      },
    });
  };

  var token = [];
  const handleToken = e => {
    if (token[token.indexOf(e.target.value)] === e.target.value) {
      token[token.indexOf(e.target.value)] = 'none';
    } else if (token.indexOf('none') > -1) {
      token[token.indexOf('none')] = e.target.value;
    } else {
      token.push(e.target.value);
    }
    console.log(token);
  };

  const sendNotif = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: location.state.data.NotifTitle,
        topic: location.state.data.NotifTopic,
        message: location.state.data.NotifMessage,
        token: token,
        schedule: location.state.data.scheduleTime,
        timeToLive: 100
      }),
     
    };
    
    console.log(requestOptions.body);
    fetch("https://push-notifications-513j.onrender.com/notify", requestOptions)
      .then(response => response.json())
      .then(data => console.log(data));

      history.push({
        pathname: '/alert',
      });
  };


  return (
    <StyledRoot className="mx-5 mt-4">
      <PageHeader title="Send Notification" />
      <Paper>
        <Toolbar className='pageContent'>
          <Controls.Input
            label="Search"
            className="searchInput"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            // onChange={handleSearch}
          />
          
          {/* <FormControlLabel className="ml-3" control={<Checkbox  color="primary"/>} label="Select All"  onChange={selectAll}/> */}
         
          <button className="btn btn-primary ml-2"  onClick={sendNotif} >
            Send Notification
          </button>
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map(userData => (
              <TableRow key={userData.id}>
                {userData.email.status === 'Online' && (
                  <Checkbox value={userData.token} color="primary" onChange={handleToken}  />
                )}
                {userData.email.status === 'Online' && (
                  <TableCell>{userData.name}</TableCell>
                )}
                {userData.email.status === 'Online' && (
                  <TableCell>{userData.email.email}</TableCell>
                )}
                {userData.email.status === 'Online' && (
                  <TableCell>{"Online"}</TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
    </StyledRoot>
  );
}
