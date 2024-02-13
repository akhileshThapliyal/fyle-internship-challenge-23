import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from '../models/user';
import { user as userObj, repoDetails } from '../spec-helpers/api.service.spec-helper';
import { asyncData } from '../spec-helpers/element.spec-helper';
import { RepoDetail } from '../models/repo_detail';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;
  let searchUsername = "johnpapa";

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ 
        HttpClientModule,
        HttpClientTestingModule 
      ]
    });
    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
    //jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected user', (done: DoneFn) => {
    let expectedUser: User = userObj;

    service.getUser(searchUsername)
      .subscribe((user: User) => {
      // When observable resolves, result should match test data
      expect(user).toEqual(expectedUser);
      done();
    });

    // The following `expectOne()` will match the request's URL.
    // If no requests or multiple requests matched that URL
    // `expectOne()` would throw.
    const req = httpTestingController.expectOne(service.gitApiBaseUrl + searchUsername);

    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');

    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    req.flush(expectedUser);
  });

  it('should return expected repos for the given user', (done: DoneFn) => {
    let user: User = userObj;
    let expectedRepoDetails: RepoDetail[] = repoDetails;

    service.getAllRepos(user.repos_url)
      .subscribe((repoDetails: RepoDetail[]) => {
      // When observable resolves, result should match test data
      expect(repoDetails).toEqual(expectedRepoDetails);
      done();
    });

    // The following `expectOne()` will match the request's URL.
    // If no requests or multiple requests matched that URL
    // `expectOne()` would throw.
    const req = httpTestingController.expectOne(service.gitApiBaseUrl + searchUsername + "/repos");

    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');

    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    req.flush(expectedRepoDetails);
  });
});  