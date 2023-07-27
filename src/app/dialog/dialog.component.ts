import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  listEtatProduit = ['Tout neuf','Deuxième main','Remis à neuf'];
  produitForm!: FormGroup;
  libelleBtn = 'Sauvegarder'

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>
  ) { }

  ngOnInit(): void {
    this.produitForm = this.formBuilder.group({
      nomProduit: ['', Validators.required],
      categorie: ['', Validators.required],
      etat: ['', Validators.required],
      prix: ['', Validators.required],
      commentaire: ['', Validators.required],
      date: ['', Validators.required]
    });

    if (this.editData) {
      this.libelleBtn = 'Modifier'
      this.produitForm.setValue({
        nomProduit: this.editData.nomProduit,
        categorie: this.editData.categorie,
        etat: this.editData.etat,
        prix: this.editData.prix,
        commentaire: this.editData.commentaire,
        date: this.editData.date
      })
    }
  }


  addProduit(){

    if (!this.editData) {
      this.api.postProduit(this.produitForm.value).subscribe({
        next:(res:any)=>{
          alert('Produit ajouté avec succès');
          this.produitForm.reset();
          this.dialogRef.close('save');
        },
        error:()=>{
          alert('Error d\'ajout de produit');
        }
      });
    }else{
      this.api.putProduit(this.produitForm.value, this.editData.id).subscribe({
        next:(res:any)=>{
          alert('Produit modifié avec succès');
          this.produitForm.reset();
          this.dialogRef.close('update');
        },
        error:()=>{
          alert('Erreur de modification de produit');
        }
      });
    }
  }

}
