class Card {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.id = `${x}${y}`;
    }

    setX(x) {
        this.x = x;
    }

    setY(y) {
        this.y = y;
    }

    setId(id) {
        this.id = id;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getId() {
        return this.id;
    }
}

export default Card;