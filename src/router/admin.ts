import { Router } from "express";
import adminController from "../controllers/admin_controller";
import authenController from "../controllers/authen_controller";
import { checkAdminMiddleware } from "../middleware/checkoutAdmin"
const router = Router();

router.post("/login", adminController.login);
router.post("/logout", authenController.logout);
router.post("/createProduct", checkAdminMiddleware, adminController.createProduct);
router.delete("/removeProduct/:id", checkAdminMiddleware, adminController.removeProduct);
router.put("/updateProduct/:id", checkAdminMiddleware, adminController.updateProduct);

export default router;