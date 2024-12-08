import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentDetailPageComponent } from './tournament-detail-page.component';


describe('TournamentDetailPageComponent', () => {
  let component: TournamentDetailPageComponent;
  let fixture: ComponentFixture<TournamentDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TournamentDetailPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TournamentDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
