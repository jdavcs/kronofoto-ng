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
    }
  },
  collections : {
    pathToFeatured: 'http://localhost/fortepan/featured/',
    imgSuffix: '_f.jpg'
  }
};
