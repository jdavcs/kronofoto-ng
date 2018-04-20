export interface Donor {
  readonly id: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly itemCount: number;
  readonly collectionCount: number;
  readonly created: Date;
  readonly modified: Date;
}
