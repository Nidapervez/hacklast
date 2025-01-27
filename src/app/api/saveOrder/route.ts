import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2023-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

export async function POST(req: Request) {
  const { name, email, address, userId, cartItems, totalAmount } = await req.json();

  try {
    const orderData = {
      _type: "order",
      name,
      email,
      address,
      userId,
      createdAt: new Date().toISOString(),
      cartItems: cartItems.map((item: any) => ({
        _type: "cartItem",
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount, // Save total amount with the order
    };

    const response = await sanityClient.create(orderData);

    return NextResponse.json({
      message: "Order placed successfully!",
      order: response,
    });
  } catch (error) {
    console.error("Error saving order to Sanity:", error);
    return NextResponse.json({ message: "Failed to place order." }, { status: 500 });
  }
}
