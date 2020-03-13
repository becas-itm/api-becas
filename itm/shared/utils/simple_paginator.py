from math import ceil


FIRST_PAGE = 1

RESULTS_PER_PAGE = 10


class SimplePaginator:
    def __init__(self, current_page, per_page=RESULTS_PER_PAGE):
        self.current_page = current_page
        self._per_page = per_page

    @property
    def per_page(self):
        return self._per_page

    @property
    def skip(self):
        return self._per_page * (self.current_page - 1)

    def paginate(self, data):
        results, total = data
        pagination = {'results': results}
        pagination.update(self.controls(total))
        return pagination

    def controls(self, total_results):
        total_pages = self.calc_total_pages(total_results)
        return {
            'prevPage': self.get_prev_page(total_pages),
            'currentPage': self.current_page,
            'nextPage': self.get_next_page(total_pages),
            'totalPages': total_pages,
        }

    def calc_total_pages(self, total_results):
        return ceil(total_results / self._per_page)

    def get_prev_page(self, total_pages):
        if self.current_page == FIRST_PAGE or self.current_page > total_pages:
            return None

        return self.current_page - 1

    def get_next_page(self, total_pages):
        if self.current_page >= total_pages:
            return None

        return self.current_page + 1
