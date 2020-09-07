import { Component, OnInit } from '@angular/core';
import { fabric } from 'fabric';
import { MatDrawer } from '@angular/material/sidenav';
import { BehaviorSubject, Observable } from 'rxjs';

export interface menuItem {
  name: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'prodata-banner-creator-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  canvas: fabric.Canvas;
  activeMenuItem = new BehaviorSubject({});
  designMenuItems: menuItem[] = [
    {
      name: 'template',
      label: 'Template',
      icon: 'photo',
    },
    {
      name: 'text',
      label: 'Text',
      icon: 'font_download',
    },
    {
      name: 'element',
      label: 'Element',
      icon: 'dashboard',
    },
    {
      name: 'button',
      label: 'Button',
      icon: 'view_agenda',
    },
  ];

  get activeToolMenu$(): Observable<menuItem> {
    return this.activeMenuItem.asObservable() as Observable<menuItem>;
  }

  updateObjectCache() {
    console.log(this.canvas.getObjects());
  }

  openDrawer(drawer: MatDrawer, menuItem: menuItem): void {
    this.activeMenuItem.next(menuItem);
    console.log(menuItem);
    drawer.open();
  }

  ngOnInit(): void {
    this.canvas = new fabric.Canvas('canvas');
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: 'red',
      width: 20,
      height: 20,
    });

    this.canvas.add(rect);

    // rect.setColor('#000');

    fabric.Image.fromURL('../assets/email-banner-600_1447.jpg', (image) => {
      image
        .set({
          left: 0,
          top: 0,
        })
        .scaleToWidth(this.canvas.getWidth())
        .scaleToHeight(this.canvas.getHeight())
        .setCoords();

      this.canvas.add(image);

      this.canvas.renderAll();

      this.updateObjectCache();
    });

    this.canvas.on('mouse:up', (e) => {
      const obj: fabric.Object = this.canvas.getActiveObject();
      console.debug(obj);

      // this.canvas.sendBackwards(myObject)
      // this.canvas.sendToBack(myObject)
      // this.canvas.bringForward(myObject)
      // this.canvas.bringToFront(myObject)

      this.canvas.sendToBack(obj);

      // this.canvas.remove(this.canvas.getActiveObject());

      this.updateObjectCache();
    });
  }
}
