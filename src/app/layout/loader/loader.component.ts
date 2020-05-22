import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {


  constructor() { }
  @Input() isLoading: boolean = false;
  @Input() value: number = 100;
  @Input() diameter: number = 100;
  @Input() mode: string = "indeterminate";
  @Input() strokeWidth: number = 10;
  @Input() overlay: boolean = false;
  @Input() color: string = "primary";
  ngOnInit(): void {
    
  }

}
