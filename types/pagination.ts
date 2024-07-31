export type Pagination<T> = {
  data: Array<T>;
  limit: number;
  page: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
  totalItems: number;
  totalPages: number;
};
