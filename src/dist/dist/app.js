"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = exports.express = void 0;
exports.express = require("express");
exports.router = exports.express.Router();
var createError = require("http-errors");
// var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const categoryRoutes = require("./routes/category");
const indexRoutes = require("./routes/index");
const usersRoutes = require("./routes/users");
const index_1 = __importDefault(require("./models/index"));
const app = (0, exports.express)();
(() => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const t = yield ((_a = index_1.default.Users.sequelize) === null || _a === void 0 ? void 0 : _a.transaction());
    try {
        // userインスタンス作成
        // Users.createメソッドは下記のbuild+saveを一度に行い、データベースにinsertまで行う
        const user = index_1.default.Users.build({
            user_name: "gen",
            user_email: "gen@mail.com",
        });
        // userのinsert
        const registeredUser = yield user.save();
        // insertされたuserに紐づくuserFavoriteShopを作成
        yield registeredUser.createUserFavoriteShop({
            shop_category: "飲食",
            shop_name: "餃子の王将",
            shop_location: "東京駅",
            shop_description: "餃子だけでなく天津飯が美味しいお店",
        });
        yield (t === null || t === void 0 ? void 0 : t.commit);
    }
    catch (error) {
        yield (t === null || t === void 0 ? void 0 : t.rollback());
    }
    yield ((_b = index_1.default.Users.sequelize) === null || _b === void 0 ? void 0 : _b.close());
}))();
// asyncは非同期処理関数を定義する演算子
// (async () => {
// Users, UsersFavoriteShopsテーブルをDrop & Create
// awaitはPromise処理の結果が返ってくるまで一時停止する演算子(await Promise処理)
// { force:true }はすでに同じ名前のテーブルが存在する場合に、既存のものを削除して新たに再作成するオプション
// await models.Users.sync({ force: true });
// await models.UserFavoriteShops.sync({ force: true });
// // userインスタンス作成
// // Users.createメソッドは下記のbuild+saveを一度に行い、データベースにinsertまで行う
// const user = models.Users.build({
//   user_name: "gen",
//   user_email: "gen@mail.com",
// });
// // userのinsert
// const registeredUser = await user.save();
// // insertされたuserに紐づくuserFavoriteShopを作成
// await registeredUser.createUserFavoriteShop({
//   shop_category: "飲食",
//   shop_name: "天下一品",
// });
//   // usersのselect
//   const users = await models.Users.findAll({
//     include: [models.UserFavoriteShops],
//   });
//   // console.log(users.map((d) => d.toJSON()));
//   console.log(JSON.stringify(users));
// })();
// // mySQLへデータを追加
// (async () => {
//   // { alter: true }は既にあるテーブルと相違がある場合に追加や削除が行われる。
//   await models.Users.sync({ force: true });
//   await models.UserFavoriteShops.sync({ force: true });
//   // userインスタンス作成
//   // Users.createメソッドは下記のbuild+saveを一度に行い、データベースにinsertまで行う
//   const newUser = models.Users.build({
//     user_name: "ai",
//     user_email: "ai@mail.com",
//   });
//   // userのinsert
//   const registeredNewUser = await newUser.save();
//   // insertされたuserに紐づくuserFavoriteShopを作成
//   await registeredNewUser.createUserFavoriteShop({
//     shop_category: "美容",
//     shop_name: "ヘッドマッサージ",
//   });
//   await registeredNewUser.createUserFavoriteShop({
//     shop_category: "飲食",
//     shop_name: "たこ焼き",
//   });
//   await models.UserFavoriteShops.bulkCreate([
//     { user_id: 1, shop_category: "娯楽", shop_name: "パチンコ" },
//   ]);
//   // usersのselect
//   const users = await models.Users.findAll({
//     include: [models.UserFavoriteShops],
//   });
//   // console.log(users.map((d) => d.toJSON()));
//   console.log(JSON.stringify(users));
// })();
app.use(logger("dev"));
app.use(exports.express.json());
app.use(exports.express.urlencoded({ extended: false }));
app.use(cookieParser());
// view engine setup
app.set("views", path.join("views"));
app.set("view engine", "ejs");
app.use(exports.express.static(path.join("public")));
// ルーティング
app.use("/category", categoryRoutes);
// app.use("/index", indexRoutes);
// app.use("/users", usersRoutes);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render("error");
});
module.exports = app;