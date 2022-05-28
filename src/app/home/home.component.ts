import { HttpClient } from '@angular/common/http';
// import { NewsService } from './../services/news.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  url = 'http://localhost:3000/api/news';
  category: any;
  newsList: any = [];
  p: number = 1;
  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient.get(this.url).subscribe((res: any) => {
      this.newsList = res.data;
      // console.log(this.newsList);
    });
  }

  Search() {
    if (this.category == '') {
      this.ngOnInit();
    } else {
      this.newsList = this.newsList.filter((res: { category: string }) => {
        return res.category
          .toLocaleLowerCase()
          .match(this.category.toLocaleLowerCase());
      });
    }
  }
}
