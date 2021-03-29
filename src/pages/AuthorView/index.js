import { Box, IconButton, Typography } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { useContext } from "react";
import { useQuery } from "react-query";
import { useHistory, useParams } from "react-router";
import BooksList from "../../components/BooksList";
import EditModeContext from "../../contexts/EditModeContext";
import { getOne } from "../../request";
import ROUTES from "../../routes";

export default function AuthorView() {
  const { authorId } = useParams();
  const history = useHistory();
  const { isActive: isEditModeActive } = useContext(EditModeContext);
  if (!authorId) history.replace(ROUTES.HOME);

  const { data: author, isError } = useQuery(["author", authorId], () =>
    getOne("authors", authorId)
  );

  if (isError) {
    history.push(ROUTES.NOT_FOUND);
  }
  return (
    <Box display="flex" flexDirection="column" width="70%">
      {author && (
        <>
          <Box display="flex" flexDirection="column" mb={6}>
            <Box mb={2} display="flex" justifyContent="space-between">
              <Typography variant="h5">{author.name}</Typography>
              {isEditModeActive && (
                <Box>
                  <IconButton
                    onClick={() => history.push(ROUTES.AUTHOR_CREATE, author)}
                  >
                    <EditIcon />
                  </IconButton>
                </Box>
              )}
            </Box>
            <Box mb={2}>
              <Typography variant="h6">{author.jobTitle}</Typography>
            </Box>
            <Typography variant="body2">{author.bio}</Typography>
          </Box>
          <BooksList author={author.id} />
        </>
      )}
    </Box>
  );
}
