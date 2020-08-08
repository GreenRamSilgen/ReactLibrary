export class Book{
    constructor(title, authors, description){
        this.title = title;
        this.authors = [];
        this.description = description;
        if(!authors) return;
        authors.forEach(element => {
            this.authors.push(element);
        });
    }
}