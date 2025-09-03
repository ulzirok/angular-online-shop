import { Component, inject, model } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-box',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './dialog-box.html',
  styleUrls: ['./dialog-box.scss']
})
export class DialogBox {
  readonly dialogRef = inject(MatDialogRef<DialogBox>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  readonly animal = this.data.animal;

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  
}
