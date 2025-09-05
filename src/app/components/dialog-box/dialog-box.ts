import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dialog-box',
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  templateUrl: './dialog-box.html',
  styleUrls: ['./dialog-box.scss']
})
export class DialogBox implements OnInit {

  readonly dialogRef = inject(MatDialogRef<DialogBox>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  isNew = true;

  myForm!: FormGroup;

  ngOnInit(): void {
    // если пришли данные (редактирование), меняем isNew
    if (this.data && this.data.id) {
      this.isNew = false;
    }

    // инициализация формы
    this.myForm = new FormGroup({
      id: new FormControl(this.data?.id ?? null),
      title: new FormControl(this.data?.title ?? ''),
      price: new FormControl(this.data?.price ?? ''),
      chip: new FormControl(this.data?.configure?.chip ?? ''),
      ssd: new FormControl(this.data?.configure?.ssd ?? ''),
      memory: new FormControl(this.data?.configure?.memory ?? ''),
      display: new FormControl(this.data?.configure?.display ?? '')
    });
  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  onSubmit(): void {
    const result = {
      id: this.myForm.value.id,
      title: this.myForm.value.title,
      price: this.myForm.value.price,
      image: "images/1.jpg",
      configure: {
        chip: this.myForm.value.chip,
        ssd: this.myForm.value.ssd,
        memory: this.myForm.value.memory,
        display: this.myForm.value.display,
      }
    };

    this.dialogRef.close(result);
  }
}
