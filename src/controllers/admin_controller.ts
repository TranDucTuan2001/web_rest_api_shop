import { Request, Response } from "express";
import User from "../models/user";
import Role from "../models/role";
import Product from "../models/product";
import jwt from "jsonwebtoken"


class AdminController {
  async login(req: Request, res: Response) {
    try {

      const { email, password } = req.body;//lay email pass trong body
      const user = await User.findOne({ email: email, password: password });

      if (!user) {
        return res.status(404).json({ message: "Không tìm thấy người dùng" });
      }

      const roleUser = await Role.findById(user.role_id);
      if (!roleUser) {
        return res.status(404).json({ message: "Không tìm được role" });
      }

      if (roleUser.role === "admin") {
        const token = jwt.sign(
          { email, user_id: user._id, role_id: user.role_id },
          "authen1"
        );

        user.token = token;
        await user.save();
        res.status(200).json({ message: "Đăng nhập thành công" });
        return;
      }

      return res
        .status(403)
        .json({ message: "Không đúng vai trò là người dùng" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi nội bộ máy chủ" });
    }
  }

  // them san pham
  async createProduct(req: Request, res: Response) {
    try {
      const { product_name, price, description, quantity, size, img1, img2 } = req.body;
      const newProduct = new Product({ product_name: product_name, price: price, description: description, quantity: quantity, size: size, img1: img1, img2: img2 });
      newProduct.save();
      res.status(200).json({ newProduct });
    } catch (error) {
      res.status(500).json({ message: "Err" });
    }
  }

  // xoa san pham
  async removeProduct(req: Request, res: Response) {
    try {
      const idProduct = req.params.id;
      console.log("d", idProduct);
      const newProduct = await Product.findByIdAndDelete({ _id: idProduct });

      res.status(200).json(newProduct);
    } catch (error) {
      res.status(500).json({ message: "Err" });
    }
  }

// cap nhat san pham
  async updateProduct(req: Request, res: Response) {
    try {
      let idProduct = req.params.id;
      let product_name = req.body.product_name;
      let price = req.body.price;
      let description = req.body.description;
      let quantity = req.body.quantity;
      let size = req.body.size;
      let img1 = req.body.img1;
      let img2 = req.body.img2;

      const newProduct = await Product.findByIdAndUpdate(idProduct, { product_name: product_name, price: price, description: description, quantity: quantity, size: size, img1: img1, img2: img2 });
      res.status(200).json(newProduct);
    } catch (error) {
      res.status(500).json({ message: "Err" });
    }
  }
}

export default new AdminController();