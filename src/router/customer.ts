import { Router } from "express";
import customerController from "../controllers/customer_controller";
import authenController from "../controllers/authen_controller";

const router = Router();

router.post("/createaccount", customerController.createAccount);
router.post("/login", customerController.login);
router.post("/logout", authenController.logout);
router.get("/allproducts", customerController.getAllProduct);
router.get("/productdetail/:id", customerController.getOneProduct);
router.post("/addtocart", customerController.addProductToCart);
router.delete("/removefromcart/:cartId", customerController.removeProductFromCart);
router.post("/order", customerController.createOrder);
router.put("/canceloder/:orderId", customerController.cancelOrder);
router.get("/viewoder/:orderId", customerController.viewOrder);


export default router;