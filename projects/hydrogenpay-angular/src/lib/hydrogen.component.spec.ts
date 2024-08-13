import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import HydrogenComponent from './hydrogen.component';

describe('HydrogenComponent', () => {
  let component: HydrogenComponent;
  let fixture: ComponentFixture<HydrogenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HydrogenComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HydrogenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
