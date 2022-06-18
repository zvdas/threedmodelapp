import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreedUploadComponent } from './threed-upload.component';

describe('ThreedUploadComponent', () => {
  let component: ThreedUploadComponent;
  let fixture: ComponentFixture<ThreedUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreedUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreedUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
