class ProductManager {
    constructor (){
        this.products =[];
    }

    addProducts(title, description, price, thumbnail, code ,stock){


        const validarCode = 
            this.products.find((product) => product.code === code);
        if(validarCode){
            console.log('Ya existe el codigo del producto');
        }else{
        const product ={
            id: this.#getMaxId() + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };
        this.products.push(product);
        }
    }

    #getMaxId(){
        let maxId = 0;
        this.products.map((product) => {
            if(product.id > maxId) maxId = product.id;
        })
        return maxId;
    }

    getProducts(){
        return this.products;
    }

    getProductById(id){
        return this.products.find((product) => product.id === id);
    }
}

const productManager = new ProductManager();
productManager.addProducts('producto prueba1', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 10);
productManager.addProducts('producto prueba2', 'Este es un producto prueba', 300, 'Sin imagen', 'abc1234', 10);
console.log(productManager.getProducts());
productManager.addProducts('producto prueba1', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 10);
console.log(productManager.getProductById(1));
console.log(productManager.getProductById(2));