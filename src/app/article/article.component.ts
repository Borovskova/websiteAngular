import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../config.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  post: any = {};

  constructor(private route: ActivatedRoute, private config: ConfigService, private location: Location) { }

  ngOnInit(): void {
    let id: any = this.route.snapshot.paramMap.get('id');
    this.post = this.getPostById(id);

  }

  getPostById(id: number) {
    return this.config.getPostByID(id);
  }
  getBack(){
    this.location.back();
  }
}
