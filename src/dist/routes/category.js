"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const checkAuthenticated_1 = require("../handlers/checkAuthenticated");
const category_1 = require("../handlers/category");
const router = express_1.default.Router();
router.get("/", checkAuthenticated_1.checkAuthenticated, category_1.renderShopCategoryPage);
router.post("/", category_1.checkPostedNewCategory, category_1.createShopCategory);
router.get("/create", category_1.renderCreateCategoryPage);
router.get("/delete", category_1.renderDeleteCategoryPage);
router.post("/delete", category_1.deleteCategory);
exports.default = router;
