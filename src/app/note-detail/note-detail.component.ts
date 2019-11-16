import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookModel } from '../common/dto/book.dto';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
})
export class NoteDetailComponent implements OnInit {
  @Input() books: BookModel[];
  createForm: FormGroup;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      book: [''],
      score: [''],
      oneLineReviews: [''],
      readDate: [''],
      favoritePhrases: this.formBuilder.array([
        this.formBuilder.control('')
      ]),
    });
  }

  get favoriteParses() {
    return this.createForm.get('favoritePhrases') as FormArray;
  }

  onSave() {
    const note = this.createForm.getRawValue();
    this.http.post('http://localhost:3000/notes', note ).subscribe(() => {
    });
  }

  addFavoriteParses() {
    this.favoriteParses.push(this.formBuilder.control(''));
  }

  removeFavoriteParses(index: number) {
    this.favoriteParses.removeAt(index);
  }


}
