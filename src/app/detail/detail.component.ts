import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  url = 'http://localhost:3000/api/news';
  id: number;
  newsList: any = [];
  constructor(private httpClient: HttpClient, private route: ActivatedRoute) {
    this.id = route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.httpClient.get(this.url + '/' + this.id).subscribe((res: any) => {
      this.newsList = res.data[0];
      console.log(this.newsList);
    });
  }
}
