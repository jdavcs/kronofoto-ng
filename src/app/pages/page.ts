export interface Page {
  readonly id: number;
  readonly slug: string;
  readonly title: string;
  readonly body: string;
  readonly created: Date;
  readonly modified: Date;
}
