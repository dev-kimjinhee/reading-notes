export class NoteModel {
  // id?: string;
  bookIsbn?: string;
  status?: string; // todo, doing, done
  review?: string;
  oneLineReviews?: string;
  favoriteParses?: Array<string>;
  score?: string;
  startDate?: string;
  endDate?: string;
}
