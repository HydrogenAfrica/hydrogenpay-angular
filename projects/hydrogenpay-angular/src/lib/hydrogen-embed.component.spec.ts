import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HydrogenEmbedComponent } from './hydrogen-embed.component';

describe('HydrogenEmbedComponent', () => {
  let component: HydrogenEmbedComponent;
  let fixture: ComponentFixture<HydrogenEmbedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HydrogenEmbedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HydrogenEmbedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
