import React from 'react';
import { ArrowForward, ArrowBack } from 'ui/components/Icon';

export default function PaginationControls({
  prevPage,
  nextPage,
  onPrev = () => {},
  onNext = () => {},
}) {
  const handleBackClick = () => onPrev(prevPage);
  const handleForwardClick = () => onNext(nextPage);

  return (
    <div className="flex mt-4 px-4 md:px-0">
      <div className="w-1/2 mr-2">
        {!!prevPage && (
          <button
            onClick={handleBackClick}
            className="flex justify-start w-full p-4 hover:bg-gray-300 focus:bg-gray-300 text-gray-400 hover:text-gray-500 focus:text-gray-500 focus:outline-none rounded"
          >
            <ArrowBack auto className="w-12 h-12 text-current mr-2" />
            <div className="inline-block text-left">
              <div className="text-gray-600 text-sm">Anterior</div>
              <div className="font-semibold text-black">Página {prevPage}</div>
            </div>
          </button>
        )}
      </div>

      <div className="w-1/2 ml-2">
        {!!nextPage && (
          <button
            onClick={handleForwardClick}
            className="flex justify-end w-full p-4 hover:bg-gray-300 focus:bg-gray-300 text-gray-400 hover:text-gray-500 focus:text-gray-500 focus:outline-none rounded"
          >
            <div className="inline-block text-right">
              <div className="text-gray-600 text-sm">Siguiente</div>
              <div className="font-semibold text-black">Página {nextPage}</div>
            </div>
            <ArrowForward auto className="w-12 h-12 text-current ml-2" />
          </button>
        )}
      </div>
    </div>
  );
}
