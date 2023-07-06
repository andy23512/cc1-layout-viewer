import { Component, Input, OnChanges } from '@angular/core';
import { KEY_ID_LAYOUT } from '../../../shared/models/key-id-layout.const';
import { KeyMapping } from '../../../shared/models/key-map.model';
import {
  DirectionMap,
  FingerMap,
  HandMap,
  Layout,
} from '../../../shared/models/layout.models';
import { SystemKeyboardMap } from '../../../shared/models/system-key-map.models';

function layoutMap<T, U>(layout: Layout<T>, func: (arg: T) => U): Layout<U> {
  const output: Layout<U> = {};
  Object.entries(layout).forEach(([hand, fingerMap]) => {
    const outputFingerMap: Partial<FingerMap<Partial<DirectionMap<U>>>> = {};
    Object.entries(fingerMap).forEach(([finger, directionMap]) => {
      const outputDirectionMap: Partial<DirectionMap<U>> = {};
      Object.entries(directionMap).forEach(([direction, value]) => {
        outputDirectionMap[direction as keyof DirectionMap<U>] = func(value);
      });
      outputFingerMap[finger as keyof FingerMap<U>] = outputDirectionMap;
    });
    output[hand as keyof HandMap<U>] = outputFingerMap;
  });
  return output;
}

@Component({
  selector: 'app-layout-viewer',
  templateUrl: './layout-viewer.component.html',
  styleUrls: ['./layout-viewer.component.css'],
})
export class LayoutViewerComponent implements OnChanges {
  @Input() public keyMaps: KeyMapping[] | null = null;
  @Input() public systemKeyboardMap: SystemKeyboardMap | null = null;
  @Input() public layerCode: 'A1' | 'A2' | 'A3' = 'A1';
  @Input() public modifierKey:
    | 'value'
    | 'withShift'
    | 'withAltGr'
    | 'withShiftAltGR' = 'value';
  public finalLayout: Layout<string | null> = {};

  public ngOnChanges(): void {
    this.finalLayout = layoutMap(KEY_ID_LAYOUT, (keyId) => {
      const action = this.keyMaps?.find(
        (key) => key?.index === keyId && key?.keyMap === this.layerCode
      )?.action;
      if (action) {
        if (action.writingSystemKeyCode) {
          const outputCharacter =
            this.systemKeyboardMap?.[action.writingSystemKeyCode]?.[
              this.modifierKey
            ];
          if (outputCharacter) {
            return outputCharacter;
          }
        }
      }
      return null;
    });
  }
}
