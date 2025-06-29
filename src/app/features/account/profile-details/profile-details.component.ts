import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {

  fullName: string = "";
  email: string = "";
  alias: string = "";
  photoURL:string="";

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.fullName = this.authService.getCurrentUser().displayName;
    this.email = this.authService.getCurrentUser().email;
    this.photoURL = this.authService.getCurrentUser().photoURL;
  }

}
