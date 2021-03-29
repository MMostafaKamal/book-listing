import { Box, Grid, makeStyles } from "@material-ui/core";
import { SpeedDial } from "@material-ui/lab";
import { useQuery } from "react-query";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import BookIcon from "@material-ui/icons/Book";
import PersonIcon from "@material-ui/icons/Person";
import CategoryIcon from "@material-ui/icons/Category";

import _includes from "lodash/includes";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import BooksList from "../../components/BooksList";
import RestrictedRoute from "../../components/RestrictedRoute";
import { getList } from "../../request";
import routes from "../../routes";
import AuthorCreate from "../AuthorCreate";
import AuthorView from "../AuthorView";
import BookCreate from "../BookCreate";
import BookView from "../BookView";
import CategoryCreate from "../CategoryCreate";
import CategoryView from "../CategoryView";
import NotFound from "../NotFound";

import Appbar from "./Appbar";
import Sidebar from "./Sidebar";
import { useEffect, useRef, useState } from "react";
import ROUTES from "../../routes";
import EditModeContext from "../../contexts/EditModeContext";

const useStyles = makeStyles((theme) => ({
  appBarContainer: {
    zIndex: theme.zIndex.drawer + 1,
  },
  mainContainer: {
    padding: theme.spacing(3),
  },
  speedDial: {
    position: "absolute",
    "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
      bottom: theme.spacing(6),
      right: theme.spacing(6),
    },
    "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
      top: theme.spacing(2),
      left: theme.spacing(2),
    },
  },
}));

const actions = [
  { icon: <BookIcon />, name: "Add Book", route: ROUTES.BOOK_CREATE },
  { icon: <PersonIcon />, name: "Add Author", route: ROUTES.AUTHOR_CREATE },
  {
    icon: <CategoryIcon />,
    name: "Add Category",
    route: ROUTES.CATEGORY_CREATE,
  },
];

export default function Home() {
  const { data: authors } = useQuery(["authors"], () =>
    getList({
      resource: "authors",
    })
  );

  const { data: categories } = useQuery(["categories"], () =>
    getList({
      resource: "categories",
    })
  );

  const [editMode, setEditMode] = useState({ isActive: false });

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const history = useHistory();

  const classes = useStyles();
  return (
    <EditModeContext.Provider value={editMode}>
      <Box display="flex">
        <Grid container>
          <Grid item xs={12} className={classes.appBarContainer}>
            <Appbar setEditMode={setEditMode} />
          </Grid>
          <Grid container>
            <Grid item xs="auto">
              <Sidebar
                categories={categories && categories.data}
                authors={authors && authors.data}
              />
            </Grid>
            <Grid item xs={9} className={classes.mainContainer}>
              <Switch>
                <Route exact path={routes.HOME}>
                  <BooksList />
                </Route>
                <Route exact path={routes.BOOK_CREATE}>
                  <BookCreate />
                </Route>
                <RestrictedRoute exact path={routes.AUTHOR_CREATE}>
                  <AuthorCreate />
                </RestrictedRoute>
                <RestrictedRoute exact path={routes.CATEGORY_CREATE}>
                  <CategoryCreate />
                </RestrictedRoute>
                <Route exact path={routes.BOOK_DETAILS}>
                  <BookView />
                </Route>
                <Route exact path={routes.AUTHOR_DETAILS}>
                  <AuthorView />
                </Route>
                <Route exact path={routes.CATEGORY_DETAILS}>
                  <CategoryView />
                </Route>
                <RestrictedRoute exact path={routes.BOOK_EDIT}>
                  <BookCreate />
                </RestrictedRoute>
                <RestrictedRoute exact path={routes.AUTHOR_EDIT}>
                  <AuthorCreate />
                </RestrictedRoute>
                <RestrictedRoute exact path={routes.CATEGORY_EDIT}>
                  <CategoryCreate />
                </RestrictedRoute>
                <Route exact path={routes.NOT_FOUND}>
                  <NotFound />
                </Route>
              </Switch>
            </Grid>
            <Box>
              <SpeedDial
                ariaLabel="Add resources"
                className={classes.speedDial}
                icon={<SpeedDialIcon />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
                direction="up"
              >
                {actions.map((action) => (
                  <SpeedDialAction
                    title={
                      !editMode.isActive &&
                      _includes(
                        [ROUTES.CATEGORY_CREATE, ROUTES.AUTHOR_CREATE],
                        action.route
                      )
                        ? "Edit mode must be activated first"
                        : action.name
                    }
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={() => {
                      if (
                        !editMode.isActive &&
                        _includes(
                          [ROUTES.CATEGORY_CREATE, ROUTES.AUTHOR_CREATE],
                          action.route
                        )
                      )
                        return;
                      history.push(action.route);
                      handleClose();
                    }}
                  />
                ))}
              </SpeedDial>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </EditModeContext.Provider>
  );
}
