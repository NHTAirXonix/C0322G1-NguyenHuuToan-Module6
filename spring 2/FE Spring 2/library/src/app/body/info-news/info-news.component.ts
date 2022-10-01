import { Component, OnInit } from '@angular/core';
import {BodyService} from '../body.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-info-news',
  templateUrl: './info-news.component.html',
  styleUrls: ['./info-news.component.css']
})
export class InfoNewsComponent implements OnInit {

  titleNew: string;
  contentNew: string;
  dateSubmitted: string;
  img: string;
  id: number;

  constructor(private newsService: BodyService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.findById(this.id);
    });
  }

  ngOnInit(): void {
  }

  findById(id: number) {
    return this.newsService.findById(id).subscribe(news => {
      this.titleNew = news.title;
      this.contentNew = news.content;
      this.dateSubmitted = news.submittedDate;
      this.img = news.image;
    });
  }
}
