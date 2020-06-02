import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Blog} from '../model/Blog'

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.less']
})
export class BlogFormComponent implements OnInit {
  model: Blog = new Blog();

  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }

  onSubmit() { 
    const articoloNuovo = {
      itemType: '238961', // model ID
      titoloArticolo: this.model.titoloArticolo,
      mostraCopertina: false,
      immagine_copertina: null,
      body: this.model.body,
    };

  }

  get diagnostic() { return JSON.stringify(this.model); }

  goToBlogList(event:any){
    this.router.navigate(['/home']);
  }

}
