const { read, hashPassword } = require('../utils/module')

const adminControler = {
      POST: async (req, res) => {
            try {
                  const admin = read('admin') //// admin fileni oqidik
                  const { username, userId, password } = await req.body; //// kelgan ma'lumotni oqidik
                  const result = admin.find(admin =>
                        admin.userId == userId &&
                        admin.username == username &&
                        admin.password == hashPassword(password)
                  ) ////// ichkaridagi ma'lumotga tekshirdik
                  if (result) {
                        res.json(200, { message: "ok", success: true })
                  } else {
                        res.json(400, { success: false, message: "no" })
                  }
            } catch (error) {
                  console.log("xato");
            }
      }
}

module.exports = adminControler