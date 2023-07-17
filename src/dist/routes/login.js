"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const login_1 = require("../handlers/login");
router.get("/", login_1.renderLoginPage);
router.post("/", login_1.login);
exports.default = router;
