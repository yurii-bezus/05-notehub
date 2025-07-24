import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  pageCount: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ pageCount, onPageChange }: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      marginPagesDisplayed={1}
      pageRangeDisplayed={2}
      nextLabel="→"
      previousLabel="←"
      containerClassName={css.pagination}
      activeClassName={css.active}
    />
  );
}
