const ROUTES = {
  HOME: "/",
  BOOK_DETAILS: "/books/:bookId",
  BOOK_DETAILS_NAVIGATE: (bookId) => `/books/${bookId}`,
  AUTHOR_DETAILS: "/authors/:authorId",
  AUTHOR_DETAILS_NAVIGATE: (authorId) => `/authors/${authorId}`,
  CATEGORY_DETAILS: "/categories/:categoryId",
  CATEGORY_DETAILS_NAVIGATE: (categoryId) => `/categories/${categoryId}`,
  BOOK_CREATE: "/books/new",
  AUTHOR_CREATE: "/authors/new",
  CATEGORY_CREATE: "/categories/new",
  BOOK_EDIT: "/books/:bookId/edit",
  AUTHOR_EDIT: "/authors/:authorId/edit",
  CATEGORY_EDIT: "/categories/:categoryId/edit",
  NOT_FOUND: "/notfound",
};
export default ROUTES;
