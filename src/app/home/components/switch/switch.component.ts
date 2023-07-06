import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DirectionMap } from '../../../shared/models/layout.models';

function sin(deg: number) {
  return Math.sin((deg / 180) * Math.PI);
}

function cos(deg: number) {
  return Math.cos((deg / 180) * Math.PI);
}
const o = 8;
const r1 = 57;
const r2 = 167;

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchComponent {
  @Input() public d: Partial<DirectionMap<string | null>> = {};
  @Input() public highlightedKeys: string[] = [];

  public keyColor(key: string | null | undefined) {
    return key && this.highlightedKeys.includes(key) ? '#43e272' : '#8099E5';
  }

  public sectorPath(d: number) {
    return [
      `M ${o * cos(d) + r1 * cos(d - 45)} ${o * sin(d) + r1 * sin(d - 45)}` +
        `A ${r1} ${r1} 0 0 1 ${o * cos(d) + r1 * cos(d + 45)}
  ${o * sin(d) + r1 * sin(d + 45)}` +
        `L ${o * cos(d) + r2 * cos(d + 45)} ${o * sin(d) + r2 * sin(d + 45)}` +
        `A ${r2} ${r2} 0 0 0 ${o * cos(d) + r2 * cos(d - 45)} ${
          o * sin(d) + r2 * sin(d - 45)
        }`,
    ].join(' ');
  }

  public textX(d: number) {
    return ((r1 + r2) / 2) * cos(d);
  }
  public textY(d: number) {
    return ((r1 + r2) / 2) * sin(d);
  }
}
