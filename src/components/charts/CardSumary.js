import { Card, CardContent, Typography, Divider, CardMedia, Box, styled } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/material";

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
          <Typography variant="h3" color="textPrimary">
            {value}
          </Typography>
          <div>{footer}</div>
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
              sx={{ height: "6em", aspectRatio: "16:9", width: "auto" }}
              image={img}
              alt={value}
            />
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h7" style={{ wordWrap: "break-word" }}>
                {value}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div" style={{ wordWrap: "break-word" }}>
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