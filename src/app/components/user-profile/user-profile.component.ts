import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import Utils from 'src/app/utils/utils';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnChanges, OnInit {
  
  @Input() user: User = ({} as User);
  util = new Utils();

  constructor(
    public apiService: ApiService
  ) {}

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  ngOnChanges(changes: SimpleChanges): void {
    //throw new Error('Method not implemented.');


  }
}
