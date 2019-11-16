import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BookModel } from '../common/dto/book.dto';
import { NoteModel } from '../common/dto/note.dto';

@Component({
  selector: 'app-search-book',
  templateUrl: './search-book.component.html',
})
export class SearchBookComponent implements OnInit {

  books: BookModel[];
  searchWord = '';

  constructor(
    private http: HttpClient,
  ) {
  }

  ngOnInit(): void {
  }

  kakaoSearchBookAPI(value: string) {

    const url = 'https://dapi.kakao.com/v3/search/book?target=value';
    const options = {
      headers: new HttpHeaders({
        Authorization: 'KakaoAK 29c0c87a95a585600eb845302fce3d85'
      }),
      params: new HttpParams().set('query', value)
    };

    return this.http.get(url, options);
  }

  search(value: string) {

    this.kakaoSearchBookAPI(value).subscribe((result) => {
      // @ts-ignore
      this.books = result.documents;
      this.searchWord = value;
    });
  }

  resetSearch() {
    this.books = null;
    this.searchWord = null;
  }

  onCreateNote(book: BookModel) {

    console.log(book);
    const date = new Date();
    const note = new NoteModel();

    note.status = 'TODO';
    note.bookIsbn = book.isbn;
    note.startDate = date.getFullYear() + '-' + date.getMonth() + '-' +  date.getDate();

    this.http.post('http://localhost:3000/notes', note ).subscribe(() => {
      this.resetSearch();
    });

  }


}
