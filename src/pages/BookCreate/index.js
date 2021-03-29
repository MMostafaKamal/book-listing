import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useHistory, useLocation } from "react-router";
import { add, edit, getList } from "../../request";
import ROUTES from "../../routes";

export default function BookCreate() {
  const { state: existingBook } = useLocation();
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

  const [title, setTitle] = useState(existingBook && existingBook.title);
  const [category, setCategory] = useState(
    existingBook && existingBook.category
  );
  const [author, setAuthor] = useState(existingBook && existingBook.author);
  const [description, setDescription] = useState(
    existingBook && existingBook.description
  );
  const [isbn, setIsbn] = useState(existingBook && existingBook.isbn);
  const [pagesNumber, setPagesNumber] = useState(
    existingBook && existingBook.pagesNumber
  );
  const [publishYear, setPublishYear] = useState(
    existingBook && existingBook.publishYear
  );
  const [image, setImage] = useState(existingBook && existingBook.image);

  const isFormValid =
    title &&
    category &&
    author &&
    description &&
    isbn &&
    pagesNumber &&
    publishYear &&
    image;

  const queryClient = useQueryClient();
  const history = useHistory();

  const { mutate: addBook, isLoading } = useMutation(
    (book) =>
      existingBook ? edit("books", existingBook.id, book) : add("books", book),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("books");
        existingBook &&
          queryClient.invalidateQueries(["book", existingBook.id]);
        history.push(ROUTES.BOOK_DETAILS_NAVIGATE(data.id));
      },
    }
  );

  return (
    <Box display="flex" flexDirection="column">
      <Box mb={2}>
        <Typography variant="h5">Add Book</Typography>
      </Box>
      <Box mb={2}>
        <Box mb={2}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Box>
        <Box display="flex" mb={2}>
          <Box mb={2} mr={2} width="50%">
            <Select
              label="Category"
              variant="outlined"
              fullWidth
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            >
              {authors &&
                Array.isArray(authors.data) &&
                authors.data.map((author) => (
                  <MenuItem value={author.id}>{author.name}</MenuItem>
                ))}
            </Select>
          </Box>
          <Box width="50%">
            <Select
              label="Author"
              variant="outlined"
              fullWidth
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories &&
                Array.isArray(categories.data) &&
                categories.data.map((category) => (
                  <MenuItem value={category.id}>{category.name}</MenuItem>
                ))}
            </Select>
          </Box>
        </Box>
        <Box mb={2}>
          <TextField
            label="Description"
            multiline
            variant="outlined"
            fullWidth
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="ISBN"
            variant="outlined"
            fullWidth
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
          />
        </Box>
        <Box display="flex">
          <Box width="50%" mb={2} mr={2}>
            <TextField
              label="Number Of Pages"
              variant="outlined"
              fullWidth
              value={pagesNumber}
              onChange={(e) => setPagesNumber(e.target.value)}
              type="number"
            />
          </Box>
          <Box width="50%">
            <TextField
              label="Publishing Year"
              variant="outlined"
              fullWidth
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              type="number"
            />
          </Box>
        </Box>
        <TextField
          label="Image URL"
          variant="outlined"
          fullWidth
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </Box>
      <Box>
        <Button
          color="primary"
          fullWidth
          variant="contained"
          disabled={!isFormValid || isLoading}
          onClick={() =>
            addBook({
              author,
              category,
              title,
              isbn,
              description,
              publishYear,
              pagesNumber,
              image,
            })
          }
        >
          {existingBook ? "Edit" : "Add"}
        </Button>
        {existingBook && (
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
