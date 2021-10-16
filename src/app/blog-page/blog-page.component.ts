import { CursorError } from '@angular/compiler/src/ml_parser/lexer';
import { Component, ElementRef, InputDecorator, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IBlog } from '../shared/interfaces/blog.interface';
import { IUsers } from '../shared/interfaces/users.interface';
import { BlogService } from '../shared/services/blog.service';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css']
})
export class BlogPageComponent implements OnInit {
  @ViewChild('close') close!: ElementRef

  public userPost: Array<IBlog> = [];
  public users: Array<IUsers> = [];
 
  public btnSignIn = true;
  public btnSignOut = false;
  public userName = '';
  public email = '';
  public password = '';
  public currentUser!: IUsers | undefined;
  public postTitle = '';
  public postText = '';
  public currentPost!: IBlog | undefined;
  public currentId!: number;
  public editStatus = false
  public author!: string
  public admin = false
  public isUser!: string;
  
  
  constructor( private blogService: BlogService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadPosts()
    this.loadUsers()
  }

  loadPosts():void{
    this.userPost = this.blogService.getPost()
  }

  loadUsers():void{
    this.users = this.blogService.getUsers()
  }


  changeBtn(){
    this.editStatus = false
  }

  signIn():void{    
    this.currentUser = this.users.find(a => a.email === this.email);
    if (this.currentUser){
      this.btnSignOut = true
      this.btnSignIn = false
      this.checkUser(this.currentUser);
      this.userName = ''
      this.email = ''
      this.password = ''
    }
  }

  checkUser(user: IUsers):void{
    if ( user.email === 'admin@gmail.com'){
      this.admin = true
      this.isUser = user.userName
    }
    else{
      this.author = user.userName 
      this.isUser = user.userName     
    }
  }

  signOut():void{
    this.admin = false
      this.isUser = ''
      this.btnSignIn = true
      this.btnSignOut = false
      this.author = ''
  }

  signUp():void{
    const newUser: IUsers = {
      id: Math.round(Math.random()*1000),
      userName: this.userName,
      email: this.email,
      password: this.password
    }
    if (this.users.find(a => a.email === this.email) || 
        this.users.find(b => b.userName === this.userName)){
          this.toastr.error('this user already exist');
    }
    else{
      this.blogService.addUser(newUser)
      this.isUser = this.userName
      this.author = this.userName
      this.btnSignIn = false
      this.btnSignOut = true
      this.userName = ''
      this.email = ''
      this.password = ''
      this.toastr.success('you have successfully registered')
    } 
  }

  savePost():void{
    const newPost: IBlog = {
      topic: this.postTitle,
      postedBy: this.isUser,
      message: this.postText,
      id: Math.round(Math.random()*1000),
      date: 14 
    }
    this.blogService.addPost(newPost)
    this.postText = '';
    this.postTitle = '';
    this.toastr.success('Your post is added')
    
  }

  editPost(post:IBlog):void{
    this.editStatus = true
    this.postTitle = post.topic
    this.postText = post.message
    this.currentId = post.id
  }

  deletePost(post: IBlog):void{
    this.blogService.deletePost(post.id)
  }
  
  saveEditPost():void{
    const id = this.currentId
    const newEditPost: IBlog={
      topic: this.postTitle,
      message: this.postText,
      postedBy: this.author,
      id: this.currentId,
      date: 16
    }
    this.blogService.updatePost(newEditPost, id)
    this.postText = '';
    this.postTitle = '';
  }

}
