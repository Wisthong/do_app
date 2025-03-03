import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DoService } from './services/do.service';
import { Do } from './model/do';
import { SpinnerComponent } from './components/spinner/spinner.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'do_app';
  doObject: Do[] = [];

  private readonly doSvc = inject(DoService);

  // ngOnInit(): void {
  //   console.log('123');
  //   this.doSvc.postDO().subscribe(
  //     (resOk) => {
  //       console.log(resOk);
  //       this.doObject = resOk;
  //     },
  //     (resFail) => {
  //       console.log(resFail);
  //     }
  //   );
    // throw new Error('Method not implemented.');
  // }
}
