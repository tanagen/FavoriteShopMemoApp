"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPostedNewUser = exports.signUp = exports.renderSignUpPage = void 0;
const index_1 = __importDefault(require("../models/index"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const renderSignUpPage = (req, res) => {
    res.render("signUp", { userName: "", email: "", errors: {} });
};
exports.renderSignUpPage = renderSignUpPage;
const signUp = (req, res) => {
    // formでpostされたuser情報を取得
    const createdUserName = req.body.userName;
    const createdEmail = req.body.email;
    const createdPassword = bcrypt_1.default.hashSync(req.body.password, bcrypt_1.default.genSaltSync(8));
    console.log(createdEmail, createdEmail, createdPassword);
    // 取得したuser情報をusersDBに格納
    (() => __awaiter(void 0, void 0, void 0, function* () {
        // const t = await db.Users.sequelize!.transaction();
        try {
            yield index_1.default.Users.create({
                user_name: createdUserName,
                user_email: createdEmail,
                user_password: createdPassword,
            });
            // await t?.commit;
        }
        catch (error) {
            // errorの場合はemailが重複している
            console.log(error);
            // postした値を取得
            const postedUserName = req.body.userName;
            const postedEmail = req.body.email;
            // email重複エラー文
            const errors = {};
            errors["email"] = "既に登録されています";
            return res.render("signUp", {
                userName: postedUserName,
                email: postedEmail,
                errors: errors,
            });
        }
        // redirect
        res.redirect("/login");
    }))();
};
exports.signUp = signUp;
// user新規登録における入力値の空チェック
const checkPostedNewUser = (req, res, next) => {
    // postされた内容を変数に代入
    const postedUserName = req.body.userName;
    const postedEmail = req.body.email;
    const postedPassword = req.body.password;
    // error文格納用の配列
    const errors = {};
    // errorチェック
    if (postedUserName === "") {
        errors["userName"] = "入力してください";
    }
    if (postedEmail === "") {
        errors["email"] = "入力してください";
    }
    if (postedPassword === "") {
        errors["password"] = "入力してください";
    }
    if (Object.keys(errors).length > 0) {
        res.render("signUp", {
            userName: postedUserName,
            email: postedEmail,
            errors: errors,
        });
    }
    else {
        next();
    }
};
exports.checkPostedNewUser = checkPostedNewUser;
