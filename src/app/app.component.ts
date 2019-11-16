import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NoteModel } from './common/dto/note.dto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  todo: NoteModel[];
  doing: NoteModel;
  done: NoteModel;

  constructor(
    private http: HttpClient,
  ) {
  }

  ngOnInit(): void {
    this.get();
  }

  get() {
    this.http.get('http://localhost:3000/notes').subscribe((res) => {
      console.log('AppComponent', res);
      // @ts-ignore
      this.todo = res;
    });
  }

}
