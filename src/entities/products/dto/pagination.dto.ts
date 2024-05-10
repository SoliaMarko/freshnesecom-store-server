class PageMetaDTO {
  constructor(page: number, itemsPerPage: number, itemsCount: number) {
    this.page = page;
    this.itemsPerPage = itemsPerPage;
    this.itemsCount = itemsCount;
    this.pagesCount = Math.ceil(this.itemsCount / this.itemsPerPage);
    this.hasPreviousPage = this.page > 0;
    this.hasNextPage = this.page < this.pagesCount - 1;
  }

  readonly page: number;
  readonly itemsPerPage: number;
  readonly itemsCount: number;
  readonly pagesCount: number;
  readonly hasPreviousPage: boolean;
  readonly hasNextPage: boolean;
}

export class PaginatedDTO<T> {
  constructor(data: T[], page: number, itemsPerPage: number, itemsCount: number) {
    this.data = data;
    this.meta = new PageMetaDTO(page, itemsPerPage, itemsCount);
  }

  readonly data: T[];
  readonly meta: PageMetaDTO;
}
