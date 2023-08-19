import {
  styled,
  Card,
  CardContent,
  Typography,
  Divider,
  Paper,
  capitalize
} from "@mui/material";
import React from "react";

const StyledTypography = styled(Typography)(({theme})=>(
  {
      "& .header":{
        textTransform: "uppercase",
        fontFamily:"Poppins",
        fontWeight:"800",
        fontSize:"2rem"
      }
  }
)
)

function CardBar({ title, chart }) {
  
  return (
    <>
      <Card>
        <CardContent>
          <StyledTypography color="textPrimary" className="header" style={{fontSize:'30px'}}>
            {title}
          </StyledTypography>
          <Divider />
          {chart}
        </CardContent>
      </Card>
    </>
  );
}

export { CardBar };
