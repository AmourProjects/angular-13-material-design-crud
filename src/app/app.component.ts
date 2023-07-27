import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'AngularMatCrud';
  displayedColumns: string[] = ['nomProduit', 'categorie', 'date', 'etat', 'prix', 'commentaire', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private api: ApiService
  ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllProduits();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '40%'
    }).afterClosed().subscribe(result => {
      if (result === 'save') {
        this.getAllProduits();
      }
    });
  }

  getAllProduits() {
    this.api.getProduit().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: () => {
        alert('Erreur lors du chargement des données');
      }
    })
  }

  editProduit(produit: any){
    this.dialog.open(DialogComponent, {
      width: '40%',
      data: produit
    }).afterClosed().subscribe(result => {
      if (result === 'update') {
        this.getAllProduits();
      }
    });
  }

  deleteProduit(id:number){
    this.api.deleteProduit(id).subscribe({
      next:(res:any)=>{
        alert('Produit supprimé avec succès');
        this.getAllProduits();
      },
      error:()=>{
        alert('Erreur de suppression de produit');
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
