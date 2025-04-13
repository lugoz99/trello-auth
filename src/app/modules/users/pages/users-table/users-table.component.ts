import { Component, OnInit } from '@angular/core';

import { DataSourceUser } from './data-source';
import { UserService } from '@services/user.service';
import { AuthService } from '@services/auth.service';
import { User } from '@models/user.model';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html'
})
export class UsersTableComponent implements OnInit  {

  dataSource = new DataSourceUser();
  columns: string[] = ['id', 'avatar', 'name', 'email'];
  user : User | null = null;
  constructor( private userService:UserService, private authservice:AuthService) { }
  ngOnInit(): void {
    this.userService.getUsers().subscribe( ( users ) =>{
      this.dataSource.init( users )
    })

    this.authservice.user$.subscribe( user => this.user = user )
  }

}
