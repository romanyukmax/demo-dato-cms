import { Component, OnInit, NgModule } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {MatListModule} from '@angular/material/list';

import {Blog} from '../model/Blog'

const allBlogsQuery = gql ` query getArticoliDESC {
  allArticoloDiBlogs(orderBy: _createdAt_DESC) {
    titoloArticolo
    createdAt
    id
    mostraCopertina
    immagineCopertina {
      url
    }
  }
}
`;

type Response = {
  allArticoloDiBlogs: Blog[];
};

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.less']
})

export class BlogListComponent implements OnInit {
  blogs: Blog[];
  loading = true;
  error: any;

  

  constructor(private apollo: Apollo, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.apollo
      .watchQuery<Response>({
        query: allBlogsQuery
      })
      .valueChanges.subscribe(result => {
        this.blogs = result.data.allArticoloDiBlogs;
        this.loading = result.loading;
        this.error = result.errors;
      });
  }

  goToDetail(event:any, blog:Blog){
    this.router.navigate(['/detail', { id: blog.id }]);
  }

  goToNewBlog(event:any){
    this.router.navigate(['/new-blog']);
  }

}
