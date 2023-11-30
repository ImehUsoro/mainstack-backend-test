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
const Product_1 = __importDefault(require("../../models/Product"));
const productService_1 = require("../../services/productService");
const fileUploader_1 = require("../../utils/fileUploader");
jest.mock("../../utils/fileUploader");
jest.mock("../../services/categoryService");
describe("Product Service Tests", () => {
    const mockRequest = {};
    const mockResponse = {
        status: jest.fn(() => mockResponse),
        json: jest.fn(),
    };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("should create a new product", () => __awaiter(void 0, void 0, void 0, function* () {
        const createProductDto = {
            name: "New Product",
            category: "New Category",
            visibility: true,
            quantityInStock: 10,
            description: "New Description",
            specifications: '[{ "name": "spec1", "value": "value1" }]',
        };
        // Correct way to mock the function
        productService_1.findProductByNameService.mockResolvedValueOnce(null);
        // Mocking other functions as before
        fileUploader_1.uploadToCloudinary.mockResolvedValueOnce({
            secure_url: "mocked_secure_url",
        });
        Product_1.default.create.mockResolvedValueOnce(Object.assign({ _id: "mockedProductId" }, createProductDto));
        yield (0, productService_1.createProductService)(mockRequest, mockResponse, createProductDto);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: "success",
            message: "Successfully created a new Product",
            product: Object.assign(Object.assign({ _id: "mockedProductId" }, createProductDto), { image_url: "mocked_secure_url" }),
        });
    }));
});
