import { ComponentFixture, TestBed } from '@angular/core/testing';
import axios from 'axios';
import { RouterTestingModule } from '@angular/router/testing';
import { MasterComponent } from './master.component';
import { GameService } from '../../service/game.service';

describe('MasterComponent', () => {
  let component: MasterComponent;
  let fixture: ComponentFixture<MasterComponent>;
  let service: GameService;
  let axiosGetSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ 
        RouterTestingModule,
        MasterComponent 
      ],
      providers: [ GameService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    service = TestBed.inject(GameService);

    // Mock axios.get
    axiosGetSpy = spyOn(axios, 'get');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch the list of items', async () => {
    const mockData = [
      { id: 1, title: 'Item 1' },
      { id: 2, title: 'Item 2' }
    ];

    axiosGetSpy.and.returnValue(Promise.resolve({ data: mockData }));
    const url = `${service['apiUrl']}/games`;
    service.getGameList().subscribe({
      next: (data) => {
        expect(data).toEqual(mockData);
        expect(axiosGetSpy).toHaveBeenCalledWith(url);
      }
    });
  });

});
