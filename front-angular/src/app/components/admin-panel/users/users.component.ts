import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { RessourcesService } from 'src/app/services/ressources.service';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { DialogUserComponent } from '../dialog/dialog-user/dialog-user.component';
import { User } from 'src/app/models/user.model';
import { JwtService } from 'src/app/services/jwt.service';
import { Token } from 'src/app/models/token.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})

export class UsersComponent implements OnInit {

  element_data: User[];
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email', 'address', 'roles', 'created_at', 'action'];
  data = new MatTableDataSource<User>();
  sort: any
  paginator: any
  loadingData = false;
  actions = [
    {label: 'edit'},
    {label: 'delete'}
  ];

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
    this.ressourceService.getAll('user')
    .pipe(map(data => data as User[]))
    .subscribe(data => {
      console.log(data)
      this.data = new MatTableDataSource<User>(data);
      this.data.sort = this.sort
      this.data.paginator = this.paginator
      this.loadingData = true
    },
    error => {
      console.log('ici lerreur ' + error)
      console.log(error.status)
      if(error.status === 403) {
        this.jwtService.jwtRefresh()
        .pipe(map(data => data as Token))
        .subscribe(res => {
            localStorage.setItem('currentUser', JSON.stringify(res.access_token))
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

    const dialogRef = this.dialog.open(DialogUserComponent, {
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
      firstname:row_obj.firstname,
      lastname:row_obj.lastname,
      address: row_obj.address,
      email: row_obj.email,
      roles: row_obj.roles,
      created_at: row_obj.created_at
    });
    this.data.data = this.data.data.filter((value, key)=>{
      return true
    })
    
  }
  updateRowData(row_obj){
    this.data.data = this.data.data.filter((value,key)=>{
      if(value.id == row_obj.id){
        console.log('ok')
        value.firstname = row_obj.firstname,
        value.lastname = row_obj.lastname,
        value.address = row_obj.address,
        value.email = row_obj.email,
        value.roles = row_obj.roles
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
