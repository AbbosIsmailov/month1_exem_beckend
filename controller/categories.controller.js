const { read, hashPassword, write } = require('../utils/module')

const categoryController = {
      GET: (req, res) => {
            const categories = read('categories') //// categoriesni oqidik
            const subCategories = read('subCategories') ////subcategoriesni oqidik
            categories.map((elem) => {
                  elem.subCategories = subCategories.filter(el => el.category_id == elem.category_id)
            }) //// categoriesni ichiga subcategorieslarni yozdik
            res.json(200, categories) //// jonatdik
      },
      POST: async (req, res) => {
            try {
                  const { category_name } = await req.body; //// kelgan infoni oldik
                  const categories = read('categories') //// fileni oqidik
                  const newCategory = {
                        category_id: categories.at(-1).category_id + 1 || 1,
                        category_name
                  } ////yangi category yaratdik
                  categories.push(newCategory) //// categoryni push qildik
                  write('categories', categories) //// categoryni yozib qoydik
                  res.json(204, { success: true, message: 'ok' }) //// jonatdik
            } catch (error) {
                  res.json(400, { success: false, message: error.message })
            }
      },
      PUT: async (req, res) => {
            try {
                  const { category_name, category_id } = await req.body  //// kelgan infoni oldik
                  const categories = read('categories')  //// fileni oqidik
                  categories.map(elem => {
                        if (elem.category_id == category_id) {
                              elem.category_name = category_name
                        }
                  }) //// yangi qiymatlarni tengladik
                  write('categories', categories) //// categoryni yozib qoydik
                  res.json(200, { success: true, message: "ok" })
            } catch (error) {
                  res.json(400, { success: false, message: error.message })
            }
      },
      DELETE: async (req, res) => {
            try {
                  const { category_id } = await req.body  //// kelgan infoni oldik
                  const categories = read('categories')  //// fileni oqidik
                  let categoryIndex = categories.findIndex(elem => elem.category_id == category_id) //// indexi boyicha topdik
                  if (categoryIndex == -1) {//// ichkarida yoq bolsa error berdik
                        throw Error('invalid category_id')
                  }
                  categories.splice(categoryIndex, 1) //// ochirdik
                  write('categories', categories) //// bu joyda yozdik
                  res.json(200, { success: true, message: "ok" })
            } catch (error) {
                  res.json(400, { success: false, message: error.message })
            }
      }
}

module.exports = categoryController