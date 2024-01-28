import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-layout-menubar',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    RouterLink
  ],
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.scss'
})
export class LayoutMenubarComponent {

}
