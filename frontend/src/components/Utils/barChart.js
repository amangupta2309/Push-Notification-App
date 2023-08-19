import {useEffect} from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

 var database = [];
async function getData(){
  const response = await axios.get('https://push-notifications-513j.onrender.com/analytics')
      var objectLength = Object.keys(response.data).length;
      // console.log(objectLength);
      for (const key in response.data) {
          if(objectLength===1)
          break;
          database.push(response.data[key]);
           objectLength--;
          }
    }


 getData();


const Barchart = () => {

  
  return (
  <Paper>
    <div style={{display:'flex', marginLeft: 'auto', marginRight: 'auto', width: '100%', height: '300px'}}>
      <BarChart
        data={database}
        width={700}
        height={300}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Date" style={{fontSize:"8"}}/>
        <YAxis />
        <Tooltip/>
        <Legend position="bottom" sx={{ display: 'flex', margin: 'auto', flexDirection: 'row'}}/>
        <Bar dataKey="Sends" fill="#8884d8" />
        <Bar dataKey="Received" fill="#82ca9d" />
      </BarChart>
    </div>
  </Paper>
  );
}

export {Barchart}
