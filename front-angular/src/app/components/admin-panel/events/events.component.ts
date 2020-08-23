import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DialogEventComponent } from '../dialog/dialog-event/dialog-event.component';
import { RessourcesService } from 'src/app/services/ressources.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { EventModel } from 'src/app/models/events.model'
import {animate, state, style, transition, trigger} from '@angular/animations';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.sass'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class EventsComponent implements OnInit {

  element_data: EventModel[];
  displayedColumns: string[] = ['id', 'label', 'address', 'date_begin_at', 'date_end_at', 'created_at', 'action'];
  expandedElement: EventModel | null;
  data = new MatTableDataSource<EventModel>();
  sort: any
  paginator: any
  loadingData = false;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }
    
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
    
  setDataSourceAttributes() {
    this.data.paginator = this.paginator;
    this.data.sort = this.sort;
  }
  

  constructor(private ressourceService: RessourcesService, private jwtService: JwtService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.refresh()
  }

  refresh() {
    this.ressourceService.getAll('events')
    .pipe(map(data => data['hydra:member'] as EventModel[]))
    .subscribe(data => {
      console.log(data)
      this.data = new MatTableDataSource<EventModel>(data);
      this.data.sort = this.sort
      this.data.paginator = this.paginator
      this.loadingData = true
    },
    error => {
      console.log('ici lerreur ' + error)
      console.log(error.status)
      if(error.status === 401) {
        this.jwtService.jwtRefresh()
        .subscribe(res => {
          console.log(res['token'])
          localStorage.setItem('currentUser', JSON.stringify(res['token']))
          this.refresh()
        }, error => console.log(error)
        )
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();

    if (this.data.paginator) {
      this.data.paginator.firstPage();
    }
  }

  openDialog(action, element) {

    element.action = action
    console.log(element.action)

    const dialogRef = this.dialog.open(DialogEventComponent, {
      width: '250px',
      data: {data: element}
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log(res)
      // this.refresh()
      if(res.event === 'Add') {
        this.addRowData(res.data)
      } else if(res.event === 'Edit') {
        this.updateRowData(res.data)
      } else if(res.event === 'Delete') {
        this.deleteRowData(res.data)
      }
    })
  }

  addRowData(row_obj){
    this.data.data.push({
      id:row_obj.id,
      promoter:row_obj.promoter,
      address:row_obj.address,
      label: row_obj.label,
      content: row_obj.content,
      dateBeginAt: row_obj.dateBeginAt,
      dateEndAt: row_obj.dateEndAt,
      createdAt: row_obj.createdAt
    });
    this.data.data = this.data.data.filter((value, key)=>{
      return true
    })
    
  }
  updateRowData(row_obj){
    this.data.data = this.data.data.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.promoter = row_obj.promoter,
        value.address = row_obj.address,
        value.label = row_obj.label,
        value.content = row_obj.content,
        value.dateBeginAt = row_obj.dateBeginAt,
        value.dateEndAt = row_obj.dateEndAt,
        value.createdAt = row_obj.createdAt
      }
      return true;
    });
  }
  deleteRowData(row_obj){
    console.log(row_obj)
    this.data.data = this.data.data.filter(value => {
      return value.id !== row_obj ? value : false;
    })
  }
}
