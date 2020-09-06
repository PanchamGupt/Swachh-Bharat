import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PastReportsPage } from './past-reports.page';

describe('PastReportsPage', () => {
  let component: PastReportsPage;
  let fixture: ComponentFixture<PastReportsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastReportsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PastReportsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
