import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

export interface Query {
  description: string;
  query_string: string;
  title: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title: String = 'zebra-angular';
  queries: Query[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.get();
  }

  get() {
    this.http.get(`http://localhost:3000/queries`).subscribe(
      (data: Query[]) => {
        this.queries = data;
      },
      (err: HttpErrorResponse) => {
        // エラー処理
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }
}
