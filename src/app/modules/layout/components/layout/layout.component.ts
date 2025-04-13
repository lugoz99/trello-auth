import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit {
  constructor(private authService:AuthService) {}

  // podria ser en el app component , pero el app component se corre con o sin loggin , aqui es solo un punto
  ngOnInit(): void {

    this.authService.getProfile().subscribe()
  }


}
