import { Request, Response } from "express";
import User from "../models/user";
import Role from "../models/role";
import Product from "../models/product";
import Cart from "../models/cart";
import jwt from "jsonwebtoken";
import Order from "../models/oder";
import OrderItems from "../models/oder_item";

interface OrderItem {
  product_id: string;
  quantity: number;
}

class CustomerController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body; // Lấy giá trị email và password từ phần body của yêu cầu
      const user = await User.findOne({ email: email, password: password });

      if (!user) {
        return res.status(404).json({ message: "Không tìm thấy người dùng" });
      }

      const roleUser = await Role.findById(user.role_id);// Tìm kiếm vai trò của người dùng dựa trên role_id
      if (!roleUser) {
        return res.status(404).json({ message: "Không tìm được role" });
      }

      if (roleUser.role === "customer") {
        const token = jwt.sign(
          { email, user_id: user._id, role_id: user.role_id },// Tạo JSON Web Token (JWT) bằng cách ký quyền với thông tin người dùng và một khóa bí mật

          "authen1"
        );

        user.token = token;// Gán token cho thuộc tính token của người dùng
        await user.save();// Lưu thông tin người dùng với token mới
        res.status(200).json([{ message: "Dang nhap thanh cong" }, { token: token, userId: user._id }]);
        return;
      }

      return res
        .status(403)
        .json({ message: "Không đúng vai trò là người dùng" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi nội bộ máy chủ" });
    }
  }
  // xem toan bo san pham
  async getAllProduct(req: Request, res: Response) {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: "Lỗi nội bộ máy chủ" });
    }
  }

  // xem chi tiet mot san pham
  async getOneProduct(req: Request, res: Response) {
    try {
      const idProduct = req.params.id;
      const product = await Product.findById({ _id: idProduct });
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: "Lỗi nội bộ máy chủ" });
    }
  }

  // them san pham vao gio hang
  async addProductToCart(req: Request, res: Response) {
    try {

      const idUser = req.query.idUser;
      const idProduct = req.query.idProduct;
      const productInCart = await Cart.findOne({ product_id: idProduct });

      if (productInCart) {
        let quantityCurrent = productInCart.quantity + 1;
        await Cart.findOneAndUpdate({ product_id: idProduct }, { quantity: quantityCurrent });
      }

      if (!productInCart) {
        new Cart({ product_id: idProduct, user_id: idProduct, quantity: 1 }).save();
      }

      res.status(200).json("thành công");
    } catch (error) {
      res.status(500).json({ message: "Lỗi nội bộ máy chủ" });
    };
  }

  // xoa san pham khoi gio hang
  async removeProductFromCart(req: Request, res: Response) {
    try {
      const cartId = req.params.cartId;
      await Cart.findByIdAndDelete(cartId);

      res.status(200).json("xoa thanh cong");
    } catch (error) {
      res.status(500).json({ message: "Lỗi nội bộ máy chủ" });
    }
  }

  // dat hang 
  async createOrder(req: Request, res: Response) {
    try {
      const { userId, items }: { userId: string, items: string } = req.body;

      const parsedItems = JSON.parse(items); // Chuyển đổi chuỗi JSON thành một mảng

      const createOrder = new Order({ customer_id: userId, order_status: 1 }); //[{"product_id":"6472e3effdd065cf8f63a7ac","quantity":2},{"product_id":"6472e40afdd065cf8f63a7ae","quantity":3}]
      await createOrder.save();

      let totalAmount: number = 0;
      for (const item of parsedItems) {
        const orderItem = new OrderItems({ quantity: item.quantity, product_id: item.product_id, order_id: createOrder._id });
        orderItem.save();
        console.log(item);
        const product = await Product.findById(item.product_id);
        if (product?.price) {
          let priceProduct: number | undefined = product?.price;
          totalAmount += priceProduct * item.quantity;
        }
      }
      await Order.findByIdAndUpdate({ _id: createOrder._id }, { total_amount: totalAmount })

      res.status(200).json("Order thành công")
    } catch (error) {
      res.status(500).json({ message: "Lỗi nội bộ máy chủ" });
    }
  }
  // huy don hang
  async cancelOrder(req: Request, res: Response) {
    try {
      const orderId = req.params.orderId;
      await Order.findByIdAndUpdate({ _id: orderId }, { order_status: 0 })
      res.status(200).json("Huỷ đơn hàng thành công");
    } catch (error) {
      res.status(500).json({ message: "Lỗi nội bộ máy chủ" });
    }
  }
  //xem don hang 
  async viewOrder(req: Request, res: Response) {
    try {
      const orderId = req.params.orderId;
      const orders = await OrderItems.find({ order_id: orderId });
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: "Lỗi nội bộ máy chủ" });
    }
  }

  // tao tai khoan
  async createAccount(req: Request, res: Response) {
    try {
      const { email, password } = req.body;  // Lấy giá trị email và password từ phần body của yêu cầu


      const role_id = "6472be3307c71fdec9875ac6";

      const existingUser = await User.findOne({ email: email });  // Kiểm tra xem người dùng đã tồn tại trong cơ sở dữ liệu chưa

      if (existingUser) {
        return res.status(409).json({ message: "Người dùng đã tồn tại" });  // Trả về lỗi 409 nếu người dùng đã tồn tại
      }

      const newUser = new User({ email, password, role_id });  // Tạo một đối tượng người dùng mới với role_id cụ thể

      await newUser.save();  // Lưu thông tin người dùng vào cơ sở dữ liệu

      res.status(201).json({ message: "Tài khoản khách hàng đã được tạo thành công" });  // Trả về thành công với mã trạng thái 201 và thông báo tài khoản khách hàng đã được tạo thành công
    } catch (error) {
      res.status(500).json({ message: "Lỗi nội bộ máy chủ" });  // Trả về lỗi 500 nếu xảy ra lỗi trong quá trình xử lý
    }
  }

}

export default new CustomerController();