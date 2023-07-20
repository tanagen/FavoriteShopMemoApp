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
exports.updateList = exports.renderEditListPage = exports.deleteList = exports.createList = exports.checkPostedUpdateList = exports.checkPostedNewList = exports.renderCreateListPage = exports.renderListPage = exports.getSelectedCategory = void 0;
const index_1 = __importDefault(require("../models/index"));
// sessionに格納したloginedUser情報を変数に格納
const loginedUserId = 1;
const loginedUserName = "gen";
// 操作中のカテゴリー名を取得
const getSelectedCategory = (req, res, next) => {
    // ルートパラメータからカテゴリーのインデックス番号を取得
    const categoryIndex = Number(req.params.index);
    res.locals.index = categoryIndex;
    (() => __awaiter(void 0, void 0, void 0, function* () {
        // shop_categoriesDBからデータ取得
        yield index_1.default.ShopCategories.findAll({
            where: { user_id: loginedUserId },
        }).then((allData) => {
            // shop_categoryを配列に格納
            const shopCategories = [];
            allData.forEach((data) => {
                shopCategories.push(data.dataValues.shop_category);
            });
            // 重複排除
            const setedShopCategories = Array.from(new Set(shopCategories));
            // ルートパラメータで渡されたcategoryIndexのカテゴリー名をres.localsに格納
            res.locals.selectedCategory = setedShopCategories[categoryIndex];
            next();
        });
    }))();
};
exports.getSelectedCategory = getSelectedCategory;
// リスト一覧の表示
const renderListPage = (req, res) => {
    (() => __awaiter(void 0, void 0, void 0, function* () {
        // user_favorite_shopsDBからデータ取得
        yield index_1.default.UserFavoriteShops.findAll({
            where: {
                user_id: loginedUserId,
                shop_category: res.locals.selectedCategory,
            },
        }).then((data) => {
            // データが存在する場合
            if (data.length !== 0) {
                const errorMessage = "";
                const allShopInfo = data;
                // レンダリング
                res.render("list", {
                    errorMessage: errorMessage,
                    allShopInfo: allShopInfo,
                    categoryIndex: res.locals.index,
                });
                // データが存在しない場合
            }
            else {
                const errorMessage = "メモが登録されていません";
                const allShopInfo = [];
                // レンダリング
                res.render("list", {
                    errorMessage: errorMessage,
                    allShopInfo: allShopInfo,
                    categoryIndex: res.locals.index,
                });
            }
        });
    }))();
};
exports.renderListPage = renderListPage;
// リスト新規登録画面の表示
const renderCreateListPage = (req, res) => {
    // getSelectedCategoryメソッドで取得したres.localsの内容を変数に代入
    const categoryIndex = res.locals.index;
    const selectedCategory = res.locals.selectedCategory;
    res.render("createList", {
        categoryIndex: categoryIndex,
        selectedCategory: selectedCategory,
        shopName: "",
        shopLocation: "",
        shopDescription: "",
        errors: {},
    });
};
exports.renderCreateListPage = renderCreateListPage;
// リスト新規登録における入力値の空チェックミドルウェア
const checkPostedNewList = (req, res, next) => {
    // getSelectedCategoryメソッドで取得したres.localsの内容を変数に代入
    const categoryIndex = res.locals.index;
    const selectedCategory = res.locals.selectedCategory;
    // postされた内容を変数に代入
    const postedShopName = req.body.name;
    const postedShopLocation = req.body.location;
    const postedShopDescription = req.body.description;
    // error文格納用の配列
    const errors = {};
    // errorチェック
    if (postedShopName === "") {
        errors["shopName"] = "入力してください";
    }
    if (postedShopLocation === "") {
        errors["shopLocation"] = "入力してください";
    }
    if (postedShopDescription === "") {
        errors["shopDescription"] = "入力してください";
    }
    if (Object.keys(errors).length > 0) {
        res.render("createList", {
            categoryIndex: categoryIndex,
            selectedCategory: selectedCategory,
            shopName: postedShopName,
            shopLocation: postedShopLocation,
            shopDescription: postedShopDescription,
            errors: errors,
        });
    }
    else {
        next();
    }
};
exports.checkPostedNewList = checkPostedNewList;
// リスト更新における入力値の空チェックミドルウェア
const checkPostedUpdateList = (req, res, next) => {
    // getSelectedCategoryメソッドで取得したres.localsの内容を変数に代入
    const categoryIndex = res.locals.index;
    const selectedCategory = res.locals.selectedCategory;
    // ルートパラメータから選択したlistIDを取得
    const selectedShopId = req.params.id;
    // postされた内容を変数に代入
    const postedShopName = req.body.name;
    const postedShopLocation = req.body.location;
    const postedShopDescription = req.body.description;
    // error文格納用の配列
    const errors = {};
    // errorチェック
    if (postedShopName === "") {
        errors["shopName"] = "入力してください";
    }
    if (postedShopLocation === "") {
        errors["shopLocation"] = "入力してください";
    }
    if (postedShopDescription === "") {
        errors["shopDescription"] = "入力してください";
    }
    if (Object.keys(errors).length > 0) {
        res.render("editList", {
            selectedCategory: selectedCategory,
            errorMessage: "",
            shopId: selectedShopId,
            shopName: postedShopName,
            shopLocation: postedShopLocation,
            shopDescription: postedShopDescription,
            categoryIndex: categoryIndex,
            errors: errors,
        });
    }
    else {
        next();
    }
};
exports.checkPostedUpdateList = checkPostedUpdateList;
// リストの新規登録
const createList = (req, res) => {
    // ルートパラメータからcategoryIndexを取得して変数に代入
    const selectedCategoryIndex = req.params.index;
    // getSelectedCategoryメソッドで取得したres.localsの内容を変数に代入
    const selectedCategory = res.locals.selectedCategory;
    // formでpostされた内容を取得
    const createdShopName = req.body.name;
    const createdLocation = req.body.location;
    const createdDescription = req.body.description;
    // postされた内容をuser_favorite_shopsDBに格納
    (() => __awaiter(void 0, void 0, void 0, function* () {
        const t = yield index_1.default.UserFavoriteShops.sequelize.transaction();
        try {
            // createメソッドはbuild+saveを一度に行い、データベースにinsertまで行う
            yield index_1.default.UserFavoriteShops.create({
                user_id: loginedUserId,
                shop_category: selectedCategory,
                shop_name: createdShopName,
                shop_location: createdLocation,
                shop_description: createdDescription,
            });
            yield (t === null || t === void 0 ? void 0 : t.commit);
        }
        catch (error) {
            console.log(error);
            yield (t === null || t === void 0 ? void 0 : t.rollback());
        }
        // redirect
        const redirectURL = "/list/" + selectedCategoryIndex;
        res.redirect(redirectURL);
    }))();
};
exports.createList = createList;
// リストの削除
const deleteList = (req, res) => {
    const selectedCategoryIndex = req.params.index;
    (() => __awaiter(void 0, void 0, void 0, function* () {
        const t = yield index_1.default.UserFavoriteShops.sequelize.transaction();
        try {
            // Users.createメソッドは下記のbuild+saveを一度に行い、データベースにinsertまで行う
            yield index_1.default.UserFavoriteShops.destroy({
                where: {
                    id: req.params.id,
                },
            });
            yield (t === null || t === void 0 ? void 0 : t.commit);
        }
        catch (error) {
            console.log(error);
            yield (t === null || t === void 0 ? void 0 : t.rollback());
        }
        // redirect
        const redirectURL = "/list/" + selectedCategoryIndex;
        res.redirect(redirectURL);
    }))();
};
exports.deleteList = deleteList;
// リスト編集画面の表示
const renderEditListPage = (req, res) => {
    // getSelectedCategoryメソッドで取得したres.localsの内容を変数に代入
    const categoryIndex = res.locals.index;
    const selectedCategory = res.locals.selectedCategory;
    // 選択したリストIdの情報をuser_favorite_shopsDBから取得
    (() => __awaiter(void 0, void 0, void 0, function* () {
        // user_favorite_shopsDBからデータ取得
        yield index_1.default.UserFavoriteShops.findAll({
            where: {
                id: req.params.id,
            },
        }).then((data) => {
            // データが存在する場合
            if (data.length !== 0) {
                const errorMessage = "";
                const shopInfo = data[0];
                const shopId = shopInfo.id;
                const shopName = shopInfo.shop_name;
                const shopLocation = shopInfo.shop_location;
                const shopDescription = shopInfo.shop_description;
                // レンダリング
                res.render("editList", {
                    selectedCategory: selectedCategory,
                    errorMessage: errorMessage,
                    shopId: shopId,
                    shopName: shopName,
                    shopLocation: shopLocation,
                    shopDescription: shopDescription,
                    categoryIndex: categoryIndex,
                    errors: "",
                });
                // データが存在しない場合
            }
            else {
                const errorMessage = "情報取得エラー";
                const shopId = "";
                const shopName = "";
                const shopLocation = "";
                const shopDescription = "";
                // レンダリング
                res.render("editList", {
                    selectedCategory: selectedCategory,
                    errorMessage: errorMessage,
                    shopId: shopId,
                    shopName: shopName,
                    shopLocation: shopLocation,
                    shopDescription: shopDescription,
                    categoryIndex: categoryIndex,
                    errors: "",
                });
            }
        });
    }))();
};
exports.renderEditListPage = renderEditListPage;
const updateList = (req, res) => {
    // post先URLのルートパラメータを変数に代入
    const selectedCategoryIndex = req.params.index;
    const selectedShopId = req.params.id;
    // user_favorite_shopsDBの選択したリストIdの情報を更新
    (() => __awaiter(void 0, void 0, void 0, function* () {
        const t = yield index_1.default.UserFavoriteShops.sequelize.transaction();
        try {
            yield index_1.default.UserFavoriteShops.update({
                shop_name: req.body.name,
                shop_location: req.body.location,
                shop_description: req.body.description,
            }, { where: { id: selectedShopId } });
            yield (t === null || t === void 0 ? void 0 : t.commit);
        }
        catch (error) {
            console.log(error);
            yield (t === null || t === void 0 ? void 0 : t.rollback());
        }
        // redirect
        const redirectURL = "/list/" + selectedCategoryIndex;
        res.redirect(redirectURL);
    }))();
};
exports.updateList = updateList;