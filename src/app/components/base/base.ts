import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-base',
  imports: [MatButtonModule, RouterLink],
  templateUrl: './base.html',
  styleUrl: './base.scss'
})
export class Base {

}
