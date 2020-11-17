import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cartapersonaje',
  templateUrl: './cartapersonaje.component.html',
  styles: [
  ]
})
export class CartapersonajeComponent implements OnInit {

  @Input() name: string;
  @Input() created: string;
  @Input() gender: string;
  @Input() height: string;
  @Input() mass: string;
  @Input() planeta: string;

  constructor() { }

  ngOnInit(): void {
  }

}
