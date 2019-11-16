import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BookModel } from '../common/dto/book.dto';
import { NoteModel } from '../common/dto/note.dto';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
})
export class BoardComponent implements OnInit, AfterViewInit {
  @Input() notes: NoteModel[];
  @Input() status: string;

  constructor(
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    console.log('BoardComponent', this.notes);
  }


}
