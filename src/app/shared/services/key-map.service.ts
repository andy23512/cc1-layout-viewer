import { Injectable } from '@angular/core';
import { NgxSerial } from 'ngx-serial';
import { Observable, Subject, map } from 'rxjs';
import { ACTIONS } from '../models/actions.const';
import { KeyMapping } from '../models/key-map.model';

@Injectable({
  providedIn: 'root',
})
export class KeyMapService {
  public getKeyMaps(): Observable<KeyMapping[]> {
    const subject = new Subject<string>();
    let rawData = '';
    let count = 0;
    (async () => {
      function dataHandler(data: string) {
        if (data) {
          rawData += data;
          count++;
        }
        if (count === 270) {
          subject.next(rawData);
          subject.complete();
          serial
            .close(() => {
              console.log('closed');
            })
            .catch((error) => {
              console.error(
                'Error happened while closing serial connection: ',
                error
              );
            });
        }
      }
      const serial = new NgxSerial(dataHandler, {
        baudRate: 115200,
      });
      await serial.connect(() => {
        console.log('connected');
      });
      for (let i = 1; i < 4; i++) {
        for (let j = 0; j < 90; j++) {
          await serial.sendData(`VAR B3 A${i} ${j}\r\n`);
        }
      }
    })().catch((error) => {
      console.error('Error happened while getting key map: ', error);
    });
    return subject.asObservable().pipe(
      map((rawData) => {
        return rawData
          .split('\r')
          .filter((l) => !!l)
          .map((line) => {
            const result = line.match(/^VAR B3 (A[1-3]) ([0-9]+) ([0-9]+) 0$/);
            if (result) {
              return {
                keyMap: result[1] as 'A1' | 'A2' | 'A3',
                index: parseInt(result[2]),
                action:
                  ACTIONS.find((a) => a.codeId === parseInt(result[3])) || null,
              };
            } else {
              console.error(line);
              return null;
            }
          })
          .filter((item): item is Exclude<typeof item, null> => !!item);
      })
    );
  }
}
