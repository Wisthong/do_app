import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DoService } from './services/do.service';
import { Do } from './model/do';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'do_app';
  doObject: Do[] = [];

  private readonly doSvc = inject(DoService);

  ngOnInit(): void {
    console.log('123');
    this.doSvc.postDO().subscribe(
      (resOk) => {
        console.log(resOk);
        this.doObject = resOk;
      },
      (resFail) => {
        console.log(resFail);
      }
    );
    // throw new Error('Method not implemented.');
  }
}
