export interface Item {
  readonly id: number;
  readonly identifier: string;
  readonly collectionId: number;
  readonly latitude: number;
  readonly longitude: number;
  readonly yearMin: number;
  readonly yearMax: number;
  readonly isPublished: boolean;
  readonly created: Date;
  readonly modified: Date;
}
