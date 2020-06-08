import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {Blog} from '../model/Blog'
const getBlogById = gql`
query getBlogById($blogId: ItemId) {
  articoloDiBlog(filter: {id: {eq: $blogId}}) {
    id
    titoloArticolo
    body
    createdAt
    updatedAt
    mostraCopertina
    immagineCopertina {
      url,
      height,
      width
    }
    attachment{
      url
      filename
      format
      title
    }
    articoliCorrelati {
      id
      titoloArticolo
      createdAt
      immagineCopertina {
        url
      }
    }
  }
}
`;

type Response = {
  articoloDiBlog: Blog;
};

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.less']
})
export class BlogDetailComponent implements OnInit {
  blog : Blog;
  ready:boolean = false;
  
  constructor(private apollo: Apollo,private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
    
      let id = this.route.snapshot.paramMap.get('id');
      console.log("id " + id);
      this.apollo
        .watchQuery<Response>({
          query: getBlogById,
          variables: {
            blogId: id
          },
        })
        .valueChanges.subscribe(result => {
          console.log(result.data.articoloDiBlog);
          this.blog = result.data.articoloDiBlog;
          this.ready = true;
  
        });
        
     });

   
  }

  goToDetail(event:any, blog:Blog){
    this.router.navigate(['/detail', { id: blog.id }]);
    //this.ngOnInit();
  }

  goToBlogList(event:any){
    this.router.navigate(['/home']);
   
  }

}
