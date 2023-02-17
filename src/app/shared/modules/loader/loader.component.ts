import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  loaderList: any = [
    'https://media.tenor.com/W5qtl0HYoLYAAAAi/catscafe-penguin.gif',
    'https://media.tenor.com/XNks58ECudgAAAAi/cute-penguin.gif',
    'https://media.tenor.com/etWShNR7ToEAAAAi/transparent-yo.gif',
    'https://media.tenor.com/ifvqYyqAfwgAAAAi/cute-penguin.gif',
    'https://media.tenor.com/FB8lIWYHmGgAAAAi/hellomybeautiful-hello.gif',
    'https://media.tenor.com/oFUHRgY8iQIAAAAi/decordeco.gif'
  ];
  imageChoosen: string;
  constructor() {}

  ngOnInit() {
    this.imageChoosen = Array.from(this.loaderList).sort(() => 0.5 - Math.random())[0] as string;
    const box = document.getElementById('imgLoad');
    if (this.imageChoosen == this.loaderList[0]){
      box.classList.add('rotate');
    }
    else{
      box.classList.remove('rotate');
    }
  }
}
