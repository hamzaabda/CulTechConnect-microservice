export class Parteneriat {
  idParteneriat: number;
  nomParteneriat: string;
  numeroTelephone: number;
  email: string;
  description: string;

  constructor(
    idParteneriat: number,
    nomParteneriat: string,
    numeroTelephone: number,
    email: string,
    description: string
  ) {
    this.idParteneriat = idParteneriat;
    this.nomParteneriat = nomParteneriat;
    this.numeroTelephone = numeroTelephone;
    this.email = email;
    this.description = description;
  }
}
