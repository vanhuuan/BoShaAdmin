import { Card, CardContent, Typography, Divider, CardMedia, Box, styled } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/material";
import '../../css/cardsumary.css'

function CardSummary({ title, value, footer }) {
  return (
    <>
      <Card sx={{ height: "10em" }}>
        <CardContent>
          <Typography
            gutterBottom
            color="textPrimary"
          >
            {title}
          </Typography>
          <Divider />
          <Typography variant="h4" color="textPrimary">
            {value}
          </Typography>
          <h5 style={{margin: 0, fontWeight: `500`}}>{footer}</h5>
        </CardContent>
      </Card>
    </>
  );
}

function CardBookSummary({ title, value, footer, img }) {
  return (
    <>
      <Card sx={{ height: "10em" }}>
        <CardContent>
          <Typography
            gutterBottom
            color="textPrimary"
          >
            {title}
          </Typography>
          <Divider />
          <Box sx={{ display: 'flex'}}>
            <CardMedia
              component="img"
              sx={{ height: "5em", aspectRatio: "16:9", width: "auto", marginTop: `0.3em` }}
              image={img}
              alt={value}
            />
            <CardContent style={{padding: '0.4em'}} >
              {/* <Typography component="div" variant="h5" style={{ wordWrap: "break-word" }}>
                {value}
              </Typography> */}
              <h5 className='line-clamp'>
                {value}
              </h5>
              <Typography variant="subtitle2" color="text.secondary" component="div" style={{ wordWrap: "break-word" }}>
                {footer}
              </Typography>
            </CardContent>

          </Box>
        </CardContent>
      </Card>
    </>
  );
}

export { CardSummary, CardBookSummary };