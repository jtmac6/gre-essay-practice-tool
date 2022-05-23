import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptPickerComponent } from './prompt-picker.component';

describe('PromptPickerComponent', () => {
  let component: PromptPickerComponent;
  let fixture: ComponentFixture<PromptPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromptPickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromptPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
