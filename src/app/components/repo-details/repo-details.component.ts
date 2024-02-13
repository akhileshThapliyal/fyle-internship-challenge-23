import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user';
import { RepoDetail } from 'src/app/models/repo_detail';
import { ApiService } from 'src/app/services/api.service';
import Utils from 'src/app/utils/utils';

@Component({
  selector: 'app-repo-details',
  templateUrl: './repo-details.component.html',
  styleUrls: ['./repo-details.component.scss']
})
export class RepoDetailsComponent implements OnChanges, OnInit {
  public current: number = 1;
  public total: number = 0;
  public perPage: number = 10;
  public isPerPageDropdownSelected = true; //Assume to be selected as we are defaulting to 10
  private repo_base_url: string = "";
  public reposFetchedWithNoRecords: boolean = false;
  util: Utils = new Utils();

  @Input() user: User = ({} as User);
  repoDetails: RepoDetail[] = ([] as RepoDetail[]);
  @ViewChild('focusrepo', { read: ElementRef }) repoDetailsEleRef: ElementRef = {} as ElementRef;

  constructor(
    public apiService: ApiService
  ) {}

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  ngOnChanges(changes: SimpleChanges): void {
    let currentValue: User = changes["user"]["currentValue"];
    let previousValue: User = changes["user"]["previousValue"];

    if(currentValue
        && currentValue.name != null
        && previousValue 
            && previousValue.name != null) {
          let areSame: boolean = currentValue.name == previousValue.name;
          if(!areSame && currentValue.repos_url) { //Values are different
            this.repo_base_url = currentValue.repos_url;
            this.paginate(this.current, this.perPage);
          }
    } else if(currentValue
              && currentValue.name != null
              && currentValue.repos_url) {
          this.repo_base_url = currentValue.repos_url;
          this.paginate(this.current, this.perPage);
    } else {
          this.repoDetails = [];
    }

    if(currentValue
      && currentValue.id != null
      && currentValue.name == null) { //Sometime the records passed by the github doesn't have name of the user
      this.reposFetchedWithNoRecords = true;
    } else {
      this.reposFetchedWithNoRecords = false;
    }
  }

  public onGoTo(page: number): void {
    this.current = page
    this.paginate(this.current, this.perPage);
    this.repoDetailsEleRef.nativeElement.scrollIntoView({ behavior: 'smooth', block: "start", inline: "nearest" })
  }

  public onNext(page: number): void {
    this.current = page + 1
    this.paginate(this.current, this.perPage);
    this.repoDetailsEleRef.nativeElement.scrollIntoView({ behavior: 'smooth', block: "start", inline: "nearest" })
  }

  public onPrevious(page: number): void {
    this.current = page - 1
    this.paginate(this.current, this.perPage);
    this.repoDetailsEleRef.nativeElement.scrollIntoView({ behavior: 'smooth', block: "start", inline: "nearest" })
  }

  public paginate(current: number, perPage: number) {
    console.log("userRepoDetails before api call => ", this.repoDetails);
    this.apiService.getAllRepos(this.repo_base_url).subscribe((repo_data) => {
      //console.log(JSON. stringify(repo_data));
      if(repo_data.length == 0 ) {
        this.reposFetchedWithNoRecords = true;
        this.repoDetails = [];
      } else {
        this.reposFetchedWithNoRecords = false;
        this.total = Math.ceil(repo_data.length / this.perPage);
        this.repoDetails = [...repo_data.slice((current - 1) * perPage).slice(0, perPage)];
      }
      this.isPerPageDropdownSelected = false;
      console.log("userRepoDetails => ", this.repoDetails);
    });
  }

  public onPerPageSelected(value: string): void {
    this.isPerPageDropdownSelected = true;
		this.perPage = Number(value);
    this.paginate(this.current, this.perPage);
	}
}
