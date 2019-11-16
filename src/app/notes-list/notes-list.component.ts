import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { NoteModel } from '../common/dto/note.dto';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
})
export class NotesListComponent implements OnInit, AfterViewInit {
  @Input() notes: NoteModel[];

  constructor(
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    console.log('NotesListComponent', this.notes);
  }


}
