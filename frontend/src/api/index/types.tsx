export interface Pjesme{
    pjesma_id: number;
    naslov: string;
    godina_izdanja: number;
    trajanje: number;

}

export interface Pjevaci{
    pjevac_id: number;
    ime: string;
    prezime: string;
    spol: string;
    datum_rodenja: string;
    mjesto_rodenja: string;
    mjesto_stanovanja: string;
    visina: string;
    opis: string;
    zanr: string;
}