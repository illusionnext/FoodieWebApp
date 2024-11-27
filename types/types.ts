export interface Meal {
  id: number;
  title: string;
  slug: string;
  image: string | File;
  summary: string;
  instructions: string;
  creator: string;
  creator_email: string;
}
