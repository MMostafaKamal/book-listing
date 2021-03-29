import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Box } from "@material-ui/core";
import { useHistory } from "react-router";
import ROUTES from "../../routes";

export default function Sidebar(props) {
  const { categories, authors } = props;
  const history = useHistory();
  return (
    <Box>
      <Box
        height={400}
        style={{
          overflowY: "scroll",
        }}
      >
        <List>
          {Array.isArray(categories) &&
            categories.map((category) => (
              <ListItem
                button
                key={category.id}
                onClick={() =>
                  history.push(ROUTES.CATEGORY_DETAILS_NAVIGATE(category.id))
                }
              >
                <ListItemText primary={category.name} />
              </ListItem>
            ))}
        </List>
      </Box>
      <Divider />
      <Box
        height={400}
        style={{
          overflowY: "scroll",
        }}
      >
        <List>
          {Array.isArray(authors) &&
            authors.map((author) => (
              <ListItem
                button
                key={author.id}
                onClick={() =>
                  history.push(ROUTES.AUTHOR_DETAILS_NAVIGATE(author.id))
                }
              >
                <ListItemText primary={author.name} />
              </ListItem>
            ))}
        </List>
      </Box>
    </Box>
  );
}
