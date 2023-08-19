import React from 'react'
import { styled } from '@mui/material/styles';
import { Paper, Card, Typography, Button } from '@mui/material';


const StyledPaper = styled(Paper)(({theme})=>(
    {
        "& .root":{
            backgroundColor: '#fdfdff'
        },
        "& .pageHeader": {
            padding:theme.spacing(4),
            display:'flex',
            marginBottom:theme.spacing(2)
        },
        "& .pageIcon": {
            display:'inline-block',
            padding:theme.spacing(2),
            color:'#3c44b1'
        },
        "& .pageTitle": {
            paddingLeft:theme.spacing(4),
            '& .MuiTypography-subtitle2':{
                opacity:'0.6'
            }
        }
    }
)
)

export default function PageHeader(props) {

    const { title, subTitle, icon } = props;
    return (
        <StyledPaper elevation={0} square className="root">
            <div className="pageHeader">
                <Card className="pageIcon">
                    {icon}
                </Card>
                <div className="pageTitle">
                    <Typography
                        variant="h6"
                        component="div">
                        {title}</Typography>
                    <Typography
                        variant="subtitle2"
                        component="div">
                        {subTitle}</Typography>
                </div>
            </div>
        </StyledPaper>
    );
}
