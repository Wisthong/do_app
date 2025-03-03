import { Component, inject } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

@Component({
  selector: 'app-spinner',
  imports: [NgxUiLoaderModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css',
})
export class SpinnerComponent {
  private readonly spinnerSvc = inject(SpinnerService);
  isLoading$ = this.spinnerSvc.isLoading$;
  ngOnInit(): void {
    this.spinnerSvc.isLoading$.subscribe(
      (resOk) => {
        console.log(resOk);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
