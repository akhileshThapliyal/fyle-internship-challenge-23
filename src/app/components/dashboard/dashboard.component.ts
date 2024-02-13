import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import Utils from 'src/app/utils/utils';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  user: User = ({} as User);
  util = new Utils();
  userName = "";

  constructor(
    public apiService: ApiService
  ) {}

  searchForm = new FormGroup({
    username: new FormControl('', Validators.required)
  });

  testingData() {
    console.log("testingData username => ", this.userName);
  }

  onSubmit() {
    console.log("onSubmit username => ", this.searchForm.controls.username.value);
    if(this.searchForm.controls.username.value != null
      && this.userName != this.searchForm.controls.username.value) {
      this.userName =  this.searchForm.controls.username.value;
      this.user = {} as User;
      this.apiService.getUser(this.userName).subscribe((user_data) => {
        //console.log(JSON. stringify(data));
        //console.log(typeof data);
        this.user = user_data;
        //console.log("user_data.repos_url => ", user_data.repos_url);
        
      });
    }
  }

  get username() {
    return this.searchForm.get('username');
  }
}
