import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Blog} from '../model/Blog'
import {MatSnackBar} from '@angular/material/snack-bar';
import { SiteClient } from 'datocms-client';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.less']
})
export class BlogFormComponent implements OnInit {
  client: SiteClient = new SiteClient('b26afeae0277286f8059752d5b4b5c'); 
  model: Blog = new Blog();
  durationInSeconds = 5;


  constructor(private route: ActivatedRoute,
    private router: Router,private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  onSubmit() { 
    const articoloNuovo = {
      itemType: '238961', // model ID
      titoloArticolo: {en: this.model.titoloArticolo, it: this.model.titoloArticolo}, 
      mostraCopertina: false,
      immagine_copertina: null,
      body: {en: this.model.body, it: this.model.body}, 
      luogo: null,
      attachment: null,
      articoli_correlati: null,
    };
    console.log("articoloNuovo: " + articoloNuovo);
    this.client.items.create(articoloNuovo);
    this.openSnackBar();
    //alert("Articolo creato correttamente.");
  }

  get diagnostic() { return JSON.stringify(this.model); }

  goToBlogList(event:any){
    this.router.navigate(['/home']);
  }
  openSnackBar() {
    this._snackBar.openFromComponent(SnackBarBlogComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

}

@Component({
  selector: 'snack-bar-blog',
  templateUrl: 'snack-bar-blog.html',
  styles: [` `],
})
export class SnackBarBlogComponent {}