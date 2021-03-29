import { Box, IconButton, makeStyles, Typography } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { useContext } from "react";
import { useHistory } from "react-router";
import EditModeContext from "../../contexts/EditModeContext";
import ROUTES from "../../routes";
import ImageWithPlaceholder from "../ImageWithPlaceholder/ImageWithPlaceholder";

const useStyles = makeStyles({
  image: {
    width: 150,
    height: 150,
  },
});

export default function BookListItem({ book }) {
  const classes = useStyles();
  const history = useHistory();
  const { isActive: isEditModeActive } = useContext(EditModeContext);
  if (!book) return null;
  return (
    <Box
      height="150px"
      display="flex"
      style={{
        cursor: "pointer",
      }}
      onClick={() => history.push(ROUTES.BOOK_DETAILS_NAVIGATE(book.id))}
    >
      <Box display="flex">
        <ImageWithPlaceholder
          image={book.image}
          style={{ width: 150, height: 150 }}
        />
      </Box>
      <Box display="flex" flexDirection="column" p={1} pl={2} pt={0}>
        <Box mb={1} display="flex" justifyContent="space-between">
          <Typography variant="h5">{book.title}</Typography>
          {isEditModeActive && (
            <Box>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  history.push(ROUTES.BOOK_CREATE, book);
                }}
              >
                <EditIcon />
              </IconButton>
            </Box>
          )}
        </Box>
        <Box>
          <Typography variant="body2">{book.description}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
