import id_0 from './CoffeeTypes/expresso-tradicional.png';
import id_1 from './CoffeeTypes/expresso-americano.png';
import id_2 from './CoffeeTypes/expresso-cremoso.png';
import id_3 from './CoffeeTypes/expresso-gelado.png';
import id_4 from './CoffeeTypes/cafe-com-leite.png';
import id_5 from './CoffeeTypes/latte.png';
import id_6 from './CoffeeTypes/capuccino.png';
import id_7 from './CoffeeTypes/macchiato.png';
import id_8 from './CoffeeTypes/mocaccino.png';
import id_9 from './CoffeeTypes/chocolate-quente.png';
import id_10 from './CoffeeTypes/cubano.png';
import id_11 from './CoffeeTypes/havaiano.png';
import id_12 from './CoffeeTypes/arabe.png';
import id_13 from './CoffeeTypes/irlandes.png';

export function getImage(id: number) {
    switch (id){
        case 0:
            return id_0
        case 1:
            return id_1
        case 2:
            return id_2
        case 3:
            return id_3
        case 4:
            return id_4
        case 5:
            return id_5
        case 6:
            return id_6
        case 7:
            return id_7
        case 8:
            return id_8
        case 9:
            return id_9
        case 10:
            return id_10
        case 11:
            return id_11
        case 12:
            return id_12
        case 13:
            return id_13
    }
}
