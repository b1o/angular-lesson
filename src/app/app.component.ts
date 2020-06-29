import { Component } from '@angular/core';
import { NetworkService } from './networking/network.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'material-demo';

  constructor(private http: NetworkService)  {
    this.http.getUsers()
      .subscribe(data => console.log(data))
  }


  public test() {
    console.log('button press')
  }
}
