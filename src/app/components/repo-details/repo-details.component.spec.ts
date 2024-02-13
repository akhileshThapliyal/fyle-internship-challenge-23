import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoDetailsComponent } from './repo-details.component';
import { HttpClientModule } from '@angular/common/http';

describe('RepoDetailsComponent', () => {
  let component: RepoDetailsComponent;
  let fixture: ComponentFixture<RepoDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepoDetailsComponent],
      imports: [ HttpClientModule ]
    });
    fixture = TestBed.createComponent(RepoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
