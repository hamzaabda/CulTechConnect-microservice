import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { DatePipe } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  animations: [
    trigger('buttonState', [
      state('active', style({
        transform: 'scale(1.1)',
        backgroundColor: 'lightcoral',
      })),
      state('inactive', style({
        transform: 'scale(1)',
        backgroundColor: 'lightblue',
      })),
      transition('active <=> inactive', animate('200ms ease-in')),
    ]),
  ],
})
export class DetailComponent implements OnInit {
 BlocPost : any = "blog post";
 commentMessage: string = '';
 id : String = "";
 likeCount: number = 0;
 buttonState: string = 'inactive';
 // bread crumb items
 breadCrumbItems: Array<{}>;

  constructor(private http : HttpClient,
    private route: ActivatedRoute,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    console.log('this is spartaaaa !!!');
    this.breadCrumbItems = [{ label: 'Blog' }, { label: 'Blog Details', active: true }];
    this.getDetailById();

  }
  toggleButtonState() {
    this.buttonState = this.buttonState === 'active' ? 'inactive' : 'active';
  }

  like() {
    this.toggleButtonState();
    this.likeCount++;
  }
  


  getBlocPost(id:any){
    this.http.get('http://localhost:8084/api/blog/blog-posts/'+id)
    .subscribe((data) => {
      console.log('blog',data);
      this.BlocPost = data;
    });
  }
  
  getDetailById(){
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']; // 'id' should match the route parameter name
      // Now, 'id' contains the value of the 'id' route parameter
      console.log('ID from route parameter:', this.id);
      this.getBlocPost(this.id);
    });
  }
  getDateOnly(dateString: string): string {
    if(dateString != null || dateString != undefined){
      return dateString.split('T')[0];

    }
  }
  getCurrentDate(): string {
    const currentDate = new Date();
    return this.datePipe.transform(currentDate, 'yyyy-MM-dd');
  }
  addComment(){
    console.log("add comment");
    
    let data ={
      "text": this.commentMessage,
      "createdDate":this.getCurrentDate()
    };
this.http.post(`http://localhost:8084/api/blog/blog-posts/${this.id}/assign-comment`,data).subscribe((data)=>{
this.getDetailById();
})
  }
}
