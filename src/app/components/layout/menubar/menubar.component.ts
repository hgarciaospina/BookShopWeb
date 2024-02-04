import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import {MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-layout-menubar',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.scss'
})
export class LayoutMenubarComponent {

}
