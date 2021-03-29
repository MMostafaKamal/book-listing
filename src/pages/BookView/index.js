import { Box, IconButton, Typography } from "@material-ui/core";
import { useQuery } from "react-query";
import { useHistory, useParams } from "react-router";
import { getOne } from "../../request";
import EditIcon from "@material-ui/icons/Edit";
import ROUTES from "../../routes";
import EditModeContext from "../../contexts/EditModeContext";
import { useContext } from "react";
import ImageWithPlaceholder from "../../components/ImageWithPlaceholder/ImageWithPlaceholder";

export default function BookView() {
  const { bookId } = useParams();
  const history = useHistory();
  const { isActive: isEditModeActive } = useContext(EditModeContext);
  if (!bookId) history.replace(ROUTES.HOME);

  const { data: book, isError } = useQuery(["book", bookId], () =>
    getOne("books", bookId)
  );

  const authorId = book && book.author;
  const categoryId = book && book.category;

  const { data: author } = useQuery(
    ["author", authorId],
    () => getOne("authors", authorId),
    {
      enabled: !!book,
    }
  );

  const { data: category } = useQuery(
    ["category", categoryId],
    () => getOne("categories", categoryId),
    {
      enabled: !!book,
    }
  );

  if (isError) {
    history.push(ROUTES.NOT_FOUND);
  }

  return (
    <Box display="flex" flexDirection="column" width="70%">
      {book && (
        <>
          <Box display="flex" mb={2} justifyContent="space-between">
            <Box>
              <Box mb={2}>
                <Typography variant="h5">{book.title}</Typography>
              </Box>
              <Box display="flex">
                <Typography variant="subtitle2">By:&nbsp;</Typography>
                <Typography variant="body2">{author && author.name}</Typography>
              </Box>
              <Box display="flex">
                <Typography variant="subtitle2">
                  Number of pages:&nbsp;
                </Typography>
                <Typography variant="body2">{book.pagesNumber}</Typography>
              </Box>
              <Box display="flex">
                <Typography variant="subtitle2">
                  Publishing year:&nbsp;
                </Typography>
                <Typography variant="body2">{book.publishYear}</Typography>
              </Box>
              <Box display="flex">
                <Typography variant="subtitle2">ISBN:&nbsp;</Typography>
                <Typography variant="body2">{book.isbn}</Typography>
              </Box>
              <Box display="flex">
                <Typography variant="subtitle2">
                  Classification:&nbsp;
                </Typography>
                <Typography variant="body2">
                  {category && category.name}
                </Typography>
              </Box>
            </Box>
            <Box display="flex" justifyContent="flex-end" flex="1">
              {isEditModeActive && (
                <Box mr={2}>
                  <IconButton
                    onClick={() => history.push(ROUTES.BOOK_CREATE, book)}
                  >
                    <EditIcon />
                  </IconButton>
                </Box>
              )}
            </Box>
            <Box>
              <ImageWithPlaceholder
                image={book.image}
                style={{ width: 150, height: 150 }}
              />
            </Box>
          </Box>
          <Box>
            <Typography variant="body2">{book.description}</Typography>
          </Box>
        </>
      )}
    </Box>
  );
}
