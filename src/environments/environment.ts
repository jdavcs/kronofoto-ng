export const environment = {
  production: false,
  pagination: {
    headers: {
      totalRecords      : 'Pagination-Total-Records',
      pageSize          : 'Pagination-Page-Size',
      totalPages        : 'Pagination-Total-Pages', 
      firstRecord       : 'Pagination-First-Record',
      lastRecord        : 'Pagination-Last-Record', 
      currentPageNumber : 'Pagination-Current-Page-Number', 
      currentPageSize   : 'Pagination-Current-Page-Size' 
    },
    pageNumberParameter: 'page',
    pageSizeParameter: 'pagesize'
  },
  collections: {
    columns: 12,
    pathToFeatured: 'http://localhost/fortepan/featured_600x450/',
    imgSuffix: '_600x450.jpg'
  },
  items: {
    columns: 12,
    imgSuffix:     '.jpg',
    pathTo75:      'http://localhost/fortepan/thumbs/',
    pathTo400:     'http://localhost/fortepan/h400/',
    pathTo600:     'http://localhost/fortepan/w600/',
    pathTo700:     'http://localhost/fortepan/h700/',
    pathToOriginal: 'http://localhost/fortepan/originals/'
  }
};
