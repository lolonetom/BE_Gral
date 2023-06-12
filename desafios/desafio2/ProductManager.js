const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.products = []
        this.path = path
    }

    addProducts(title, description, price, thumbnail, code, stock) {


        const validarCode =
            this.products.find((product) => product.code === code);
        if (validarCode) {
            console.log('Ya existe el codigo del producto');
        } else {
            const product = {
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

    #getMaxId() {
        let maxId = 0;
        this.products.map((product) => {
            if (product.id > maxId) maxId = product.id;
        })
        return maxId;
    }


    async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const products = await fs.promises.readFile(this.path, 'utf-8');
                const productsjs = JSON.parse(products);
                return productsjs;

            } else {
                return this.products;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getProductById(id) {
        try {
            const productsFile = await this.getProducts();
            productsFile.push(id);
            await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
            return this.products.find((product) => product.id === id);
        } catch (error) {
            console.log(error);
        }
    }


    async updateProduct(id,value, data){
        try{
            const prodToUpdate = await this.getProductById (id);
            prodToUpdate[value] = data
            await fs.promises.writeFile(this.path, JSON.stringify(prodToUpdate));
        } catch (error){
            console.log(error);
        }
    }

/*     async deleteProduct(id){
        try {
            const findProduct = await this.getProductById(id);
            if (findProduct){}
        }catch (error){
            console.log(error);
        }

    } */
}



const productManager = new ProductManager('./products.json');

// PRIMER PRODUCTO //
const prod1={
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price:200,
    thumbnail:'Sin imagen',
    code: 'abc123',
    stock:25    
}


//------------------PRUEBAS-----------------------------------//
const test = async () => {
    const getProducts = await productManager.getProducts();
    console.log('los productos: ', getProducts);
    await productManager.addProducts(prod1);
    const getProducts2 = await productManager.getProducts();
    console.log('los productos: ', getProducts2);
}

test()