export class Parteneriat {
  idParteneriat: number;
  nomParteneriat: string;
  numeroTelephone: number;
  email: string;
  description: string;
  budget:number;
  verified:boolean;
  eventId:number;

  constructor(
    idParteneriat: number,
    nomParteneriat: string,
    numeroTelephone: number,
    email: string,
    description: string,
    budget:number,
    verified:boolean,
    eventId:number
  ) {
    this.idParteneriat = idParteneriat;
    this.nomParteneriat = nomParteneriat;
    this.numeroTelephone = numeroTelephone;
    this.email = email;
    this.description = description;
    this.budget=budget;
    this.verified=verified;
    this.eventId=eventId;
  }
}
