import PlusCircle from "../Icons/PlusCircle.png";
import { Button, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

function ButtonAdd({ to, title, icon }) {
  return (
    <NavLink to={to}>
      <Button
        variant="contained"
        style={{ backgroundColor: "#79C9FF"}}
      >
        <Typography style={{ marginRight: "8px" }}>
          <img
            src={icon ? icon : PlusCircle}
            style={{ width: "26px", height: "26px" }}
            alt=""
          />
        </Typography>
        <Typography variant="h4" style={{ color: "black", fontWeight: "400" }}>
          {title}
        </Typography>
      </Button>
    </NavLink>
  );
}

export default ButtonAdd;
