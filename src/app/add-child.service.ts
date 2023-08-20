import { Injectable } from '@angular/core';
import { AdItem } from './add-item/add-item';
import { ChildComponent } from './add-item/child.component';

@Injectable({
  providedIn: 'root'
})
export class AddChildService {

  getAds() {
    return [
      new AdItem(
        ChildComponent,
        { name: 'Bombasto', bio: 'Brave as they come' }
      ),
      new AdItem(
        ChildComponent,
        { name: 'Dr. IQ', bio: 'Smart as they come' }
      ),
      new AdItem(
        ChildComponent,
        { headline: 'Hiring for several positions', body: 'Submit your resume today!' }
      )

    ];
  }
}
