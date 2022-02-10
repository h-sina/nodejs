const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors()); // 解决跨域

app.use(express.urlencoded({ extended: false })); //表单请求

// 状态码
app.use((req, res, next) => {
    res.cc = function (err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})

// 一定要在路由之前配置解析token中间件
const expressJWT = require('express-jwt')
const config = express('./config');
app.use(
  expressJWT({ secret: "itheima No1. ^-^" }).unless({ path: [/^\/api/] })
);

// 路由
const userRouter = require("./router/user");
app.use("/api", userRouter)

const userinfoRouter = require("./router/userinfo");
app.use('/my', userinfoRouter)


// 这个得放在api的下面
// 定义错误级别的中间件
const joi = require("joi");
const { UnauthorizedError } = require("express-jwt/lib");
app.use((err, req, res, next) => {
  // 密码 账号不符合要求的错误
  if (err instanceof joi.ValidationError) return res.cc(err);
  // token不正确错误 
  if (err.name === "UnauthorizedError") return res.cc("身份认证失败");
  // 未知错误
  res.cc(err);
});

// 端口号
app.listen(3007, () => {
    console.log("api server running at http://localhost:3007");
});
