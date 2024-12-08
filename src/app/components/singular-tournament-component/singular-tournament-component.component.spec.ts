import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularTournamentComponentComponent } from './singular-tournament-component.component';

describe('SingularTournamentComponentComponent', () => {
  let component: SingularTournamentComponentComponent;
  let fixture: ComponentFixture<SingularTournamentComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingularTournamentComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingularTournamentComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
