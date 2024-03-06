export type Item = {
	id: string;
	name: string;
	image: string;
	description: string;
	brand: string;
	category: string;
	price: number;
	stock: number;
	rating: number;
	reviews: string[];
	createdAt: Date;
	updatedAt: Date;
	seller: string;
};
