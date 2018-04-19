export class PaginationData {
  constructor(
    readonly totalRecords: number,
    readonly pageSize: number, 
    readonly totalPages: number,
    readonly firstRecord: number,
    readonly lastRecord: number,
    readonly currentPageNumber: number,
    readonly currentPageSize: number
  ) {}
}
