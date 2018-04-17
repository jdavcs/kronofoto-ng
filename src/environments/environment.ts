export const environment = {
  production: false,
  pagination: {
    headers: {
      totalRecords : 'Pagination-Total-Records',
      firstRecord  : 'Pagination-First-Record',
      lastRecord   : 'Pagination-Last-Record', 
      totalPages   : 'Pagination-Total-Pages', 
      pageSize     : 'Pagination-Page-Size',
      pageNumber   : 'Pagination-Page-Number' 
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
    imgSuffix: '.jpg',
    pathTo400: 'http://localhost/fortepan/h400/',
    pathTo600: 'http://localhost/fortepan/w600/',
    pathTo700: 'http://localhost/fortepan/h700/'
  }
};
