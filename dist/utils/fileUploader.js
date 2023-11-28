"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToCloudinary = exports.uploadSingle = void 0;
const cloudinaryConfig_1 = __importDefault(require("../config/cloudinaryConfig"));
const imageUploadMiddleWare_1 = require("../middleware/imageUploadMiddleWare");
exports.uploadSingle = imageUploadMiddleWare_1.upload.single("image");
const uploadToCloudinary = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const folderPath = process.env.CLOUDINARY_FOLDER_PATH;
    const publicId = folderPath + Date.now();
    return yield cloudinaryConfig_1.default.uploader.upload(req.file.path, {
        public_id: publicId,
    });
});
exports.uploadToCloudinary = uploadToCloudinary;
