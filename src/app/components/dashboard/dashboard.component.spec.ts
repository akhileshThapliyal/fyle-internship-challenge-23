import { ComponentFixture, TestBed, async, fakeAsync } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import {
  click,
  dispatchFakeEvent,
  expectText,
  findEl,
  checkField,
  setFieldValue,
} from '../../spec-helpers/element.spec-helper';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [ 
        HttpClientModule,
        ReactiveFormsModule
      ]
    })
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    
  });
  
  it('should create the dashboard component', () => {
    expect(component).toBeTruthy();
  });

  it('should call the onSubmit method when the search-form is submitted', () => {
      let usernameInput = fixture.debugElement.query(By.css('#username'));
      let username = usernameInput.nativeElement;
      const searchForm = fixture.debugElement.query(By.css('#searchForm'));
      const fnc = spyOn(component, "onSubmit");
      
      searchForm.triggerEventHandler("ngSubmit", null);
      expect(fnc).toHaveBeenCalled();
  });

  it('should bind the username to its FormControl', () => {
    // Arrange
    const el = fixture.debugElement.query(By.css('#username'));
    const ctrl = component.searchForm.get('username');

    // Act
    const dummyValue = 'johnpapa';
    ctrl?.setValue(dummyValue);
    fixture.detectChanges();

    // Act
    expect(el.nativeElement.value).toEqual(dummyValue);
    expect((el.nativeElement as HTMLInputElement).value).toEqual(dummyValue);
  });

  it('should submit the form when the submit button is clicked', () => {
    // Arrange
    const btnEl = fixture.debugElement.query(By.css('#searchBtn'));
    const fnc = spyOn(component, 'onSubmit');

    // Act
    (btnEl.nativeElement as HTMLButtonElement).click();
    fixture.detectChanges();

    // Assert
    expect(fnc).toHaveBeenCalled();
  });

  it('should show error message when the form is submitted with button is clicked with empty values', () => {
    // Arrange
    const usernameBtnEl = fixture.debugElement.query(By.css('#username'));
    const searchBtnEl = fixture.debugElement.query(By.css('#searchBtn'));
    const fnc = spyOn(component, 'onSubmit');

    // Act
    dispatchFakeEvent(usernameBtnEl.nativeElement, 'blur');
    (searchBtnEl.nativeElement as HTMLButtonElement).click();
    fixture.detectChanges();

    // Assert
    expect(fnc).toHaveBeenCalled();

    //Assert alter field for username
    const usernameAlterEl = fixture.debugElement.query(By.css('#userNameErrorAlert'));
    expect(component).toBeTruthy();
    expect(usernameAlterEl.nativeElement.innerText).toEqual('Username is required.');
  });

  it('should mark username as invalid when it has no value', () => {
    // Arrange
    const ctrl = component.searchForm.get('username');

    // Act
    ctrl?.setValue(null);
    fixture.detectChanges();

    // Assert
    expect(ctrl?.invalid).toBeTruthy();
  });

  it('should mark username as valid when it has value', () => {
    // Arrange
    const ctrl = component.searchForm.get('username');

    // Act
    ctrl?.setValue('test');
    fixture.detectChanges();

    // Assert
    expect(ctrl?.valid).toBeTruthy();
  });

  it('should return true when isFormValid is called and the registerForm is indeed valid', () => {
    // Arrange
    const dummyData = {
      username: 'test',
    };

    // Act
    component.searchForm.patchValue(dummyData);
    fixture.detectChanges();

    // Assert
    expect(component.searchForm.valid).toBeTruthy();
  });

  it('should return false when isFormValid is called and the registerForm is not valid', () => {
    // Arrange
    const dummyData = {
      username: null
    };

    // Act
    component?.searchForm.patchValue(dummyData);
    fixture.detectChanges();

    // Assert
    expect(component.searchForm.valid).toBeFalsy();
  });
  // #endregion
});
