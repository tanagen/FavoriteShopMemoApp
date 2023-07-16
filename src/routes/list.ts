import { express, router } from "../app";
import {
  getSelectedCategory,
  renderListPage,
  renderCreateListPage,
  checkPostedNewList,
  createList,
  deleteList,
  renderEditListPage,
  updateList,
  checkPostedUpdateList,
} from "../handlers/list";

router.get("/:index", getSelectedCategory, renderListPage);
router.post("/:index", getSelectedCategory, checkPostedNewList, createList);
router.get("/:index/create", getSelectedCategory, renderCreateListPage);
router.post("/:index/:id", deleteList);
router.get("/:index/edit/:id", getSelectedCategory, renderEditListPage);
router.post(
  "/:index/update/:id",
  getSelectedCategory,
  checkPostedUpdateList,
  updateList
);

module.exports = router;
