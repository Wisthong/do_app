import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DoService } from '../../services/do.service';
import { DataDo, Do } from '../../model/do';
import { TableComponent } from '../table/table.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-prueba',
  imports: [ReactiveFormsModule, TableComponent],
  templateUrl: './prueba.component.html',
  styleUrl: './prueba.component.css',
})
export class PruebaComponent {
  listDO: Do[] = [];
  private readonly fb = inject(FormBuilder);
  private readonly doSvc = inject(DoService);
  private readonly toastrSvc = inject(ToastrService);

  searchForm = this.fb.nonNullable.group({
    id_item: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(6)],
    ],
    lapso_inicio: [
      '',
      [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
    ],
    lapso_fin: [
      '',
      [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
    ],
  });

  onSearch() {
    if (this.searchForm.valid) {
      const { id_item, lapso_fin, lapso_inicio } =
        this.searchForm.getRawValue();

      if (id_item.length !== 6) {
        const newItem = id_item.padStart(6, '0');
        this.searchForm.get('id_item')?.setValue(newItem);

        const arrayTmp: DataDo = {
          id_item: newItem,
          lapso_fin,
          lapso_inicio,
        };

        this.doSvc.postDO(arrayTmp).subscribe(
          (resOk) => {
            if (resOk.item !== null) {
              const exists = this.listDO.some(
                (item) => item.item === resOk.item
              );

              if (exists) {
                this.toastrSvc.info(
                  'El elemento ya está en la lista',
                  'Mensaje'
                );
                return; // No agregamos el item si ya existe
              }

              this.listDO = [resOk, ...this.listDO.reverse()]; // Asegúrate de no mutar la lista directamente
              this.toastrSvc.success('Busqueda completada', 'Mensaje');
            } else {
              this.toastrSvc.warning(
                'Parametros de busqueda sin coincidencia',
                'Advertencia'
              );
            }
          },
          ({ error }: HttpErrorResponse) => {
            if (error.message !== undefined) {
              this.toastrSvc.warning(error.message, 'Error');
            } else {
              this.toastrSvc.warning(
                'Por favor intentar más tarde, informar al dev....',
                'Error'
              );
            }
            // }
          }
        );
      } else if (id_item.length === 6) {
        const arrayTmp: DataDo = {
          id_item,
          lapso_fin,
          lapso_inicio,
        };
        this.doSvc.postDO(arrayTmp).subscribe(
          (resOk) => {
            const exists = this.listDO.some((item) => item.item === resOk.item);

            if (exists) {
              this.toastrSvc.info('El elemento ya está en la lista', 'Mensaje');
              return; // No agregamos el item si ya existe
            }
            this.listDO = [resOk, ...this.listDO.reverse()]; // Asegúrate de no mutar la lista directamente
            this.toastrSvc.success('Busqueda completada', 'Mensaje');
          },
          ({ error }: HttpErrorResponse) => {
            if (error.message !== undefined) {
              this.toastrSvc.warning(error.message, 'Error');
            } else {
              this.toastrSvc.warning(
                'Por favor intentar más tarde, informar al dev....',
                'Error'
              );
            }
          }
        );
      }
    } else {
      this.toastrSvc.warning('Formulario no válido', 'Advertencia');
    }
  }
}
