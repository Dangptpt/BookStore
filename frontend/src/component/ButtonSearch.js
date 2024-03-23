import { Button, Typography } from "@mui/material";
import { click } from "@testing-library/user-event/dist/click";

function ButtonSearch({ title, border, onclick }) {
  return (
    <Button
      variant="contained"
      style={{
        backgroundColor: "#79C9FF",
        // border: border ? border : "2px solid #333",
        margin: "30px 0px",
      }}
      onClick={onclick ? onclick : ''}
    >
      <Typography variant="h4" style={{ color: "black", fontWeight: "400" }}>
        {title}
      </Typography>
    </Button>
  );
}

export default ButtonSearch;
