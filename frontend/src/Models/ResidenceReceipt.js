export class ResidenceReceipt {
  constructor(
    dateCreated,
    amount,
    description,
    residencePayments,
    personId, 
    address,
    residenceReceiptId
  ) {
    this.description = description;
    this.dateCreated = dateCreated;
    this.amount = amount;
    this.residencePayments = residencePayments;
    this.personId = personId;
    this.address = address;
    this.residenceReceiptId = residenceReceiptId;
  }
}
