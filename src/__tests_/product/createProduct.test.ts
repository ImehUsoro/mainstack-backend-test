import { Request, Response } from "express";
import Product from "../../models/Product";
import {
  createProductService,
  findProductByNameService,
} from "../../services/productService";
import { uploadToCloudinary } from "../../utils/fileUploader";

jest.mock("../../utils/fileUploader");
jest.mock("../../services/categoryService");

describe("Product Service Tests", () => {
  const mockRequest = {} as Request;
  const mockResponse = {
    status: jest.fn(() => mockResponse),
    json: jest.fn(),
  } as unknown as Response;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new product", async () => {
    const createProductDto = {
      name: "New Product",
      category: "New Category",
      visibility: true,
      quantityInStock: 10,
      description: "New Description",
      specifications: '[{ "name": "spec1", "value": "value1" }]',
    };

    // Correct way to mock the function
    (
      findProductByNameService as jest.MockedFunction<
        typeof findProductByNameService
      >
    ).mockResolvedValueOnce(null);

    // Mocking other functions as before
    (uploadToCloudinary as jest.Mock).mockResolvedValueOnce({
      secure_url: "mocked_secure_url",
    });
    (Product.create as jest.Mock).mockResolvedValueOnce({
      _id: "mockedProductId",
      ...createProductDto,
    });

    await createProductService(mockRequest, mockResponse, createProductDto);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "success",
      message: "Successfully created a new Product",
      product: {
        _id: "mockedProductId",
        ...createProductDto,
        image_url: "mocked_secure_url",
      },
    });
  });

  // Add more tests for other service functions following a similar pattern
});
