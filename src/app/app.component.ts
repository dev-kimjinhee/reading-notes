import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  note = {
    title: '',
    score: '',
    oneLineReviews: '',
    readDate: '',
    favoritePhrases: [''],
  };
  books: Array<object>;
  notes: Array<object>;
  createForm: FormGroup;
  searchWord = '';

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    ) {
  }

  get favoriteParses() {
    return this.createForm.get('favoritePhrases') as FormArray;
  }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      title: [''],
      score: [''],
      oneLineReviews: [''],
      readDate: [''],
      favoritePhrases: this.formBuilder.array([
        this.formBuilder.control('')
      ]),
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

  onCreateNote(selectedBook: any) {
    this.resetSearch();
    this.createForm.patchValue({
      book: selectedBook,
    });
  }

  onSave() {
    const note = this.createForm.getRawValue();
    this.http.post('http://localhost:3000/notes', note ).subscribe(() => {
      this.resetSearch();
    });
  }

  addFavoriteParses() {
    this.favoriteParses.push(this.formBuilder.control(''));
  }

  removeFavoriteParses(index: number) {
    this.favoriteParses.removeAt(index);
  }

}
