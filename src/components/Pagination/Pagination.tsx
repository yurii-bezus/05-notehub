import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  pageCount: number;
  onPageChange: (selected: number) => void;
}

const Pagination = ({ pageCount, onPageChange }: PaginationProps) => {
  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={2}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      containerClassName={css.pagination}
      activeClassName={css.active}
    />
  );
};

export default Pagination;
