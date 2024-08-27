import { ComponentFixture, TestBed } from '@angular/core/testing';
import axios from 'axios';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { DetailComponent } from './detail.component';
import { GameService } from '../../service/game.service';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let service: GameService;
  let axiosGetSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ 
        DetailComponent,
        RouterTestingModule ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(new Map([['id', '456']])) // Mock route parameters
          }
        },
        GameService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    service = TestBed.inject(GameService);

    // Mock axios.get
    axiosGetSpy = spyOn(axios, 'get');
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch item', async () => {
    const objectId = 1;
    const mockData = { id: 1, title: 'Item 1' };

    axiosGetSpy.and.returnValue(Promise.resolve({ data: mockData }));
    const url = `${service['apiUrl']}/game?id=${objectId}`;
    service.getGameById(objectId).subscribe({
      next: (data) => {
        expect(data).toEqual(mockData);
        expect(axiosGetSpy).toHaveBeenCalledWith(url);
      }
    });
  });
});
