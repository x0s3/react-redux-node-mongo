const excelbuilder = require('msexcel-builder');

module.exports = class Pers {

    static excel(persona) {

        let workbook = excelbuilder.createWorkbook('./', 'personas.xlsx');
        // Create a new worksheet with X columns and Y rows
        let sheet1 = workbook.createSheet('sheet1', Object.keys(persona[0]).length, (persona.length + 1));
        // Fill some data
        sheet1.set(1, 1, 'Nombre');
        sheet1.set(2, 1, 'Edad');
        sheet1.set(3, 1, 'Altura');
        sheet1.set(4, 1, 'Sexo');
        for (let i = 0; i < persona.length; i++) {
            sheet1.set(1, i+1, persona[i].nombre);
            sheet1.set(2, i+1, persona[i].edad);
            sheet1.set(3, i+1, persona[i].altura);
            sheet1.set(4, i+1, persona[i].sexo ? "Hombre" : "Mujer");
        }
        // Save it
        workbook.save(function (ok) {
            if (!ok)
                workbook.cancel();
            else
                return true;
        });
        return true;
    }
}
