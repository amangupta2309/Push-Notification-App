import './DateTime.css';
import React from 'react';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';

console.log(new Date());
export default function DateTime({ name, val, setMetaData }) {
  return (
    <>
      <div>
        <DateTimePickerComponent
          placeholder="Choose a date and time"
          value={new Date(val)}
          min={new Date()}
          max={
            new Date(new Date().getFullYear(), new Date().getMonth(), +28)
          }
          format="yyyy-MM-dd HH:mm"
          step={60}
          onChange={e => {
            // console.log(e.target.value);
            let date = new Date(e.target.value);
            // console.log(date)
            setMetaData(prev => {
              return {
                ...prev,
                [name]: date,
              };
            });
          }}
        ></DateTimePickerComponent>
      </div>
    </>
  );
}
