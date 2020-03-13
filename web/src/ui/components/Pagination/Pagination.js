import React from 'react';
import propTypes from 'prop-types';

import {
  LastPage,
  FirstPage,
  ChevronLeft,
  ChevronRight,
} from 'ui/components/Icon';

import IconButton, { SHAPE } from 'ui/components/IconButton';

import Button from './PaginationButton';
import { calcControlButtons } from './calcControlButtons';
import './Pagination.css';

function Pagination({ onPage, page, totalPages }) {
  const buttons = calcControlButtons({ current: page, total: totalPages });

  return (
    <div className="flex w-full">
      <div className="w-10 h-10 mr-2">
        {page > 1 && totalPages > 1 && (
          <IconButton
            onClick={() => onPage(1)}
            icon={FirstPage}
            shape={SHAPE.square}
          >
            Primera página
          </IconButton>
        )}
      </div>
      <div className="w-10 h-10">
        {page > 1 && totalPages > 1 && (
          <IconButton
            onClick={() => onPage(page - 1)}
            icon={ChevronLeft}
            shape={SHAPE.square}
          >
            Página anterior
          </IconButton>
        )}
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="Pagination__buttons hidden">
          {buttons.map(i => (
            <Button onClick={() => onPage(i)} key={i} selected={i === page}>
              {i}
            </Button>
          ))}
        </div>
        <div className="Pagination__currentPage px-2 text-center">
          {`Página ${page}`}
        </div>
      </div>

      <div className="w-10 h-10 mr-2">
        {page < totalPages && (
          <IconButton
            onClick={() => onPage(page + 1)}
            icon={ChevronRight}
            shape={SHAPE.square}
          >
            Página siguiente
          </IconButton>
        )}
      </div>
      <div className="w-10 h-10">
        {page < totalPages && (
          <IconButton
            onClick={() => onPage(totalPages)}
            icon={LastPage}
            shape={SHAPE.square}
          >
            Última página
          </IconButton>
        )}
      </div>
    </div>
  );
}

Pagination.propTypes = {
  page: propTypes.number.isRequired,
  onPage: propTypes.func.isRequired,
  totalPages: propTypes.number.isRequired,
};

export default Pagination;
