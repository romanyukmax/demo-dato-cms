import { Apollo } from 'apollo-angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  constructor(private apollo: Apollo,private route: ActivatedRoute,
    private router: Router) { }

  title = 'my-blog';

  goToBlogList(event:any){
    this.router.navigate(['']);
  }

}


