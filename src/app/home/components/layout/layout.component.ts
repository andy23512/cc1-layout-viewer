import { Component, Input } from '@angular/core';
import { Layout } from '../../../shared/models/layout.models';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  @Input() public layout: Layout<string | null> = {};
  @Input() public highlightedKeys: string[] = [];
  public switches = [
    'thumbEnd',
    'thumbMid',
    'thumbTip',
    'index',
    'middle',
    'middleMid',
    'ring',
    'ringMid',
    'little',
  ] as const;
  public sides = ['left', 'right'] as const;
  public fadeSwitches = ['middleMid', 'ringMid', 'little'];
}
