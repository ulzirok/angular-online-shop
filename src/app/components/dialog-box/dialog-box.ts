import { Component, inject, model } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-dialog-box',
  standalone: true,
  imports: [MatDialogModule, ReactiveFormsModule, FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './dialog-box.html',
  styleUrls: ['./dialog-box.scss']
})
export class DialogBox {
  myForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    price: new FormControl(''),
    chip: new FormControl(''),
    ssd: new FormControl(''),
    memory: new FormControl(''),
    display: new FormControl(''),
  })
  
  readonly dialogRef = inject(MatDialogRef<DialogBox>);
  public data = inject<any>(MAT_DIALOG_DATA);
  readonly animal = this.data.animal;

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  onSubmit() {
    this.data = {
      title: this.myForm.value.title,
      price: this.myForm.value.price,
      // image: this.myForm.value.image,
      image: "images/1.jpg",
      configure: {
        chip: this.myForm.value.chip,
        ssd: this.myForm.value.ssd,
        memory: this.myForm.value.memory,
        display: this.myForm.value.display,
      }
      
    }
    
    this.dialogRef.close(this.data)
    
  }
  
}
