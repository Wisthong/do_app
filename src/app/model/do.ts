export interface ResponseDo {
    ok:   boolean;
    data: Do[];
}

export interface Do {
    item:                    string;
    proveedor_codigo:        string;
    proveedor_nombre:        string;
    fecha:                   string;
    lista_descuento:         string;
    valor_descuentos:        string;
}
