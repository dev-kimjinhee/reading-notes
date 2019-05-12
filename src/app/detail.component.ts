import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  books = [];

  constructor(private http: HttpClient) {
    this.search('컴퓨터과학');
  }

  kakaoSearchBookAPI(value: string) {

    const url = 'https://dapi.kakao.com/v3/search/book?target=value"';
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
      this.books = result['documents'];
      console.log('search', value, this.books);
    });
  }

  onAdd(book: object) {
    console.log('onAdd', book);
  }

  resetSearch() {
    this.books = [];
  }

}
