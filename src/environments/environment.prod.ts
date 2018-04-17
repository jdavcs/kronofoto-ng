export const environment = {
  production: true,
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
    pathToFeatured: 'TODO',
    imgSuffix: '_f.jpg'
  },
  items: {
    columns: 12,
    imgSuffix: '.jpg'
  }
};
