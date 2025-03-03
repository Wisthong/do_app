import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
  const ngxUiLoaderSvc = inject(NgxUiLoaderService);
  let _activeRequest = 0;

  if (_activeRequest === 0) {
    ngxUiLoaderSvc.start();
  }
  _activeRequest++;

  const _stopLoader = () => {
    _activeRequest--;
    if (_activeRequest === 0) {
      ngxUiLoaderSvc.stop();
    }
  };

  return next(req).pipe(finalize(() => _stopLoader()));
};
