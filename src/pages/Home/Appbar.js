import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MuiAppbar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Box, IconButton, useTheme } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import ClearIcon from "@material-ui/icons/Clear";
import EditModeContext from "../../contexts/EditModeContext";
import { useHistory } from "react-router";
import ROUTES from "../../routes";

const useStyles = makeStyles((theme) => ({
  appBarRoot: {
    height: 64,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Appbar({ setEditMode }) {
  const classes = useStyles();
  const theme = useTheme();
  const { isActive: isEditModeActive } = useContext(EditModeContext);
  const history = useHistory();

  return (
    <Box className={classes.appBarRoot} height={64}>
      <MuiAppbar
        position="static"
        color={isEditModeActive ? "secondary" : "primary"}
      >
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Box
              style={{ cursor: "pointer" }}
              onClick={() => history.push(ROUTES.HOME)}
            >
              Book Listing
            </Box>
          </Typography>
          <Box color={theme.palette.common.white}>
            <IconButton
              aria-label="delete"
              color="inherit"
              onClick={() => setEditMode({ isActive: !isEditModeActive })}
            >
              {isEditModeActive ? <ClearIcon /> : <EditIcon />}
            </IconButton>
          </Box>
        </Toolbar>
      </MuiAppbar>
    </Box>
  );
}
