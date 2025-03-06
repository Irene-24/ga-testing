"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { viewList } from "@/lib/ga-utils";
import Link from "next/link";

// Item type definition based on provided structure
interface Item {
  id: string;
  name: string;
  sellingPrice: number;
  itemClassId: string;
  itemClass: string;
  itemGroup: string;
}

// Cart item type definition
interface CartItem extends Item {
  quantity: number;
}

// Sample item data using the provided structure
const items: Item[] = [
  {
    id: "item-001",
    name: "Premium Headphones",
    sellingPrice: 149.99,
    itemClassId: "audio-001",
    itemClass: "Audio",
    itemGroup: "Electronics",
  },
  {
    id: "item-002",
    name: "Wireless Mouse",
    sellingPrice: 39.99,
    itemClassId: "comp-001",
    itemClass: "Computer Accessories",
    itemGroup: "Electronics",
  },
  {
    id: "item-003",
    name: "Leather Notebook",
    sellingPrice: 24.99,
    itemClassId: "stat-001",
    itemClass: "Stationery",
    itemGroup: "Office Supplies",
  },
  {
    id: "item-004",
    name: "Smart Watch",
    sellingPrice: 199.99,
    itemClassId: "wear-001",
    itemClass: "Wearables",
    itemGroup: "Electronics",
  },
  {
    id: "item-005",
    name: "Desk Lamp",
    sellingPrice: 59.99,
    itemClassId: "light-001",
    itemClass: "Lighting",
    itemGroup: "Home",
  },
  {
    id: "item-006",
    name: "Portable Charger",
    sellingPrice: 49.99,
    itemClassId: "power-001",
    itemClass: "Power Accessories",
    itemGroup: "Electronics",
  },
];

export default function EcommercePage() {
  // State for cart items
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Add item to cart
  const addToCart = (item: Item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        // Increase quantity if item already in cart
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // Add new item to cart
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  // Update item quantity
  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Calculate total price
  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + item.sellingPrice * item.quantity,
      0
    );
  };

  useEffect(() => {
    viewList({
      items,
      revenueCenter: "Rev center fake",
      serviceType: "delivery",
    });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Shop</h1>
        <Link
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
          href="/"
        >
          Home
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="relative">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Cart
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-md">
            <SheetHeader>
              <SheetTitle>Your Cart</SheetTitle>
            </SheetHeader>
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[50vh]">
                <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Your cart is empty</p>
              </div>
            ) : isCheckingOut ? (
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Checkout</h3>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="123 Main St" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="New York" />
                    </div>
                    <div>
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input id="zip" placeholder="10001" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="card">Card Number</Label>
                    <Input id="card" placeholder="4242 4242 4242 4242" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div>
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" />
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button
                      className="w-full"
                      onClick={(e) => {
                        e.preventDefault();
                        alert("Order placed successfully!");
                        setCart([]);
                        setIsCheckingOut(false);
                      }}
                    >
                      Place Order (${calculateTotal().toFixed(2)})
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full mt-2"
                      onClick={() => setIsCheckingOut(false)}
                    >
                      Back to Cart
                    </Button>
                  </div>
                </form>
              </div>
            ) : (
              <>
                <div className="py-4 flex-1 overflow-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex py-4">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                        <Image
                          src="/vercel.svg"
                          alt={item.name}
                          width={100}
                          height={100}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium">
                            <h3>{item.name}</h3>
                            <p className="ml-4">
                              ${(item.sellingPrice * item.quantity).toFixed(2)}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">
                            ${item.sellingPrice.toFixed(2)} each
                          </p>
                          <Badge variant="outline" className="mt-1">
                            {item.itemClass}
                          </Badge>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="flex items-center">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-full"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="mx-2">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-full"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-base font-medium">
                    <p>Subtotal</p>
                    <p>${calculateTotal().toFixed(2)}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6">
                    <Button
                      className="w-full"
                      onClick={() => setIsCheckingOut(true)}
                    >
                      Checkout
                    </Button>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-muted-foreground">
                    <p>
                      or{" "}
                      <Button
                        variant="link"
                        className="p-0"
                        onClick={() => setCart([])}
                      >
                        Clear Cart
                      </Button>
                    </p>
                  </div>
                </div>
              </>
            )}
          </SheetContent>
        </Sheet>
      </header>

      <main>
        <h2 className="text-2xl font-semibold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="aspect-square relative">
                <Image
                  src="/vercel.svg"
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <Badge>{item.itemGroup}</Badge>
                </div>
                <Badge variant="outline" className="mt-2">
                  {item.itemClass}
                </Badge>
                <p className="font-medium text-lg mt-2">
                  ${item.sellingPrice.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Item ID: {item.id}
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full" onClick={() => addToCart(item)}>
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
