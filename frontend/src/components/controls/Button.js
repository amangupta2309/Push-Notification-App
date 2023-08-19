import React from 'react'
import { styled } from '@mui/material/styles';
import { Button as MuiButton } from "@mui/material";


const StyledMuiButton = styled(MuiButton)(({theme})=>(
    {
        "& .root":{
            margin: theme.spacing(0.5)
        },
        "& .label": {
            textTransform: 'none'
        }
    }
)
)

export default function Button(props) {

    const { text, size, color, variant, onClick, ...other } = props


    return (
        <StyledMuiButton
            variant={variant || "contained"}
            size={size || "large"}
            color={color || "primary"}
            onClick={onClick}
            {...other}
            classeName='root label'>
            {text}
        </StyledMuiButton>
    );
}
