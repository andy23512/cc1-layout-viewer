import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ElectronService } from '../core/services';
import { KeyMapping } from '../shared/models/key-map.model';
import { SystemKeyboardMap } from '../shared/models/system-key-map.models';
import { KeyMapService } from '../shared/services/key-map.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public keyMaps: KeyMapping[] | null = null;
  public systemKeyboardMap: SystemKeyboardMap | null = null;
  public selectedLayerCode: 'A1' | 'A2' | 'A3' = 'A1';
  public layers = [
    { code: 'A1', name: 'Alpha' },
    { code: 'A2', name: 'Num-shift' },
    { code: 'A3', name: 'Function' },
  ];
  public selectedModifierKey:
    | 'value'
    | 'withShift'
    | 'withAltGr'
    | 'withShiftAltGR' = 'value';
  public modifiers = [
    { key: 'value', name: 'None' },
    { key: 'withShift', name: 'Shift' },
    { key: 'withAltGr', name: 'AltGr' },
    { key: 'withShiftAltGR', name: 'Shift + AltGr' },
  ];

  constructor(
    private keyMapService: KeyMapService,
    private electronService: ElectronService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  public async ngOnInit(): Promise<any> {
    await this.getOSKeyMap();
    this.electronService.ipcRenderer.on('keyboard-layout-change', () => {
      this.getOSKeyMap()
        .then(() => {
          this.changeDetectorRef.detectChanges();
        })
        .catch(() => {});
    });
  }

  public getKeyMaps() {
    this.keyMapService.getKeyMaps().subscribe((keyMaps) => {
      this.keyMaps = keyMaps;
    });
  }

  public async getOSKeyMap() {
    const result = await this.electronService.ipcRenderer.invoke(
      'get-native-keymap'
    );
    this.systemKeyboardMap = result;
  }
}
