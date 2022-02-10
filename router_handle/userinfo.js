const db = require('../db/index')

const sql = 'select id, username, email, user_pic from user where id=?'

exports.getUserInfo = (req, res) => {
    db.query(sql, req.user.id, (err, result) => {
        if (err) return res.cc(err);
        if (result.length !== 1) return res.cc('获取用户信息失败')
        res.send({
          status: 0,
          message: "获取用户信息成功",
          data: result[0],
        });
    })
}
exports.getComment = (req, res) => {
  const sql = "select * from comment";
  db.query(sql, (err, rows) => {
    if (err) return res.cc(err);
    else {
      console.log(rows);
      res.send(rows);
    }
  });
};
exports.addComment = (req, res) => {
  const comment = req.body;
  const sql = "insert into comment set ?";
  db.query(
    sql,
    { context: comment.context, createdTime: comment.createdTime },
    (err, rows) => {
      if (err) return res.cc(err);
      else {
        return res.cc("留言成功", 0);
      }
    }
  );
};