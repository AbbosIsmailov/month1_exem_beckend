const { read, hashPassword, write } = require('../utils/module')

const subCategoryController = {
      GET: (req, res) => {
            const subcategories = read('subcategories')  ////caubCategories fileni oqidik
            const products = read('products') 
            subcategories.map((elem) => {
                  elem.product = products.filter((el) => {
                       return el.sub_category_id == elem.sub_category_id
                  })
            })
            res.json(200, subcategories)
      },
      POST:  async (req, res) => {
            try {
                  const { category_id, sub_category_name } = await req.body; ////kelgan malumotni oldik
                  const subCategories = read('subCategories') ////caubCategories fileni oqidik
                  const categoryTest = subCategories.find(elem => elem.sub_category_name == sub_category_name)
                  if (categoryTest) { ////// ichkarida bor yoqligini tekshirdik
                        throw new Error("bunday sub_category bor")
                  } else {
                        const newSubCategory = { sub_category_id: subCategories.at(-1).sub_category_id + 1 || 1, category_id, sub_category_name }
                        subCategories.push(newSubCategory)
                        write('subCategories', subCategories)
                        res.json(204, { success: true, message: 'ok' })
                  }
            } catch (error) {
                  res.json(400, { success: false, message: error.message })
            }
      },
      PUT: async (req, res) => {
            try {
                  const { sub_category_name, sub_category_id } = await req.body
                  const subCategories = read('subCategories')
                  subCategories.map(elem => {
                        if (elem.sub_category_id == sub_category_id) {
                              elem.sub_category_name = sub_category_name
                              console.log(elem);
                        }
                  })
                  write('subCategories', subCategories)
                  res.json(200, { success: true, message: "ok" })
            } catch (error) {
                  res.json(400, { success: false, message: error.message })
            }
      },
      DELETE: async (req, res) => {
            try {
                  const { sub_category_id } = await req.body
                  const subCategories = read('subCategories')
                  let subCategoryIndex = subCategories.findIndex(elem => elem.sub_category_id == sub_category_id)
                  if (subCategoryIndex == -1) {
                        throw Error('invalid sub_category_id')
                  }
                  subCategories.splice(subCategoryIndex, 1)
                  write('subCategories', subCategories)
                  res.json(200, { success: true, message: "ok" })
            } catch (error) {
                  res.json(400, { success: false, message: error.message })
            }
      }
}

module.exports = subCategoryController