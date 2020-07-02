import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NetworkService } from 'src/app/networking/network.service';

@Component({
  selector: 'app-creat-post',
  templateUrl: './creat-post.component.html',
  styleUrls: ['./creat-post.component.scss']
})
export class CreatPostComponent implements OnInit {
  userId:string;
  constructor(private router:Router,private activatedRoute: ActivatedRoute,private service:NetworkService) { 
    this.activatedRoute.paramMap
    .subscribe(params => {
      this.userId = params.get('id');
    });
  }
  ngOnInit(): void {
  }
 Submit(title,body){
   this.service.createPost(title,body,this.userId).subscribe((data)=>{
     console.log('Posted',data);
     this.router.navigate(['users']);
   })
 }
}
