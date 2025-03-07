import { Component, inject, Input } from '@angular/core';
import { Do } from '../../model/do';
import { ToastrService } from 'ngx-toastr';
import { DoService } from '../../services/do.service';

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  @Input() listDO: Do[] = [];
  listSelectionDO: Do[] = [];
  private readonly toastrSvc = inject(ToastrService);
  private readonly doSvc = inject(DoService);
  btnSeleccionado!: string;

  onSave(doItem: Do) {
    // Verificar si doItem ya está en la lista
    const exists = this.listSelectionDO.some(
      (item) => item.item === doItem.item
    );

    if (exists) {
      this.toastrSvc.info('El elemento ya está en la lista', 'Mensaje');
      return; // No agregamos el item si ya existe
    }

    this.toastrSvc.info(
      'Elemento grabado para generar plano:  ' +
        (this.listSelectionDO.length + 1),
      'Mensaje'
    );

    // Si no existe, lo agregamos
    this.listSelectionDO = [...this.listSelectionDO, doItem];
    // Aquí puedes agregar tu lógica para guardar los datos
  }

  onDelete(index: number) {
    // Obtener el item que se va a eliminar
    const deletedItem = this.listDO[index];

    // Eliminar el item de listDO
    this.listDO.splice(index, 1);

    // Eliminar el mismo item de listSelectionDO si está presente
    this.listSelectionDO = this.listSelectionDO.filter(
      (item) => item.item !== deletedItem.item
    );

    // Actualizar la referencia de listDO
    this.listDO = [...this.listDO];

    // Actualizar la referencia de listSelectionDO
    this.listSelectionDO = [...this.listSelectionDO];

    this.toastrSvc.success('Elemento eliminado', 'Eliminado');
  }

  onGeneratePlan() {
    let codigo;
    switch (this.btnSeleccionado) {
      case 'kelly':
        codigo = '003';

        this.generateArchivePlan(codigo, 'kelly'.toUpperCase());
        break;
      case 'mayer':
        codigo = '012';

        this.generateArchivePlan(codigo, 'mayer'.toUpperCase());
        break;
      case 'ingrid':
        codigo = '038';

        this.generateArchivePlan(codigo, 'ingrid'.toUpperCase());
        break;
      case 'alejandro':
        codigo = '009';
        this.generateArchivePlan(codigo, 'alejandro'.toUpperCase());
        break;
      default:
        break;
    }
  }

  btnKelly() {
    this.btnSeleccionado = 'kelly';
    this.toastrSvc.info(this.btnSeleccionado.toUpperCase(), 'Comprador');
  }
  btnMayer() {
    this.btnSeleccionado = 'mayer';
    this.toastrSvc.info(this.btnSeleccionado.toUpperCase(), 'Comprador');
  }
  btnAlejandro() {
    this.btnSeleccionado = 'alejandro';
    this.toastrSvc.info(this.btnSeleccionado.toUpperCase(), 'Comprador');
  }
  btnIngrid() {
    this.btnSeleccionado = 'ingrid';
    this.toastrSvc.info(this.btnSeleccionado.toUpperCase(), 'Comprador');
  }

  // TODO: Función para generar 4 dígitos aleatorios
  generarDigitosAleatorios(): string {
    let digitos = '';
    for (let i = 0; i < 4; i++) {
      digitos += Math.floor(Math.random() * 10).toString();
    }
    return digitos;
  }

  // TODO: Funcion para generar archivo plano
  generateArchivePlan(codigo: string, comprador: string) {
    const now = new Date();
    const anio = now.getUTCFullYear(); // Usando UTC para evitar problemas de zona horaria
    const mes = (now.getUTCMonth() + 1).toString().padStart(2, '0');
    const dia = now.getUTCDate().toString().padStart(2, '0'); // Usando UTC

    const randomDigits = this.generarDigitosAleatorios();

    // Crear el nombre del archivo con el formato deseado
    const nombreArchivo = `${comprador.slice(0, 3)}${randomDigits}T.AC1`;

    // Crear el contenido del archivo, agregando la posición de cada elemento con un salto de línea
    let contenido = '';
    for (let index = 0; index < this.listSelectionDO.length; index++) {
      //TODO: Formateamos el valor_descuentos
      let valor_descuentos = Math.floor(
        parseFloat(this.listSelectionDO[index].valor_descuentos)
      );
      let valorFormateado = valor_descuentos.toFixed(2).replace('.', ''); // Elimina el punto
      while (valorFormateado.length < 11) {
        // Aseguramos 9 enteros + 2 decimales
        valorFormateado = '0' + valorFormateado; // Rellenamos con ceros a la izquierda
      }
      valorFormateado += '+';

      contenido += `${(index + 1)
        .toString()
        .padEnd(8, ' ')}${this.listSelectionDO[index].proveedor_codigo
        .toString()
        .padEnd(13, ' ')}00${anio}${mes}${dia}${codigo.padEnd(
        4,
        ' '
      )}0  00310I               ${
        this.listSelectionDO[index].item
      }            ${valorFormateado}0000000001                                                             00000000        0000000000000000000000000\n`;
    }

    // Crear un Blob con el contenido
    const blob = new Blob([contenido], { type: 'text/plain' });
    // this.toastrSvc.success('Se va a generar el archivo plano', 'Mensaje');
    this.handleFileUpload(blob, nombreArchivo);

    // setTimeout(() => {
    //   // Crear un enlace para descargar el archivo
    //   const enlace = document.createElement('a');
    //   enlace.href = URL.createObjectURL(blob);
    //   enlace.download = nombreArchivo; // Nombre dinámico con los dígitos aleatorios
    //   enlace.click();
    // }, 1000 * 5);
  }

  // TODO: Funcion para envio al backend
  handleFileUpload(file: Blob, nombreArchivo: string): void {
    // Crear un FormData con el archivo Blob
    const formData = new FormData();
    formData.append('file', file, nombreArchivo); // 'file' es el campo esperado por el backend

    // Llamamos al método uploadFile() para enviar el archivo
    this.doSvc.uploadFile(formData).subscribe(
      (resOk) => {
        this.toastrSvc.success(
          'Archivo generado y enviado correctamente\n' + nombreArchivo,
          'Mensaje'
        );
      },
      (resFail) => {
        this.toastrSvc.error('Error al comunicar con el servidor', 'Error');
      }
    );
  }
}
