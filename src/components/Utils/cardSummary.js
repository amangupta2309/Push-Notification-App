import { makeStyles } from "@material-ui/core/styles";
import { Card, CardHeader, CardContent, Typography, Divider } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(() => ({
  header: {
    textTransform: "uppercase"
  }
}));

function CardSummary({ title, value, footer }) {
  const classes = useStyles();
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
