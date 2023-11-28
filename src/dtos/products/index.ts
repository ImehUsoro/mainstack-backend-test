export interface SpecificationDto {
  price: number;
  name: string;
}

export interface CreateProductDto {
  name: string;
  description: string;
  category: string;
  quantityInStock: number;
  visibility: boolean;
  specifications: string;
}
