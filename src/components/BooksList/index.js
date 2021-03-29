import { useState } from "react";
import {
  Box,
  IconButton,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { Pagination } from "@material-ui/lab";
import { useQuery } from "react-query";

import BookListItem from "./BookListItem";
import { getList } from "../../request";

const perPage = 4;

export default function BooksList({ author, category }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [sort, setSort] = useState();
  const [order, setOrder] = useState("asc");
  const [search, setSearch] = useState();
  const { data: books, isFetching } = useQuery(
    [
      "books",
      currentPage,
      { author, category, perPage, sort: { sort, order }, search },
    ],
    () =>
      getList({
        resource: "books",
        page: currentPage,
        perPage,
        filters: { author, category },
        search: search && { key: "title", value: search },
        sort: sort && { key: sort, order },
      }),
    { keepPreviousData: true }
  );

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box display="flex" width="100%" mb={2}>
        <Box>
          <TextField
            label="Search by title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>
        <Box
          display="flex"
          flex="1"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Box>
            <Select
              label="Sort by"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <MenuItem value={undefined}>None</MenuItem>
              <MenuItem value="title">Title</MenuItem>
              <MenuItem value="publishYear">Publish year</MenuItem>
            </Select>
          </Box>
          <Box>
            <Tooltip title="Ascending">
              <IconButton onClick={() => setOrder("asc")}>
                <ArrowUpwardIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Box>
            <Tooltip title="Descending">
              <IconButton onClick={() => setOrder("desc")}>
                <ArrowDownwardIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>
      {isFetching && <LinearProgress style={{ width: "100%" }} />}
      <Box>
        {Array.isArray(books && books.data) &&
          books.data.map((book) => (
            <Box mb={3} key={book.id}>
              <BookListItem book={book} />
            </Box>
          ))}
      </Box>
      <Pagination
        count={books && Math.ceil(books.total / perPage) - 1}
        page={currentPage + 1}
        onChange={(e, val) => setCurrentPage(val - 1)}
        color="primary"
      />
    </Box>
  );
}
