import { Box, Button, TextField, Typography } from "@material-ui/core";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useHistory, useLocation } from "react-router";

import { add, edit } from "../../request";
import ROUTES from "../../routes";

export default function AuthorCreate() {
  const { state: existingAuthor } = useLocation();
  const queryClient = useQueryClient();
  const history = useHistory();
  const [name, setName] = useState(existingAuthor && existingAuthor.name);
  const [jobTitle, setJobTitle] = useState(
    existingAuthor && existingAuthor.jobTitle
  );
  const [bio, setBio] = useState(existingAuthor && existingAuthor.bio);
  const isFormValid = name && jobTitle && bio;

  const { mutate: addAuthor, isLoading } = useMutation(
    (author) =>
      existingAuthor
        ? edit("authors", existingAuthor.id, author)
        : add("authors", author),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("authors");
        existingAuthor &&
          queryClient.invalidateQueries(["author", existingAuthor.id]);
        history.push(ROUTES.AUTHOR_DETAILS_NAVIGATE(data.id));
      },
    }
  );
  return (
    <Box display="flex" flexDirection="column">
      <Box mb={2}>
        <Typography variant="h5">Add Author</Typography>
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
        <Box mb={2}>
          <TextField
            label="Job Title"
            variant="outlined"
            fullWidth
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Bio"
            multiline
            variant="outlined"
            fullWidth
            rows={5}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </Box>
      </Box>
      <Box>
        <Button
          color="primary"
          fullWidth
          variant="contained"
          disabled={!isFormValid || isLoading}
          onClick={() =>
            addAuthor({
              name,
              jobTitle,
              bio,
            })
          }
        >
          Add
        </Button>
        {existingAuthor && (
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
