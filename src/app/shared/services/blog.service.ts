import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IBlog } from '../interfaces/blog.interface';
import { IUsers } from '../interfaces/users.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

 private posts: IBlog[] = [
    {
      topic: 'First Post',
      postedBy: 'admin',
      message: 'Sign up to create your account and strat to use Angular Blog',
      id: 11,
      date: 12
    }
  ]

  private users: IUsers[] = [
    {
      id: 1,
      userName: 'admin',
      email: 'admin@gmail.com',
      password: 12345
    }
  ]


  constructor() { }

  getPost():Array<IBlog>{
    return this.posts
  }

  addPost(post: IBlog):void{
    this.posts.push(post)
  }

  getUsers():Array<IUsers>{
    return this.users
  }

  addUser(user: IUsers):void{
    this.users.push(user)
  }

  updatePost(post: IBlog, id:number):void{
    const index = this.posts.findIndex(i => i.id === id)
    this.posts.splice(index, 1, post )
  }

  deletePost(id: number):void {
    const index = this.posts.findIndex(d => d.id === id)
    this.posts.splice(index,1)
  }

}
