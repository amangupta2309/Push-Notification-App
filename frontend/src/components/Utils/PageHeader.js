import React from 'react'
import { styled } from '@mui/material/styles';
import { Paper, Typography } from '@mui/material';

const StyledPaper = styled(Paper)(({theme})=>(
    {
        "& .root":{
            backgroundColor: '#fdfdff'
        },
        "& .pageHeader": {
            padding:theme.spacing(4),
            display:'flex',
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


    const { title } = props;
    return (
        <StyledPaper elevation={0} square className="root">
            <div className="pageHeader">
                <div className="pageTitle">
                    <Typography
                        variant="h6"
                        component="div">
                        {title}</Typography>
                </div>
            </div>
        </StyledPaper>
    );
}
