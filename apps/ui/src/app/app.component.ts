import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@prodata-banner-creator/api-interfaces';

@Component({
  selector: 'prodata-banner-creator-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  hello$ = this.http.get<Message>('/api/hello');
  constructor(private http: HttpClient) {}
}
