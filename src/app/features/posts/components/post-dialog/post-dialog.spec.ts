import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDialog } from './post-dialog';

describe('PostDialog', () => {
  let component: PostDialog;
  let fixture: ComponentFixture<PostDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
