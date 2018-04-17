export interface Collection {
  readonly id: number;
  readonly name: string;
  readonly yearMin: number;
  readonly yearMax: number;
  readonly itemCount: number;
  readonly isPublished: boolean;  
  readonly created: Date;
  readonly modified: Date;
  readonly featuredItemIdentifier: string;
  readonly donorId: number;
  readonly donorFirstName: string;
  readonly donorLastName: string;
}
