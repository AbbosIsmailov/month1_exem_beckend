const http = require('http')
const { read, write, hashPassword } = require('./utils/module')
const Express = require('./lib/express')
const adminControler = require('./controller/adminControllers')
const categoriesController = require('./controller/categories.controller')
const subCategoriesController = require('./controller/subCategory.controller')
const productController = require('./controller/products.controller')


function httpServer(req, res) {
      const app = new Express(req, res) 

      app.get('/products', productController.GET)    //// productsni chaqirdik
      app.post('/products', productController.POST)  //// productsga post qildik
      app.put('/products', productController.PUT)    //// productsni put qildik
      app.delete('/products', productController.DELETE) //// productsni delete boldi
      app.get('/categories', categoriesController.GET)  //// categoriesni get qildik
      app.post('/categories', categoriesController.POST) //// categoriesni post qildik
      app.put('/categories', categoriesController.PUT)   //// categoriesni put qildik
      app.delete('/categories', categoriesController.DELETE)  //// categoriesni delete qildik
      app.get('/subcategories', subCategoriesController.GET)  //// subCategoriesni get qildik
      app.post('/subcategories', subCategoriesController.POST) //// subCategoriesni post qildik
      app.put('/subcategories', subCategoriesController.PUT)   //// subCategoriesni put qildik
      app.delete('/subcategories', subCategoriesController.DELETE)  //// subCategoriesni delete qildik
      app.post('/admin', adminControler.POST)  //// adminni signin qildik

}

const server = http.createServer(httpServer)
server.listen(5000, () => console.log('servre ishladi'))