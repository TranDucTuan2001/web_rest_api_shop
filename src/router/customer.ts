import { Router } from "express";
import customerController from "../controllers/customer_controller";
import authenController from "../controllers/authen_controller";
import { checkCustomerMiddleware } from "../middleware/checkoutCustomer"

const router = Router();

router.post("/createaccount", customerController.createAccount);
router.post("/login", customerController.login);
router.post("/logout", authenController.logout);
router.get("/allproducts", customerController.getAllProduct);
router.get("/productdetail/:id", customerController.getOneProduct);
router.post("/addtocart",checkCustomerMiddleware, customerController.addProductToCart);
router.delete("/removefromcart/:cartId",checkCustomerMiddleware, customerController.removeProductFromCart);
router.post("/order",checkCustomerMiddleware, customerController.createOrder);
router.put("/canceloder/:orderId",checkCustomerMiddleware, customerController.cancelOrder);
router.get("/viewoder/:orderId",checkCustomerMiddleware, customerController.viewOrder);


export default router;