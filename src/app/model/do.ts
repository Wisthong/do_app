export interface ResponseDo {
    ok:   boolean;
    data: Do[];
}

export interface Do {
    item:                    string;
    nombre_item:             string;
    proveedor_codigo:        string;
    proveedor_nombre:        string;
    fecha:                   string;
    lista_descuento:         string;
    valor_descuentos:        string;
    centro_operacion:        string;
}


export interface DataDo{
    id_item:                 string,
    lapso_inicio:            string,
    lapso_fin:               string,
    id_co:                   string,
}