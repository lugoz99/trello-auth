import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faPen, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { RequestStatus } from '@models/request-status.model';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent {

  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [ Validators.required, Validators.minLength(6)]],
  });
  faPen = faPen;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  status: RequestStatus  = 'init'; // maquina de estado para saber en que va la solicitud | union type

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService:AuthService,
    private activeRoute:ActivatedRoute
  ) {

    this.activeRoute.queryParamMap.subscribe((params) => {
      const { email } = { email: params.get('email') };
      if( email) {
        this.form.controls.email.setValue( email );
      }
    });
    
   }

  doLogin() {
    if (this.form.valid) {
      this.status = 'loading';
      const { email, password } = this.form.getRawValue();
      this.authService.login( email,password ).subscribe( {
        next:(data)=>{
          this.router.navigate(['/app']);
          console.log( data )
        },
        error:(err) => {
          console.error( { err })
          this.status = 'failed'
        }
      })
      // TODO
    } else {
      this.form.markAllAsTouched();
    }
  }

}
