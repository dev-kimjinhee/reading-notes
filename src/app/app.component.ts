import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  note: object;
  books: Array<object>;
  notes: Array<object>;
  addForm: FormGroup;
  searchWord = '';

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    ) {
  }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      title: [''],
      score: [''],
      oneLineReviews: [''],
      readDate: [''],
      FavoritePhrase: [''],
    });
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

  onAddNote(note: object) {
    this.resetSearch();
    this.note = note;
  }

  onSave() {
    const note = this.addForm.getRawValue();
    this.http.post('http://localhost:3000/notes', note ).subscribe((result) => {
      this.resetSearch();
      this.note = null;
      this.http.get('http://localhost:3000/notes').subscribe((notes) => {
        console.log(notes);
      });
    });
  }

}
