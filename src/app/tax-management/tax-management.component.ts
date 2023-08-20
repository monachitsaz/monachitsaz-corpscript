import { Component } from '@angular/core';
import { TaxModel } from './tax-model/tax.model';
import { ApiService } from './tax_service/api.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'tax-management',
  templateUrl: './tax-management.component.html',
  styleUrls: ['./tax-management.component.css']
})
export class TaxManagementComponent {
  formGroup: FormGroup;
  allTaxes!: TaxModel[];
  currentTax!: TaxModel
  id: number

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      active: new FormControl(''),
      division_id: new FormControl('10'),
      tax_id: new FormControl(''),
      tax_description: new FormControl('')

    });

    this.login();
    this.getAllTaxes();
  }

  getAllTaxes() {
    this.api.getAll().subscribe(res => {
      this.allTaxes = res.results
      console.log(this.allTaxes)
    });
  }

  submitForm() {
    let infoData = this.formGroup.value;
    if (this.id === 0) {
      this.api.create(infoData)
        .subscribe((response) => {
          alert("data inserted successfully")
        })
      
      
    }
    else {
      this.api.update(infoData,this.id).subscribe(response => {
        alert("data updated successfully")
      })
    }
    this.formGroup.reset();
    this.formGroup.controls.division_id.setValue('10');
    this.getAllTaxes();
  }

  login() {
    let username = 'chitsazmn@gmail.com';
    let password = '12345';
    this.api.login(username, password).subscribe({
      next: (result) => {
        this.api.setToken(result);
      },
      error: (err: ErrorEvent) => {
        alert('error')
      }
    })
  }

  editRow(id: number) {
    this.api.getById(id).subscribe(res => {
      this.currentTax = res;
     this.id= this.currentTax.id
      this.formGroup.controls.active.setValue(this.currentTax.active);
      this.formGroup.controls.division_id.setValue(this.currentTax.division_id);
      this.formGroup.controls.tax_id.setValue(this.currentTax.tax_id);
      this.formGroup.controls.tax_description.setValue(this.currentTax.tax_description);
    })
  }

  deleteRow(id: number) {
    this.api.delete(id).subscribe(res => {
      alert(`record having id:${id} has been deleted successfully`)
    })
    this.getAllTaxes();
  }
}

