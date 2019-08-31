import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
  @Output()
  savingEmitter: EventEmitter<null> = new EventEmitter<null>();
  constructor(private modalRef: BsModalRef) {}

  ngOnInit() {}
  modalClose(): void {
    this.modalRef.hide();
  }
  delete(): void {
    this.savingEmitter.emit();
  }
}
