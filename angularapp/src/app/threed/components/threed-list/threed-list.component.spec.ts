import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreedListComponent } from './threed-list.component';

describe('ThreedListComponent', () => {
  let component: ThreedListComponent;
  let fixture: ComponentFixture<ThreedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreedListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
