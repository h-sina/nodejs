const db = require("../db/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");
exports.login = (req, res) => {
  const userinfo = req.body
  const sqllogin = 'select * from user where username=?'
  db.query(sqllogin, userinfo.username, (err, rows) => {
    console.log(userinfo.username, userinfo.password);
    if (err) return res.cc(err)

    if (rows.length !== 1) return res.cc('登录失败')
    
    const compareResult = bcrypt.compareSync(userinfo.password, rows[0].password)
    if (!compareResult) {
      return res.cc("登录失败");
    } else {
      // 服务器端生成token 
      const user = { ...rows[0], password: "", user_pic: "" };
      const tokenStr = jwt.sign(user, config.jwtSecretKey, {
        expiresIn: config.expiresIn,
      });
      res.send({
        status: 0,
        message: "登陆成功",
        token: 'Bearer ' + tokenStr,
      });
    }
  })
};
exports.register = (req, res) => {
  const userinfo = req.body
  const sql = "select * from user where username=?";
  db.query(sql, userinfo.username, (err, rows) => {
    if (err) return res.cc(err)
    if (rows.length > 0) return res.cc("用户名被占用，请更换其他用户名！")
    
    userinfo.password = bcrypt.hashSync(userinfo.password, 10)
    const add = "insert into user set ?"
    db.query(add, { username: userinfo.username, password: userinfo.password }, (err, rows) => {
      if (err) return res.cc(err)
      if (rows.affectedRows !== 1) return res.cc("注册用户失败，请稍后再试")
      return res.cc("注册成功!", 0)
    }
    )

  })
  
}
