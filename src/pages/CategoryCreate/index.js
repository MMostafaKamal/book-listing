import { Box, Button, TextField, Typography } from "@material-ui/core";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useHistory, useLocation } from "react-router";
import { add, edit } from "../../request";
import ROUTES from "../../routes";

export default function CategoryCreate() {
  const { state: existingCategory } = useLocation();
  const queryClient = useQueryClient();
  const history = useHistory();
  const [name, setName] = useState(existingCategory && existingCategory.name);
  const isFormValid = name;

  const { mutate: addCategory, isLoading } = useMutation(
    (category) =>
      existingCategory
        ? edit("categories", existingCategory.id, category)
        : add("categories", category),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("categories");
        existingCategory &&
          queryClient.invalidateQueries(["category", existingCategory.id]);
        history.push(ROUTES.CATEGORY_DETAILS_NAVIGATE(data.id));
      },
    }
  );
  return (
    <Box display="flex" flexDirection="column">
      <Box mb={2}>
        <Typography variant="h5">Add Category</Typography>
      </Box>
      <Box mb={2}>
        <Box mb={2}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>
      </Box>
      <Box>
        <Button
          color="primary"
          fullWidth
          variant="contained"
          disabled={!isFormValid || isLoading}
          onClick={() => addCategory({ name })}
        >
          {existingCategory ? "Edit" : "Add"}
        </Button>
        {existingCategory && (
          <Box mt={2}>
            <Button
              color="default"
              fullWidth
              variant="contained"
              onClick={() => history.goBack()}
            >
              Cancel
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
