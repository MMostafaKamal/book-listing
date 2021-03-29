import { Box, IconButton, Typography } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { useContext } from "react";
import { useQuery } from "react-query";
import { useHistory, useParams } from "react-router";
import BooksList from "../../components/BooksList";
import EditModeContext from "../../contexts/EditModeContext";
import { getOne } from "../../request";
import ROUTES from "../../routes";

export default function CategoryView() {
  const { categoryId } = useParams();
  const history = useHistory();
  const { isActive: isEditModeActive } = useContext(EditModeContext);
  if (!categoryId) history.replace(ROUTES.HOME);

  const { data: category, isError } = useQuery(["category", categoryId], () =>
    getOne("categories", categoryId)
  );

  if (isError) {
    history.push(ROUTES.NOT_FOUND);
  }

  return (
    <Box display="flex" flexDirection="column">
      {category && (
        <>
          <Box mb={2} display="flex">
            <Typography variant="h5">{category.name}</Typography>
            {isEditModeActive && (
              <Box ml={4} mt={-1}>
                <IconButton
                  onClick={() => history.push(ROUTES.CATEGORY_CREATE, category)}
                >
                  <EditIcon />
                </IconButton>
              </Box>
            )}
          </Box>
          <BooksList category={category.id} />
        </>
      )}
    </Box>
  );
}
