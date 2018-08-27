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
  media: {
    baseUrl: 'http://localhost/kronofoto-static'
  },
  collections: {
    columns: 12,
    pathToFeatured: '/featured_600x450/',
    imgSuffix: '_600x450.jpg'
  },
  items: {
    columns: 12,
    imgSuffix:      '.jpg',
    pathTo75:       '/thumbs/',
    pathTo400:      '/h400/',
    pathTo600:      '/w600/',
    pathTo700:      '/h700/',
    pathToOriginal: '/originals/'
  },
  api: {
    urlPrefix: ''
  }
};
