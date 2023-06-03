import { Router } from "express";
import adminController from "../controllers/admin_controller";
import authenController from "../controllers/authen_controller";

const router = Router();

router.post("/login", adminController.login);
router.post("/logout", authenController.logout);
router.post("/createProduct", adminController.createProduct);
router.delete("/removeProduct/:id", adminController.removeProduct);
router.put("/updateProduct/:id", adminController.updateProduct);


export default router;