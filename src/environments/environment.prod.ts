export const environment = {
  production: true,
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
    pathToFeatured: 'http://134.161.122.73:8080/archive/featured_600x450/',
    imgSuffix: '_600x450.jpg'
  },
  items: {
    columns: 12,
    imgSuffix:      '.jpg',
    pathTo75:       'http://134.161.122.73:8080/archive/thumbs/',
    pathTo400:      'http://134.161.122.73:8080/archive/h400/',
    pathTo600:      'http://134.161.122.73:8080/archive/w600/',
    pathTo700:      'http://134.161.122.73:8080/archive/h700/',
    pathToOriginal: 'http://134.161.122.73:8080/archive/originals/'
  }
};
