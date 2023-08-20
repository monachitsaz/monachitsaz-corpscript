import { Component, Input, ViewChild } from '@angular/core';
import { CreateChildDirective } from '../create-child.directive';
import { AdComponent } from 'src/AdComponent';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  @Input() dataModel: AdComponent[] = [];

  currentAdIndex = -1;
  @ViewChild(CreateChildDirective, {static: true}) createChild!: CreateChildDirective;
  callChildCom(){

  }

  loadComponent() {
    this.currentAdIndex = (this.currentAdIndex + 1) % this.dataModel.length;
    const adItem = this.dataModel[this.currentAdIndex];

    const viewContainerRef = this.createChild.viewContainerRef;
    viewContainerRef.clear();

    // const componentRef = viewContainerRef.createComponent<CreateChildDirective>(adItem.component);
    // componentRef.instance.data = adItem.data;
  }
}
