export interface Collection {
  readonly id: number;
  name: string;
  readonly year_min: number;
  readonly year_max: number;
  readonly item_count: number;
  is_published: boolean;  
  readonly created: Date;
  readonly modified: Date;
  featured_item_id: number;
  readonly donor_id: number;
  readonly donor_first_name: string;
  readonly donor_last_name: string;
}
