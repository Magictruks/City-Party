import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { RessourcesService } from 'src/app/services/ressources.service';
import { Categories } from 'src/app/models/categories.model';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DialogCategoriesComponent } from '../dialog/dialog-categories/dialog-categories.component';
import { map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { JwtService } from 'src/app/services/jwt.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.sass']
})
export class CategoriesComponent implements OnInit {

  element_data: Categories[];
  displayedColumns: string[] = ['id', 'label', 'action'];
  data = new MatTableDataSource<Categories>();
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
    this.ressourceService.getAll('categories')
    .pipe(map(data => data['hydra:member'] as Categories[]))
    .subscribe(data => {
      console.log(this.sort)
      console.log(this.paginator)

      this.data = new MatTableDataSource<Categories>(data);
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
    console.log(element)
    element.action = action
    const dialogRef = this.dialog.open(DialogCategoriesComponent, {
      width: '250px',
      data: {data: element}
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log(res)
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
      label:row_obj.label,
      events: row_obj.events
    });
    this.data.data = this.data.data.filter((value, key)=>{
      return true
    })
    
  }
  updateRowData(row_obj){
    this.data.data = this.data.data.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.label = row_obj.label;
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
