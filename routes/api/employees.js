const express = require("express");
const router = express.Router();
const path = require("path");
const employeeController = require("../../controller/employeesController");

router
  .route("/")
  .get(employeeController.getAllEmployee)
  .post(employeeController.createNewEmployee)
  .put(employeeController.updateEmployee)
  .delete(employeeController.deleteEmployee);

router.route("/:id").get(employeeController.getEmployee);

module.exports = router;
