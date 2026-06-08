import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLeaf, faHammer, faGear, faRobot, faHouse } from '@fortawesome/free-solid-svg-icons';

interface NavigationItem {
  label: string;
  icon: any;
  route: string;
}

@Component({
  selector: 'app-left-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FontAwesomeModule],
  templateUrl: './leftNav.html',
})
export class LeftNavComponent {
  @Input() navTitle = 'Menu 1';
  collapsed = signal(false);

  navigationItems: NavigationItem[] = [
    {
      label: 'My Gardens',
      icon: faHouse,
      route: '/gardens',
    },
    {
      label: 'Plants',
      icon: faLeaf,
      route: '/plants',
    },
    {
      label: 'Tools',
      icon: faHammer,
      route: '/tools',
    },
    {
      label: 'Settings',
      icon: faGear,
      route: '/settings',
    },
    {
      label: 'Ask AI',
      icon: faRobot,
      route: '/ask-ai',
    },
  ];

  toggleSidebar(): void {
    this.collapsed.update((value) => !value);
  }
}
