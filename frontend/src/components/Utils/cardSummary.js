
import { Card, CardHeader, CardContent, Typography, Divider } from "@mui/material";
import React from "react";

function CardSummary({ title, value, footer }) {
  return (
    <>
      <Card>
        <CardHeader
           title = {title}
           style={{backgroundColor: "rgb(18 4 105)",color:"white"}}
        />
        <CardContent>     
          <Typography variant="h3" color="textPrimary">
            {value}
          </Typography>
          <div>{footer}</div>
        </CardContent>
      </Card>
    </>
  );
}

export { CardSummary };
