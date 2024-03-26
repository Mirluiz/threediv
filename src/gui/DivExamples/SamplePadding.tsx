import { Grid } from "@mui/material";
import React from "react";

const SamplePadding = () => {
  return (
    <Grid
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        sx={{
          width: "100px",
          height: "100px",
          padding: "10px",
          outline: "2px solid red",
        }}
      >
        <Grid
          sx={{
            width: "50px",
            height: "50px",

            background: "blue",
          }}
        ></Grid>
      </Grid>
    </Grid>
  );
};

export { SamplePadding };
