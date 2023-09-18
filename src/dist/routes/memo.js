"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const checkAuthenticated_1 = require("../handlers/checkAuthenticated");
const memo_1 = require("../handlers/memo");
const category_1 = require("../handlers/category");
const map_1 = require("../handlers/map");
const router = express_1.default.Router();
router.get("/:index", checkAuthenticated_1.checkAuthenticated, memo_1.getSelectedCategory, memo_1.renderMemoPage);
// router.post("/saveCoordinate", saveCoordinate);
router.get("/:index/create", checkAuthenticated_1.checkAuthenticated, map_1.getAPIKey, memo_1.getSelectedCategory, memo_1.renderCreateMemoPage);
router.post("/:index/create", memo_1.getSelectedCategory, map_1.getAPIKey, memo_1.checkCreatingMemo, memo_1.createMemo);
router.get("/:index/edit", memo_1.getSelectedCategory, category_1.renderEditCategoryPage);
router.post("/:index/edit", category_1.getInfoOfCategories, memo_1.getSelectedCategory, category_1.getDBIdOfUpdateCategory, category_1.checkUpdatingCategory, category_1.updateCategory);
router.post("/:index/:id", memo_1.deleteMemo);
router.get("/:index/edit/:id", checkAuthenticated_1.checkAuthenticated, map_1.getAPIKey, memo_1.getSelectedCategory, memo_1.renderEditMemoPage);
router.post("/:index/update/:id", memo_1.getSelectedCategory, map_1.getAPIKey, memo_1.checkUpdatingMemo, memo_1.updateMemo);
router.get("/:index/map/:id", checkAuthenticated_1.checkAuthenticated, memo_1.getSelectedCategory, map_1.getAPIKey, memo_1.getInfoOfSelectedMemo, map_1.showMap);
exports.default = router;