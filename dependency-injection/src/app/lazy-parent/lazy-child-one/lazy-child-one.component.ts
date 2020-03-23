import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lazy-child-one',
  templateUrl: './lazy-child-one.component.html',
  styleUrls: ['./lazy-child-one.component.scss']
})
export class LazyChildOneComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
