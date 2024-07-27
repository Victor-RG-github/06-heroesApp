import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: ``,
})
export class LayoutPageComponent {
  sidebarItems = [
    { label: 'Add', icon: 'add', url: './new-hero' },
    { label: 'List', icon: 'label', url: './list' },
    { label: 'Search', icon: 'search', url: './search' },
  ];
}
