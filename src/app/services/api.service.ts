import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, map, tap, throwError } from 'rxjs';
import { User } from '../models/user';
import { RepoDetail } from '../models/repo_detail';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  gitApiBaseUrl = "https://api.github.com/users/";
  inProgressStatus = {
    "getUser": false,
    "getAllRepos": false
  };
  apiDealyInMS = 4000;

  constructor(
    private httpClient: HttpClient
  ) { }

  getUser(githubUsername: string): Observable<User> {
    this.inProgressStatus["getUser"] = true;
    return this.httpClient.get<User>(`${this.gitApiBaseUrl}${githubUsername}`)
    .pipe(
      delay(this.apiDealyInMS),
      tap(() => this.inProgressStatus["getUser"] = false)
    );
  }

  // implement getRepos method by referring to the documentation. Add proper types for the return type and params
  getAllRepos(reop_url: string): Observable<RepoDetail[]> {
    this.inProgressStatus["getAllRepos"] = true;
    return this.httpClient.get<RepoDetail[]>(reop_url)
    .pipe(
      delay(this.apiDealyInMS),
      tap(() => this.inProgressStatus["getAllRepos"] = false)
    );
  } 
}
