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
        res.status(200).json({ token });
        return;
      }

      return res
        .status(403)
        .json({ message: "Không đúng vai trò là người dùng" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi nội bộ máy chủ" });
    }
  }

  // Thêm sản phẩm
  async createProduct(req: Request, res: Response) {
    try {
      const { product_name, price, description, quantity, size, img1, img2 } = req.body;
      const newProduct = new Product({ product_name, price, description, quantity, size, img1, img2 });
      await newProduct.save();

      const products = await Product.find();
      res.status(200).json([{ message: "thêm sản phẩm thành công" },products]);
    } catch (error) {
      res.status(500).json({ message: "Lỗi nội bộ máy chủ" });
    }
  }

  // Xoá sản phẩm
  async removeProduct(req: Request, res: Response) {
    try {
      const idProduct = req.params.id;
      const removedProduct = await Product.findByIdAndDelete(idProduct);

      if (!removedProduct) {
        return res.status(404).json({ message: "Sản phẩm không tồn tại" });
      }

      const products = await Product.find();
      res.status(200).json([{ message: "Xoá sản phẩm thành công" },products]);
    } catch (error) {
      res.status(500).json({ message: "Lỗi nội bộ máy chủ" });
    }
  }

  // Cập nhật sản phẩm
  async updateProduct(req: Request, res: Response) {
    try {
      const idProduct = req.params.id;
      const { product_name, price, description, quantity, size, img1, img2 } = req.body;

      const updatedProduct = await Product.findByIdAndUpdate(idProduct, {
        product_name,
        price,
        description,
        quantity,
        size,
        img1,
        img2
      }, { new: true });

      if (!updatedProduct) {
        return res.status(404).json({ message: "Sản phẩm không tồn tại" });
      }

      const products = await Product.find();
      res.status(200).json([{ message: "Cập nhật sản phẩm  thành công" },products]);
    } catch (error) {
      res.status(500).json({ message: "Lỗi nội bộ máy chủ" });
    }
  }
}

export default new AdminController();