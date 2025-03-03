import { Component, inject, Input } from '@angular/core';
import { Do } from '../../model/do';
import { ToastrService } from 'ngx-toastr';

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

  ngOnInit(): void {
    const now = new Date();

    const anio = now.getUTCFullYear(); // Usando UTC para evitar problemas de zona horaria
    const mes = (now.getUTCMonth() + 1).toString().padStart(2, '0');
    const dia = now.getUTCDate().toString().padStart(2, '0'); // Usando UTC
    console.log(`${anio}${mes}${dia}`);
  }

  onSave(doItem: Do) {
    // Verificar si doItem ya está en la lista
    const exists = this.listSelectionDO.some(
      (item) => item.item === doItem.item
    );

    if (exists) {
      this.toastrSvc.info('El elemento ya está en la lista', 'Mensaje');
      return; // No agregamos el item si ya existe
    }

    this.toastrSvc.success('Guardando', 'Mensaje');

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

  onConfirm() {
    console.log('Me has presionado');
    console.log('Lista DO seleccionada es: ', this.listSelectionDO);
  }

  btnAlejandro() {
    const now = new Date();
    const anio = now.getUTCFullYear(); // Usando UTC para evitar problemas de zona horaria
    const mes = (now.getUTCMonth() + 1).toString().padStart(2, '0');
    const dia = now.getUTCDate().toString().padStart(2, '0'); // Usando UTC

    const randomDigits = this.generarDigitosAleatorios();

    // Crear el nombre del archivo con el formato deseado
    const nombreArchivo = `UCC${randomDigits}T.AC1`;

    // Crear el contenido del archivo, agregando la posición de cada elemento con un salto de línea
    let contenido = '';
    for (let index = 0; index < this.listSelectionDO.length; index++) {
      contenido += `${(index + 1)
        .toString()
        .padEnd(8, ' ')}${this.listSelectionDO[index].proveedor_codigo
        .toString()
        .padEnd(13, ' ')}00${anio}${mes}${dia}007 0  00310I               ${this.listSelectionDO[index].item}            ${Math.floor(parseFloat(this.listSelectionDO[index].valor_descuentos)).toString().padStart(11,'0')}+0000000001                                                             00000000        0000000000000000000000000\n`; // Agregar el número de la posición y un salto de línea
    }

    // Crear un Blob con el contenido
    const blob = new Blob([contenido], { type: 'text/plain' });

    // Crear un enlace para descargar el archivo
    const enlace = document.createElement('a');
    enlace.href = URL.createObjectURL(blob);
    enlace.download = nombreArchivo; // Nombre dinámico con los dígitos aleatorios
    enlace.click();
  }

  // Función para generar 4 dígitos aleatorios
  generarDigitosAleatorios(): string {
    let digitos = '';
    for (let i = 0; i < 4; i++) {
      digitos += Math.floor(Math.random() * 10).toString();
    }
    return digitos;
  }
}
