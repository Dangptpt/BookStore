export default class Book {
    constructor(name, author, category, publish_year, publish_company, price) {
        this.name = name;
        this.category = category;
        this.author = author;
        this.publish_company = publish_company;
        this.publish_year = publish_year;
        this.price = price;
    }
}