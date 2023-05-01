const { read, write } = require('../utils/module')

const productsController = {
      GET: (req, res) => {
            const { categoryId, subCategoryId, model } = req.query; //// kelgan malumotni oldik
            const subCategories = read('subCategories') //// subcategoriesni oqidik
            const products = read('products') ///// productsni oqidik
            let resut = [] 
            if (categoryId) {
                  subCategories.forEach(element => {
                        if (element.category_id == categoryId) {
                              let res = products.filter((el) => {
                                    return el.sub_category_id == element.sub_category_id //// productni idsi bilan subCategoryni id sini tekshirdik
                              })
                              resut.push(...res)
                        }
                  });
                  res.json(200, resut);
            }
            else {
                  res.json(200, [])
            }
      },
      POST: async (req, res) => {
            try {
                  const { sub_category_id, product_name, price, model, color } = await req.body; ////kelgan ma'lumotni olyapmiz
                  const products = read('products') //// productslar royhatini array korinishida oldik
                  const newProduct = {
                        product_id: products.at(-1).product_id + 1 || 1,
                        sub_category_id,
                        product_name,
                        price,
                        color,
                        model
                  } /////yangi product yaratdik
                  products.push(newProduct) ///// yangi productni qoshdik
                  write('products', products) ////yangi products ni yozib qoydik
                  res.json(204, { success: true, message: 'ok' }) //// yaxshi yakunlanganligi haqida
            } catch (error) {
                  res.json(400, { success: false, message: error.message }) //// error kelganini bildirdik
            }
      },
      PUT: async (req, res) => {
            try {
                  const { product_name, product_id, price, color, model } = await req.body  ////kelgan ma'lumotni olyapmiz
                  const products = read('products') //// productslarni oqidik
                  products.map(elem => {
                        if (elem.product_id == product_id) {
                              elem.product_name = product_name
                              elem.color = color
                              elem.model = model
                              elem.price = price
                        }
                  }) ///// qiymatlarni o'zgartirdik
                  write('products', products) //// o'zgargan ma'lumotni yozdik
                  res.json(200, { success: true, message: "ok" }) //// yaxshi yakunlanganligi haqida
            } catch (error) {
                  res.json(400, { success: false, message: error.message }) //// error kelganini bildirdik
            }
      },
      DELETE: async (req, res) => {
            try {
                  const { product_id } = await req.body //// kelgan id ni oldik
                  const products = read('products') ////products ni oqidik
                  let productIndex = products.findIndex(elem => elem.product_id == product_id) //// ochiriladigan fileni indexi
                  if (productIndex == -1) { ///// file ichkarida yoq bolsa error erdik
                        throw Error('invalid product_id')
                  }
                  products.splice(productIndex, 1) //// fileni ochirdik
                  write('products', products) //// yozib qoydik
                  res.json(200, { success: true, message: "ok" }) //// yaxshi bitgani haqida malumot
            } catch (error) {
                  res.json(400, { success: false, message: error.message }) //// xato chiqdi
            }
      }
}

module.exports = productsController