let paqueteActual,
    cuentaPeticion = 0,
    puntoInicio,
    distanciaEsp1,
    distanciaOrig1,
    distanciaEsp0,
    distanciaOrig0,
    nuevaDistancia,
    band;
let rpm = parseInt(prompt("RPM;", "FAIL"), 10);
let carasUtilizables = parseInt(prompt("Caras Utilizables:", "FAIL"), 10);
let pistasXCara = parseInt(prompt("Pistas x Cara:", "FAIL"), 10);
let sectoresXPista = parseInt(prompt("Sectores x Pista:", "FAIL"), 10);
let pasoCilindro = parseFloat(prompt("Paso de Cilindro:", "FAIL"));
let discoOrigpaq0 = parseInt(prompt("Disco Orig Paquete 0 ", "FAIL"), 10);
let discoOrigpaq1 = parseInt(prompt("Disco Orig Paquete 1 ", "FAIL"), 10);
let discoEsppaq0 = parseInt(prompt("Disco Esp Paquete 0 ", "FAIL"), 10);
let discoEsppaq1 = parseInt(prompt("Disco Esp Paquete 1 ", "FAIL"), 10);

let cantPet = parseInt(prompt("CUANTAS PETICIONES", "FAIL"), 10);

for (i = 0; i < cantPet; i++) {
    let peticion = parseInt(
        prompt(
            "Peticion en numeros (si te dan sectores y cilindfros, TODO TODO TODO TODO:",
            "FAIL"
        ),
        10
    );
    cuentaPeticion++;
    console.log(`-----PETICION ${cuentaPeticion} AL SECTOR ${peticion}-----`);

    let sectoresXCilindro = carasUtilizables * sectoresXPista;
    console.log(`Sectores por cilindro: ${sectoresXCilindro}`);

    let sectoresTotalesPaquete =
        carasUtilizables * pistasXCara * sectoresXPista;
    console.log(`Sectores en un paquete: ${sectoresTotalesPaquete}`);

    paqueteMeta = Math.floor(peticion / sectoresTotalesPaquete);
    console.log(`Paquete Meta: ${paqueteMeta}`);

    sectorMeta = peticion % sectoresTotalesPaquete;
    console.log(`Sector Meta: ${sectorMeta}`);

    if (paqueteMeta === 1) {
        if (discoEsppaq1 === discoOrigpaq1) {
            puntoInicio = discoOrigpaq1;
            band = 1;
        } else {
            distanciaEsp1 = Math.abs(peticion - discoEsppaq1);
            distanciaOrig1 = Math.abs(peticion - discoOrigpaq1);

            if (distanciaEsp1 < distanciaOrig1) {
                puntoInicio = discoEsppaq1;
                band = 2;
            } else {
                puntoInicio = discoOrigpaq1;
                band = 3;
            }
        }
    } else {
        if (discoEsppaq0 === discoOrigpaq0) {
            puntoInicio = discoOrigpaq0;
            band = 4;
        } else {
            distanciaEsp0 = Math.abs(peticion - discoEsppaq0);
            distanciaOrig0 = Math.abs(peticion - discoOrigpaq0);

            if (distanciaEsp0 < distanciaOrig0) {
                puntoInicio = discoEsppaq0;
                band = 5;
            } else {
                puntoInicio = discoOrigpaq0;
                band = 6;
            }
        }
    }

    console.log(`band: ${band}`);
    let cylEstoy = Math.floor(puntoInicio / sectoresXCilindro);
    let secEstoy = puntoInicio % sectoresXCilindro;
    let cylVoy = Math.floor(sectorMeta / sectoresXCilindro);
    let secVoy = sectorMeta % sectoresXCilindro;

    console.log(`Sec estoy: ${secEstoy}`);
    console.log(`Cyl estoy: ${cylEstoy}`);
    console.log(`Sec voy: ${secVoy}`);
    console.log(`Cyl voy: ${cylVoy}`);

    let seekTime = Math.abs((cylEstoy - cylVoy) * pasoCilindro);
    seekTime = seekTime.toFixed(2);
    console.log(`SEEKTIME: ${seekTime} ms`);

    let unaVuelta = (1 * 60000) / rpm;
    unaVuelta = unaVuelta.toFixed(2);
    console.log(`una vuelta: ${unaVuelta} ms`);

    let unSector = (1 * unaVuelta) / sectoresXPista;
    unSector = console.log(
        `Un sector: ${unSector} ms (ver este output manualmente)`
    );
    unSector = parseFloat(prompt("Refonfear un sector manualmente", "FAIL"));

    console.log(`UN SECTOR BIEN: ${unSector} ms`);

    let sectTransferido = (seekTime * sectoresXPista) / unaVuelta;
    sectTransferido = Math.ceil(sectTransferido);
    console.log(`sectores transf: ${sectTransferido} `);

    let aux1 = sectTransferido + secEstoy;

    let nuevoSecEstoy = aux1 % sectoresXPista;
    console.log(`Nuevo sec estoy: ${nuevoSecEstoy}`);
    let nuevoSecVoy = secVoy % sectoresXPista;
    console.log(`Nuevo sec voy: ${nuevoSecVoy}`);

    if (nuevoSecEstoy > nuevoSecVoy) {
        searchTime = (sectoresXPista - nuevoSecEstoy + nuevoSecVoy) * unSector;
    } else {
        searchTime = (nuevoSecVoy - nuevoSecEstoy) * unSector;
    }
    console.log(`SEARCHTIME: ${searchTime} (redondea esrte poutput manual)`);
    searchTime = parseFloat(prompt("Refonfear manualmente", "FAIL"));
    console.log(`SEARCHTIME BIEN: ${searchTime} `);
    console.log(`ACCESS TIME: ${parseFloat(seekTime)+parseFloat(searchTime)}`);

    switch (band) {
        case 1:
            discoOrigpaq1 = sectorMeta;
            discoEsppaq1 = sectorMeta;
            break;
        case 2:
            discoEsppaq1 = sectorMeta;
            break;
        case 3:
            discoOrigpaq1 = sectorMeta;
            break;
        case 4:
            discoOrigpaq0 = sectorMeta;
            discoEsppaq0 = sectorMeta;
            break;
        case 5:
            discoEsppaq0 = sectorMeta;
            break;
        case 6:
            discoOrigpaq0 = sectorMeta;
            break;
    }
}
