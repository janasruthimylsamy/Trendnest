
import React, { useEffect, useMemo, useRef, useState } from "react";

const PRODUCTS = [
  { id: 1, name: "Everyday Cotton Shirt", category: "Clothing", price: 899, oldPrice: 1299, rating: 4.8, tag: "BESTSELLER", color: "Sand", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=700&q=85" },
  { id: 2, name: "Classic White Sneakers", category: "Shoes", price: 1499, oldPrice: 1999, rating: 4.7, tag: "POPULAR", color: "White", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85" },
  { id: 3, name: "Minimal Everyday Tote", category: "Accessories", price: 699, oldPrice: 999, rating: 4.6, tag: "NEW", color: "Cream", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=700&q=85" },
  { id: 4, name: "Relaxed Fit T-Shirt", category: "Clothing", price: 499, oldPrice: 799, rating: 4.5, tag: "TRENDING", color: "White", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=85" },
  { id: 5, name: "Urban Crossbody Bag", category: "Accessories", price: 1199, oldPrice: 1599, rating: 4.8, tag: "BESTSELLER", color: "Black", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=700&q=85" },
  { id: 6, name: "Everyday Running Shoes", category: "Shoes", price: 1899, oldPrice: 2499, rating: 4.7, tag: "POPULAR", color: "Black", image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=700&q=85" },
  { id: 7, name: "Soft Knit Sweater", category: "Clothing", price: 1299, oldPrice: 1799, rating: 4.6, tag: "NEW", color: "Beige", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=700&q=85" },
  { id: 8, name: "Modern Wrist Watch", category: "Accessories", price: 1599, oldPrice: 2199, rating: 4.8, tag: "TRENDING", color: "Silver", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=85" },
  { id: 9, name: "Daily Denim Jeans", category: "Clothing", price: 1199, oldPrice: 1699, rating: 4.5, tag: "POPULAR", color: "Blue", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=700&q=85" },
  { id: 10, name: "Retro Street Sneakers", category: "Shoes", price: 1699, oldPrice: 2299, rating: 4.7, tag: "BESTSELLER", color: "White", image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=700&q=85" },
  { id: 11, name: "Everyday Sunglasses", category: "Accessories", price: 599, oldPrice: 899, rating: 4.4, tag: "NEW", color: "Black", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=85" },
  { id: 12, name: "Relaxed Linen Shirt", category: "Clothing", price: 999, oldPrice: 1399, rating: 4.6, tag: "TRENDING", color: "Cream", image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=700&q=85" },
  { id: 13, name: "Compact Daily Backpack", category: "Accessories", price: 1399, oldPrice: 1899, rating: 4.7, tag: "POPULAR", color: "Olive", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=85" },
  { id: 14, name: "Classic Casual Loafers", category: "Shoes", price: 1799, oldPrice: 2399, rating: 4.5, tag: "NEW", color: "Brown", image: "https://images.unsplash.com/photo-1531310197839-ccf54634509e?auto=format&fit=crop&w=700&q=85" },
  { id: 15, name: "Premium Everyday Hoodie", category: "Clothing", price: 1399, oldPrice: 1899, rating: 4.8, tag: "BESTSELLER", color: "Grey", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=85" },
  { id: 16, name: "Minimal Card Holder", category: "Accessories", price: 399, oldPrice: 599, rating: 4.4, tag: "VALUE PICK", color: "Brown", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=700&q=85" },
  { id: 17, name: "Everyday Cotton Socks", category: "Clothing", price: 99, oldPrice: 149, rating: 4.3, tag: "UNDER ₹100", color: "White", image: "https://images.unsplash.com/photo-1586350977771-b3b0abaabf7b?auto=format&fit=crop&w=700&q=85" },
  { id: 18, name: "Canvas Key Pouch", category: "Accessories", price: 149, oldPrice: 249, rating: 4.2, tag: "VALUE PICK", color: "Cream", image: "https://images.unsplash.com/photo-1622560480654-d96214fdc887?auto=format&fit=crop&w=700&q=85" },
  { id: 19, name: "Everyday Hair Claw Set", category: "Accessories", price: 199, oldPrice: 299, rating: 4.4, tag: "BUDGET FIND", color: "Neutral", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=700&q=85" },
  { id: 20, name: "Classic Crew T-Shirt", category: "Clothing", price: 299, oldPrice: 499, rating: 4.5, tag: "UNDER ₹300", color: "Black", image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=700&q=85" },
  { id: 21, name: "Slim Everyday Wallet", category: "Accessories", price: 349, oldPrice: 499, rating: 4.4, tag: "VALUE PICK", color: "Black", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=700&q=85" },
  { id: 22, name: "Minimal Stud Earrings", category: "Accessories", price: 449, oldPrice: 699, rating: 4.6, tag: "NEW", color: "Gold", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=700&q=85" },
  { id: 23, name: "Lightweight Daily Cap", category: "Accessories", price: 499, oldPrice: 799, rating: 4.5, tag: "TRENDING", color: "Beige", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=700&q=85" },
  { id: 24, name: "Soft Lounge Shorts", category: "Clothing", price: 549, oldPrice: 799, rating: 4.5, tag: "COMFORT PICK", color: "Grey", image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=700&q=85" },
  { id: 25, name: "Everyday Water Bottle", category: "Accessories", price: 649, oldPrice: 899, rating: 4.6, tag: "BESTSELLER", color: "Lilac", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=700&q=85" },
  { id: 26, name: "Structured Mini Tote", category: "Accessories", price: 899, oldPrice: 1299, rating: 4.7, tag: "NEW", color: "Tan", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=85" },
  { id: 27, name: "Everyday Chinos", category: "Clothing", price: 1099, oldPrice: 1599, rating: 4.5, tag: "POPULAR", color: "Khaki", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=700&q=85" },
  { id: 28, name: "Lightweight Zip Jacket", category: "Clothing", price: 1799, oldPrice: 2499, rating: 4.7, tag: "SEASON PICK", color: "Olive", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=700&q=85" },
  { id: 29, name: "Classic Leather Belt", category: "Accessories", price: 799, oldPrice: 1199, rating: 4.5, tag: "ESSENTIAL", color: "Brown", image: "https://images.unsplash.com/photo-1624222247344-550fb8c7b9f7?auto=format&fit=crop&w=700&q=85" },
  { id: 30, name: "Comfort Slip-On Shoes", category: "Shoes", price: 1299, oldPrice: 1799, rating: 4.6, tag: "COMFORT PICK", color: "Cream", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=700&q=85" },
  { id: 31, name: "Premium Knit Polo", category: "Clothing", price: 1899, oldPrice: 2599, rating: 4.8, tag: "PREMIUM", color: "Navy", image: "https://images.unsplash.com/photo-1625910513413-5fc45e9d3f36?auto=format&fit=crop&w=700&q=85" },
  { id: 32, name: "Everyday Analog Watch", category: "Accessories", price: 2499, oldPrice: 3299, rating: 4.7, tag: "GIFT PICK", color: "Black", image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=700&q=85" },
  { id: 33, name: "Premium Leather Sneakers", category: "Shoes", price: 3299, oldPrice: 4499, rating: 4.8, tag: "PREMIUM", color: "White", image: "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=700&q=85" },
  { id: 34, name: "Weekend Travel Backpack", category: "Accessories", price: 3999, oldPrice: 5299, rating: 4.7, tag: "TRAVEL READY", color: "Black", image: "https://images.unsplash.com/photo-1622560480654-d96214fdc887?auto=format&fit=crop&w=700&q=85" },
  { id: 35, name: "Premium Wool Blend Coat", category: "Clothing", price: 7999, oldPrice: 9999, rating: 4.8, tag: "SIGNATURE", color: "Camel", image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=700&q=85" },
  { id: 36, name: "Designer Statement Bag", category: "Accessories", price: 14999, oldPrice: 18999, rating: 4.9, tag: "LUXE EDIT", color: "Burgundy", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=85" },
];


const EXTRA_CATALOGUE = [
  { category: "Clothing", names: ["Everyday Ribbed Tank", "Soft Cotton Kurta", "Relaxed Linen Trousers", "Classic Denim Jacket", "Printed Summer Dress", "Cozy Cardigan", "Everyday Polo Tee", "Pleated Midi Skirt", "Oversized Graphic Tee", "Lightweight Rain Jacket", "Formal Office Shirt", "Comfy Jogger Pants", "Cotton Night Suit", "Festive Kurta Set", "Warm Fleece Sweatshirt", "Kids Everyday Tee", "Classic Tailored Blazer"], colors: ["Ivory", "Lilac", "Sage", "Black", "Rose", "Navy"], images: ["photo-1529139574466-a303027c1d8b", "photo-1483985988355-763728e1935b", "photo-1551488831-00ddcb6c6bd3", "photo-1434389677669-e08b4cac3105", "photo-1490481651871-ab68de25d43d", "photo-1503341504253-dff4815485f1"] },
  { category: "Shoes", names: ["Canvas Everyday Trainers", "Soft House Slippers", "Kids Colour Pop Sneakers", "Classic Ballet Flats", "Trail Walking Shoes", "Lightweight Sport Runners", "Everyday Sandals", "Comfort Office Loafers", "High Top Street Shoes", "Minimal White Trainers", "Weekend Hiking Boots", "Strap Comfort Sandals", "Smart Occasion Heels", "Easy Slip-On Sneakers", "Cushioned Walking Shoes", "Classic Chelsea Boots", "Active Court Shoes"], colors: ["White", "Black", "Taupe", "Pink", "Olive", "Cream"], images: ["photo-1542291026-7eec264c27ff", "photo-1543163521-1bf539c55dd2", "photo-1552346154-21d32810aba3", "photo-1525966222134-fcfa99b8ae77", "photo-1549298916-b41d501d3772", "photo-1495555961986-6d4c1ecb7be3"] },
  { category: "Accessories", names: ["Everyday Travel Pouch", "Soft Knit Beanie", "Minimal Card Case", "Foldable Shopping Tote", "Compact Umbrella", "Everyday Hair Band Set", "Classic Baseball Cap", "Travel Organiser Kit", "Reusable Lunch Bag", "Minimal Phone Sling", "Soft Winter Scarf", "Everyday Key Ring", "Compact Makeup Pouch", "Waterproof Crossbody", "Classic Leather Wallet", "Weekend Duffel Bag", "Lightweight Reading Glasses"], colors: ["Black", "Tan", "Cream", "Berry", "Lilac", "Olive"], images: ["photo-1548036328-c9fa89d128fa", "photo-1553062407-98eeb64c6a62", "photo-1584917865442-de89df76afd3", "photo-1622560480654-d96214fdc887", "photo-1511499767150-a48a237f0083", "photo-1522335789203-aabd1fc54bc9"] },
  { category: "Home & Living", names: ["Ceramic Coffee Mug", "Soft Cotton Cushion Cover", "Minimal Table Lamp", "Scented Candle Jar", "Woven Storage Basket", "Cozy Throw Blanket", "Glass Water Carafe", "Desk Organiser Tray", "Printed Bedsheet Set", "Plant Pot Duo", "Insulated Lunch Box", "Kitchen Towel Set", "Decorative Wall Print", "Soft Bath Towel", "Minimal Photo Frame", "Reusable Food Containers", "Bedside Reading Light"], colors: ["Cream", "Sage", "Terracotta", "Lilac", "White", "Sand"], images: ["photo-1513519245088-0e12902e5a38", "photo-1494438639946-1ebd1d20bf85", "photo-1507473885765-e6ed057f782c", "photo-1603006905003-be475563bc59", "photo-1618221195710-dd6b41faaea6", "photo-1616486338812-3dadae4b4ace"] },
  { category: "Beauty", names: ["Hydrating Face Cleanser", "Daily Moisture Cream", "Gentle Lip Balm Duo", "Soft Makeup Brush Set", "Everyday Nail Polish", "Rose Glow Face Mist", "Hair Care Travel Kit", "SPF Daily Sunscreen", "Shea Hand Cream", "Tinted Lip Colour", "Gentle Body Wash", "Silky Hair Serum", "Bath & Body Gift Set", "Reusable Face Pads", "Compact Beauty Mirror", "Aloe Cooling Gel", "Everyday Fragrance Mist"], colors: ["Rose", "Clear", "Peach", "Berry", "Ivory", "Lavender"], images: ["photo-1608248543803-ba4f8c70ae0b", "photo-1596462502278-27bfdc403348", "photo-1601049541289-9b1b7bbbfe19", "photo-1611930022073-b7a4ba5fcccd", "photo-1598440947619-2c35fc9aa908", "photo-1570172619644-dfd03ed5d881"] },
  { category: "Tech & Gadgets", names: ["Braided Charging Cable", "Wireless Earbud Case", "Compact Bluetooth Speaker", "USB-C Wall Charger", "Laptop Sleeve", "Foldable Phone Stand", "Wireless Mouse", "Everyday Power Bank", "Desk Cable Organiser", "LED Reading Lamp", "Portable Mini Fan", "Over-Ear Headphones", "Smartwatch Strap", "Webcam Privacy Cover", "Travel Adapter Plug", "Tablet Stand", "Compact Keyboard"], colors: ["Black", "White", "Silver", "Lilac", "Mint", "Graphite"], images: ["photo-1505740420928-5e560c06d30e", "photo-1546868871-7041f2a55e12", "photo-1608043152269-423dbba4e7e1", "photo-1583394838336-acd977736f90", "photo-1523206489230-c012c64b2b48", "photo-1519389950473-47ba0277781c"] },
  { category: "Kids & Baby", names: ["Soft Baby Cotton Onesie", "Colourful Building Blocks", "Kids Animal Backpack", "Plush Cuddle Toy", "Toddler Water Bottle", "Kids Art Set", "Baby Muslin Cloths", "Storytime Picture Book", "Kids Raincoat", "Soft Play Mat", "Baby Feeding Bib Set", "Kids Colourful Socks", "Mini Lunch Bag", "Wooden Shape Puzzle", "Kids Sun Hat", "Cozy Baby Blanket", "Kids Drawing Notebook"], colors: ["Yellow", "Sky", "Mint", "Pink", "Lilac", "Multi"], images: ["photo-1519238263530-99bdd11df2ea", "photo-1503919005314-30d93d07d823", "photo-1516627145497-ae6968895b74", "photo-1519689680058-324335c77eba", "photo-1596461404969-9ae70f2830c1", "photo-1515488042361-ee00e0ddd4e4"] },
  { category: "Sports & Outdoors", names: ["Stretch Yoga Mat", "Everyday Gym Bottle", "Lightweight Skipping Rope", "Training Resistance Bands", "Quick Dry Sports Tee", "Outdoor Picnic Mat", "Cushioned Training Socks", "Compact Gym Duffel", "Trail Running Cap", "Cycling Water Bottle", "Adjustable Yoga Strap", "Fitness Hand Grips", "Outdoor Travel Mug", "Breathable Sports Shorts", "Reflective Running Belt", "Foldable Daypack", "Beginner Badminton Set"], colors: ["Black", "Coral", "Sage", "Blue", "Lilac", "Charcoal"], images: ["photo-1517836357463-d25dfeac3438", "photo-1544367567-0f2fcb009e0b", "photo-1534438327276-14e5300c3a48", "photo-1518611012118-696072aa579a", "photo-1571019613454-1cb2f99b2d8b", "photo-1461896836934-ffe607ba8211"] },
  { category: "Jewellery", names: ["Minimal Hoop Earrings", "Layered Everyday Necklace", "Pearl Stud Set", "Adjustable Charm Bracelet", "Classic Pendant Chain", "Colour Pop Ring Set", "Elegant Drop Earrings", "Minimal Gold Cuff", "Heart Charm Anklet", "Everyday Silver Hoops", "Gemstone Pendant", "Stackable Ring Trio", "Statement Party Earrings", "Dainty Chain Bracelet", "Classic Pearl Necklace", "Floral Hair Pin Set", "Gift Box Jewellery Set"], colors: ["Gold", "Silver", "Rose Gold", "Pearl", "Berry", "Multi"], images: ["photo-1535632066927-ab7c9ab60908", "photo-1611652022419-a9419f74343d", "photo-1617038220319-276d3cfab638", "photo-1611591437281-460bfbe1220a", "photo-1611085583191-a3b181a88401", "photo-1515562141207-7a88fb7ce338"] },
  { category: "Books & Stationery", names: ["Pocket Daily Planner", "Pastel Highlighter Set", "Hardcover Journal", "Fine Tip Pen Pack", "Weekly Desk Planner", "Creative Sketchbook", "Colourful Sticky Notes", "Minimal Pencil Case", "Study Flash Cards", "Premium Notebook Set", "Reusable Book Tabs", "Desk Calendar", "Watercolour Starter Set", "Gel Pen Collection", "Reading Journal", "Exam Revision Notebook", "Gift Wrap & Card Set"], colors: ["Lilac", "Mint", "Rose", "Black", "Cream", "Multi"], images: ["photo-1455390582262-044cdead277a", "photo-1517842645767-c639042777db", "photo-1544816155-12df9643f363", "photo-1453738773917-9c3eff1db985", "photo-1519682337058-a94d519337bc", "photo-1516979187457-637abb4f9353"] },
  { category: "Girls' Style", names: ["Baby Pink Satin Bow Dress", "Floral Cottagecore Midi Dress", "Pastel Co-ord Set", "Lace Trim Cardigan", "Ribbon Ballet Flats", "Pearl Hair Bow Set", "Heart Print Shoulder Bag", "Soft Knit Bolero", "Dainty Layered Necklace", "Rose Garden Skirt", "Butter Yellow Sundress", "Cherry Print Cardigan", "Velvet Party Dress", "Dreamy Tulle Skirt", "Crochet Summer Top", "Pink Denim Jacket", "Satin Scrunchie Bundle", "Bow Detail Mary Janes", "Vintage Floral Blouse", "Soft Lounge Set", "Butterfly Hair Clips", "Mini Quilted Crossbody", "Pastel Knit Vest", "Lace Collar Blouse"], colors: ["Blush", "Ivory", "Lilac", "Rose", "Sage", "Butter Yellow"], images: ["photo-1496747611176-843222e1e57c", "photo-1509631179647-0177331693ae", "photo-1525507119028-ed4c629a60a3", "photo-1485968579580-b6d095142e6e", "photo-1515886657613-9f3515b0c78f", "photo-1539109136881-3be0616acf4b"] },
  { category: "Gifts & Personalised", names: ["Birthday Surprise Gift Box", "Personalised Initial Necklace", "Cute Trinket Jewellery Dish", "Mini Perfume Gift Set", "Aesthetic Desk Accessory Kit", "Floral Ceramic Mug Gift", "Bestie Friendship Bracelet Set", "Cute Plush Flower Bouquet", "Memory Scrapbook Kit", "Pastel Candle Gift Set", "Personalised Photo Frame", "Mini Self-Care Hamper", "Kawaii Stationery Bundle", "Heart Trinket Box", "Birthday Hair Accessory Set", "Ribbon Gift Wrap Kit", "Cute Bag Charm Collection", "Dainty Jewellery Gift Box", "Cosy Socks Gift Set", "Creative DIY Bead Kit", "Pastel Water Bottle Gift", "Mini Makeup Organiser", "Floral Notebook Gift Set", "Cute Phone Charm Set"], colors: ["Pink", "Lilac", "Cream", "Rose Gold", "Mint", "Multi"], images: ["photo-1490312278390-ab64016e0aa9", "photo-1513475382585-d06e58bcb0e0", "photo-1513201099705-a9746e1e201f", "photo-1549465220-1a8b9238cd48", "photo-1513883049090-d0b7439799bf", "photo-1512909006721-3d6018887383"] },
];

const PRICE_POINTS = [5, 19, 49, 79, 99, 149, 199, 249, 299, 349, 399, 499, 599, 699, 799, 899, 999, 1199, 1499, 1799, 2199, 2799, 3499, 4499, 5999, 7999, 9999, 12999, 14999];

const GENERATED_PRODUCTS = EXTRA_CATALOGUE.flatMap((group, groupIndex) =>
  group.names.map((name, itemIndex) => {
    const index = groupIndex * 17 + itemIndex;
    const price = PRICE_POINTS[(itemIndex * 3 + groupIndex * 5) % PRICE_POINTS.length];
    const imageId = name === "Classic Tailored Blazer" ? "photo-1591047139829-d91aecb6caea" : group.images[itemIndex % group.images.length];
    return {
      id: 100000 + groupIndex * 1000 + itemIndex,
      name,
      category: group.category,
      price,
      oldPrice: Math.ceil(price * (1.18 + (itemIndex % 4) * 0.08) / 5) * 5,
      rating: Number((4.1 + ((itemIndex + groupIndex) % 9) * 0.1).toFixed(1)),
      tag: price < 100 ? "BUDGET FIND" : price < 500 ? "VALUE PICK" : itemIndex % 3 === 0 ? "TRENDING" : itemIndex % 3 === 1 ? "CUSTOMER FAVOURITE" : "NEW FIND",
      color: group.colors[itemIndex % group.colors.length],
      image: `https://images.unsplash.com/${imageId}?auto=format&fit=crop&w=700&q=85`,
      description: `A thoughtfully selected ${group.category.toLowerCase()} find, chosen for everyday comfort, useful details, and value across different budgets.`,
    };
  })
);

const ALL_PRODUCTS = [...PRODUCTS, ...GENERATED_PRODUCTS];

const CATEGORIES = ["All products", "Clothing", "Girls' Style", "Gifts & Personalised", "Shoes", "Accessories", "Home & Living", "Beauty", "Tech & Gadgets", "Kids & Baby", "Sports & Outdoors", "Jewellery", "Books & Stationery"];

const money = (amount) => {
  const value = Number(amount);
  if (!Number.isFinite(value)) return "₹0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
};

const MAX_PRICE_FILTER = 15000;

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function Icon({ name, size = 20 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  const paths = {
    search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4 4" /></>,
    heart: <path d="M20.8 8.8c0 5.2-8.8 10-8.8 10s-8.8-4.8-8.8-10a4.8 4.8 0 0 1 8.8-2.5 4.8 4.8 0 0 1 8.8 2.5Z" />,
    bag: <><path d="M5 8h14l1 12H4L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>,
    user: <><circle cx="12" cy="8" r="3.5" /><path d="M5 20c.5-4 3-6 7-6s6.5 2 7 6" /></>,
    menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    filter: <><path d="M4 7h16M7 12h10M10 17h4" /><circle cx="8" cy="7" r="1.5" /><circle cx="15" cy="12" r="1.5" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    minus: <path d="M5 12h14" />,
    trash: <><path d="M4 7h16M10 11v6M14 11v6M6 7l1 14h10l1-14M9 7V4h6v3" /></>,
    truck: <><path d="M3 6h11v11H3zM14 10h4l3 3v4h-7z" /><circle cx="7.5" cy="19" r="1.5" /><circle cx="17.5" cy="19" r="1.5" /></>,
    shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="m9 12 2 2 4-4" /></>,
    chat: <><path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 9 9 0 0 1-4-.9L3 20l1.5-4A7.5 7.5 0 1 1 20 11.5Z" /></>,
  };

  return <svg {...common}>{paths[name] || paths.arrow}</svg>;
}

function mapApiCategory(rawCategory, title = "") {
  const category = String(rawCategory || "").toLowerCase();
  const name = String(title || "").toLowerCase();
  if (/beauty|fragrance|skin-care|makeup|nail/.test(category + " " + name)) return "Beauty";
  if (/shoe|sandal|boot|sneaker|heel|footwear/.test(category + " " + name)) return "Shoes";
  if (/jewel|ring|necklace|bracelet|earring|pendant/.test(category + " " + name)) return "Jewellery";
  if (/sport|fitness|gym|cycling|running|outdoor/.test(category + " " + name)) return "Sports & Outdoors";
  if (/laptop|smartphone|mobile|tablet|electronics|headphone|speaker|computer|charger|camera|mouse|keyboard|watch/.test(category + " " + name)) return "Tech & Gadgets";
  if (/furniture|home|decoration|kitchen|lighting|living|groceries/.test(category + " " + name)) return "Home & Living";
  if (/kid|baby|toy|child|toddler/.test(category + " " + name)) return "Kids & Baby";
  if (/book|stationery|pen|notebook|planner|pencil|sketch/.test(category + " " + name)) return "Books & Stationery";
  if (/bag|wallet|sunglass|accessor|watch|belt|purse|backpack/.test(category + " " + name)) return "Accessories";
  if (/shirt|dress|top|trouser|jean|pants|clothing|apparel|coat|jacket|hoodie|sweater|skirt/.test(category + " " + name)) return "Clothing";
  return "Home & Living";
}

function mapApiProduct(product) {
  const title = product.title || "Everyday find";
  const price = Math.max(5, Math.round(Number(product.price || 1) * 83 / 5) * 5);
  const images = Array.isArray(product.images) ? product.images : [];
  return {
    id: 1000 + Number(product.id),
    name: title,
    category: mapApiCategory(product.category, title),
    price,
    oldPrice: Math.ceil((price * 1.18) / 10) * 10,
    rating: Number(Math.min(5, Math.max(3.5, Number(product.rating || 4.2))).toFixed(1)),
    tag: Number(product.rating || 0) >= 4.7 ? "TOP RATED" : Number(product.discountPercentage || 0) >= 12 ? "GREAT VALUE" : "DISCOVER",
    color: "Assorted",
    image: product.thumbnail || images.find((url) => typeof url === "string" && /^https?:\/\//.test(url)) || "",
    description: product.description || `A ${title.toLowerCase()} selected for everyday use. Check the product details before buying.`,
    source: "catalogue-demo",
  };
}

function App() {
  const [catalogue, setCatalogue] = useState(PRODUCTS);
  const [catalogueLoading, setCatalogueLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All products");
  const [sort, setSort] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE_FILTER);
  const [saleOnly, setSaleOnly] = useState(false);
  const [wishlistOnly, setWishlistOnly] = useState(false);
  const [wishlist, setWishlist] = useState(() => readStorage("trendnest-wishlist", []));
  const [bag, setBag] = useState(() => readStorage("trendnest-bag", []));
  const [orders, setOrders] = useState(() => readStorage("trendnest-orders", []));
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activePanel, setActivePanel] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [toast, setToast] = useState("");
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(null);
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const chatMessagesEndRef = useRef(null);
  const [chatMessages, setChatMessages] = useState([
    {
      role: "assistant",
      text: "Hey, style explorer! ✨ I’m your Shopping Buddy. Tell me your budget, who you’re shopping for, or what you love. I can find gifts, build outfits, suggest budget picks, and show products you can open or add to your bag.",
    },
  ]);

  useEffect(() => {
    const controller = new AbortController();
    const categorySearches = [
      ["Clothing", ["cotton t shirt apparel product", "women dress fashion garment", "men casual shirt clothing", "denim jeans trousers apparel", "knit sweater cardigan fashion", "hoodie sweatshirt clothing", "jacket coat outerwear fashion", "linen shirt fashion clothing", "skirt trousers outfit apparel", "kids clothing baby romper apparel"]],
      ["Shoes", ["sneakers footwear product photo", "leather boots shoes product", "sandals slippers footwear", "running shoes sports footwear", "formal shoes loafers product", "kids shoes colorful footwear", "heels women footwear", "canvas shoes casual footwear", "hiking boots outdoor shoes", "baby shoes toddler footwear"]],
      ["Accessories", ["handbag tote bag product photo", "backpack travel bag product", "wallet purse card holder", "sunglasses eyewear accessory", "wrist watch product photography", "belt fashion accessory product", "scarf hat cap fashion accessory", "hair clips hair accessories product", "travel luggage suitcase product", "umbrella reusable bottle accessory"]],
      ["Home & Living", ["modern home decor product photo", "table lamp lighting product", "chair furniture interior product", "ceramic mug cup kitchenware", "cushion pillow home textile", "vase planter home decor", "kitchen utensil cookware product", "bedsheet blanket home textile", "storage organizer home product", "wall art frame home decor"]],
      ["Beauty", ["skincare cosmetic bottle product", "makeup lipstick beauty product", "perfume fragrance bottle product", "beauty brush makeup tools", "face cream moisturizer packaging", "nail polish beauty product", "hair care shampoo bottle", "soap bath body product", "sunscreen skincare packaging", "cosmetic palette beauty product"]],
      ["Tech & Gadgets", ["wireless headphones product photo", "computer keyboard mouse gadget", "smartphone case charger accessory", "camera lens electronics product", "portable speaker electronics", "smartwatch wearable gadget", "gaming controller electronics", "tablet laptop accessory product", "power bank charging cable", "desk microphone tech gadget"]],
      ["Kids & Baby", ["wooden toy blocks kids product", "plush teddy bear toy product", "baby clothes romper product", "baby stroller nursery product", "children backpack school bag", "building blocks construction toy", "kids puzzle board game product", "baby bottle feeding accessory", "children book illustration toy", "baby blanket nursery textile"]],
      ["Sports & Outdoors", ["yoga mat fitness equipment product", "dumbbell workout equipment photo", "bicycle cycling gear product", "camping tent outdoor equipment", "hiking backpack outdoor gear", "football basketball sports equipment", "water bottle sports accessory", "tennis racket sports product", "swimming goggles sports gear", "skateboard outdoor sports product"]],
      ["Jewellery", ["silver earrings jewelry product", "gold necklace pendant jewellery", "bracelet jewelry product photography", "gemstone ring jewellery product", "beaded necklace accessory", "pearl earrings jewelry product", "minimalist watch jewelry accessory", "brooch pin jewellery product", "jewelry box storage product", "fashion chain bracelet jewellery"]],
      ["Books & Stationery", ["notebook journal stationery product", "fountain pen stationery product", "colored pencils art supplies", "school backpack stationery supplies", "desk planner calendar product", "sketchbook drawing paper product", "sticky notes office stationery", "book stack reading stationery", "scissors ruler school supplies", "paint brush art supplies product"]],
    ];
    const stripMarkup = (value = "") => String(value).replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/&#160;/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();

    async function loadCatalogue() {
      try {
        let apiProducts = [];
        try {
          const response = await fetch("https://dummyjson.com/products?limit=194", { signal: controller.signal });
          if (response.ok) {
            const data = await response.json();
            apiProducts = (Array.isArray(data.products) ? data.products : []).map(mapApiProduct);
            // Ensure the two newer catalogue departments have real-photo products too.
            // Reclassify a small selection of genuine API listings rather than inventing
            // image placeholders or duplicating photos across product cards.
            let girlsAssigned = 0;
            let giftsAssigned = 0;
            apiProducts = apiProducts.map((product) => {
              const text = `${product.name} ${product.description || ""}`.toLowerCase();
              if (girlsAssigned < 12 && /women|girl|dress|top|skirt|jacket|shirt|blouse|fashion|jewell?ery|accessor/.test(text)) {
                girlsAssigned += 1;
                return { ...product, category: "Girls' Style" };
              }
              if (giftsAssigned < 12 && /jewel|beauty|skin|perfume|home|decor|watch|bag|gift|accessor|fragrance/.test(text)) {
                giftsAssigned += 1;
                return { ...product, category: "Gifts & Personalised" };
              }
              return product;
            });
          }
        } catch (error) {
          if (error.name === "AbortError") throw error;
        }

        // Only render products backed by real remote product photographs.
        // Do not fabricate extra "Style 2/3/4" items or use illustration placeholders.
        const usedImages = new Set();
        const catalogueItems = [];
        const seedProducts = [...PRODUCTS, ...GENERATED_PRODUCTS, ...apiProducts];

        EXTRA_CATALOGUE.forEach((group) => {
          const matching = seedProducts.filter((item) => item.category === group.category);

          for (const product of matching) {
            const image = String(product.image || "").trim();
            const isRemotePhoto = /^https:\/\/(images\.unsplash\.com|cdn\.dummyjson\.com|i\.dummyjson\.com|dummyjson\.com)\//i.test(image);
            if (!isRemotePhoto || usedImages.has(image)) continue;

            usedImages.add(image);
            catalogueItems.push({
              ...product,
              category: group.category,
              image,
              imageFallback: "",
            });
          }
        });

        // Migrate wishlist IDs saved by older builds, which used sequential catalogue IDs.
        // New builds use stable product IDs, so saved items keep working after API ordering changes.
        const storedWishlist = readStorage("trendnest-wishlist", []);
        if (Array.isArray(storedWishlist) && storedWishlist.some((id) => Number(id) >= 3000000)) {
          const migratedWishlist = storedWishlist.map((rawId) => {
            const id = Number(rawId);
            if (id >= 3000000 && id < 3000000 + catalogueItems.length) {
              return catalogueItems[id - 3000000]?.id ?? rawId;
            }
            if (id >= 5000000 && id < 5000000 + catalogueItems.length) {
              return catalogueItems[id - 5000000]?.id ?? rawId;
            }
            return rawId;
          });
          setWishlist([...new Set(migratedWishlist)]);
        }

        // Keep only genuine photo-backed listings; never add a fake fallback image.
        if (!controller.signal.aborted) setCatalogue(catalogueItems);
      } catch (error) {
        if (error.name !== "AbortError") {
          // If the API is unavailable, show only curated products that already have
          // real photo URLs. Never invent image placeholders or image-less variants.
          const usedImages = new Set();
          const offlineProducts = [...PRODUCTS, ...GENERATED_PRODUCTS].filter((product) => {
            const image = String(product.image || "").trim();
            const isRemotePhoto = /^https:\/\/(images\.unsplash\.com|cdn\.dummyjson\.com|i\.dummyjson\.com|dummyjson\.com)\//i.test(image);
            if (!isRemotePhoto || usedImages.has(image)) return false;
            usedImages.add(image);
            return true;
          });
          setCatalogue(offlineProducts.map((product) => ({
            ...product,
            image: String(product.image).trim(),
            imageFallback: "",
          })));
        }
      } finally {
        if (!controller.signal.aborted) setCatalogueLoading(false);
      }
    }
    loadCatalogue();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("trendnest-wishlist", JSON.stringify(wishlist));
    } catch {
      // Storage may be unavailable in private browsing.
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem("trendnest-bag", JSON.stringify(bag));
    } catch {
      // Storage may be unavailable in private browsing.
    }
  }, [bag]);

  useEffect(() => {
    chatMessagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [chatMessages, chatOpen]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(""), 2600);
    return () => clearTimeout(timer);
  }, [toast]);

  const filteredProducts = useMemo(() => {
    let list = catalogue.filter((product) => {
      const matchesCategory =
        category === "All products" || product.category === category;
      const searchable =
        `${product.name} ${product.category} ${product.color} ${product.tag}`.toLowerCase();
      const matchesQuery = searchable.includes(query.trim().toLowerCase());
      const productPrice = Number(product.price);
      const matchesPrice = Number.isFinite(productPrice) && productPrice >= 0 && productPrice <= maxPrice;
      const matchesSale = !saleOnly || product.oldPrice > product.price;
      const matchesWishlist =
        !wishlistOnly || wishlist.includes(product.id);

      return (
        matchesCategory &&
        matchesQuery &&
        matchesPrice &&
        matchesSale &&
        matchesWishlist
      );
    });

    if (sort === "price-low") list.sort((a, b) => a.price - b.price);
    if (sort === "price-high") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));

    return list;
  }, [query, category, sort, maxPrice, saleOnly, wishlistOnly, wishlist]);

  const bagCount = bag.reduce((sum, item) => sum + item.quantity, 0);
  const bagTotal = bag.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const savedTotal = bag.reduce((sum, item) => {
    const product = catalogue.find((p) => p.id === item.id);
    return sum + (product ? (product.oldPrice - product.price) * item.quantity : 0);
  }, 0);

  function addToBag(product) {
    setBag((current) => {
      const found = current.find((item) => item.id === product.id);
      if (found) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...current, { id: product.id, name: product.name, price: product.price, image: product.image, imageFallback: product.imageFallback || "", quantity: 1 }];
    });
    setToast(`${product.name} added to your bag`);
  }

  function updateQuantity(id, change) {
    setBag((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function toggleWishlist(product) {
    const isSaved = wishlist.includes(product.id);
    setWishlist((current) =>
      isSaved
        ? current.filter((id) => id !== product.id)
        : [...current, product.id]
    );
    setToast(isSaved ? "Removed from wishlist" : "Saved to your wishlist");
  }

  function scrollToCollection() {
    window.setTimeout(() => {
      document.getElementById("product-collection")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 40);
  }

  function openCategory(value) {
    setCategory(value);
    setWishlistOnly(false);
    setMobileMenu(false);
    setActivePanel("");
    scrollToCollection();
  }

  function openWishlist() {
    setWishlistOnly(true);
    setCategory("All products");
    setActivePanel("");
    scrollToCollection();
  }

  function clearFilters() {
    setQuery("");
    setCategory("All products");
    setMaxPrice(MAX_PRICE_FILTER);
    setSaleOnly(false);
    setWishlistOnly(false);
    setSort("featured");
  }

  function sendBuddyMessage(rawMessage) {
    const message = String(rawMessage || "").trim();
    if (!message) return;
    setChatMessages((current) => [...current, { role: "user", text: message }]);
    setChatInput("");
    const lower = message.toLowerCase();
    let reply = "I can help you discover products, compare prices, find gifts, build an outfit, or browse by category. Tell me what you need and I’ll make a little shortlist for you.";
    let recommendations = [];
    const budgetMatch = lower.match(/(?:under|below|within|budget(?: of)?|₹|rs\.?\s*)(\d[\d,]*)/i);
    const budget = budgetMatch ? Number(budgetMatch[1].replace(/,/g, "")) : null;
    if (lower.includes("deliver") || lower.includes("shipping")) {
      reply = "I can help you get checkout-ready! Add your favourite finds to the bag and enter your address at checkout. This demo does not yet have live courier or shipment tracking integration.";
      recommendations = catalogue.filter((product) => product.price <= (budget || 999)).slice(0, 3);
    } else if (lower.includes("return") || lower.includes("refund")) {
      reply = "For a live store, returns and refunds need an order-management system. In this demo, My Orders shows the order details saved in this browser, but it cannot submit a real return request.";
    } else if (lower.includes("order") || lower.includes("track")) {
      reply = `You have ${orders.length} demo ${orders.length === 1 ? "order" : "orders"} saved in this browser. Use the separate My Orders button in the header to open order history and click any item for product details.`;
    } else if (lower.includes("budget") || lower.includes("cheap") || lower.includes("under") || budget) {
      const cap = budget || 500;
      recommendations = catalogue.filter((product) => product.price <= cap).sort((a, b) => b.rating - a.rating).slice(0, 4);
      reply = recommendations.length ? `Budget mode on ✨ Here are a few well-rated finds at or below ${money(cap)}. Tap a product to see details, or add it straight to your bag.` : `I couldn't find a product under ${money(cap)} yet. Try a higher budget and I'll look again.`;
    } else if (lower.includes("gift") || lower.includes("birthday") || lower.includes("present")) {
      recommendations = catalogue.filter((product) => product.tag.includes("GIFT") || product.category === "Jewellery" || product.category === "Accessories").sort((a, b) => b.rating - a.rating).slice(0, 4);
      reply = "Gift-finding mode 🎁 I picked versatile options across different budgets. If you tell me the person's age, interests, and budget, I can narrow it down.";
    } else if (lower.includes("outfit") || lower.includes("style") || lower.includes("wear") || lower.includes("fashion")) {
      recommendations = catalogue.filter((product) => ["Clothing", "Shoes", "Accessories"].includes(product.category)).sort((a, b) => b.rating - a.rating).slice(0, 4);
      reply = "Let's build a look! Start with one clothing piece, then pair it with shoes and an accessory. These are a few easy-to-style starting points.";
    } else {
      const categoryMatch = ["Clothing", "Shoes", "Accessories", "Home & Living", "Beauty", "Tech & Gadgets", "Kids & Baby", "Sports & Outdoors", "Jewellery", "Books & Stationery"].find((item) => lower.includes(item.toLowerCase()) || (item === "Tech & Gadgets" && (lower.includes("tech") || lower.includes("gadget") || lower.includes("headphone"))) || (item === "Kids & Baby" && (lower.includes("kid") || lower.includes("baby"))) || (item === "Home & Living" && (lower.includes("home") || lower.includes("decor"))) || (item === "Beauty" && (lower.includes("beauty") || lower.includes("skin") || lower.includes("makeup"))) || (item === "Sports & Outdoors" && (lower.includes("sport") || lower.includes("fitness") || lower.includes("gym"))) || (item === "Books & Stationery" && (lower.includes("book") || lower.includes("stationery") || lower.includes("study"))));
      if (categoryMatch) {
        recommendations = catalogue.filter((product) => product.category === categoryMatch).sort((a, b) => b.rating - a.rating).slice(0, 4);
        reply = `Great choice! I found a few ${categoryMatch.toLowerCase()} picks to get you started. Open any item for details or add it to your bag.`;
      } else if (lower.includes("payment") || lower.includes("pay")) {
        reply = "Checkout in this demo supports Cash on Delivery as a display-only option. No payment is processed. A real store needs a secure payment gateway and server-side order handling.";
      } else {
        recommendations = catalogue.filter((product) => product.rating >= 4.7).slice(0, 4);
      }
    }
    setChatMessages((current) => [...current, { role: "assistant", text: reply, products: recommendations }]);
  }

  function submitChat(event) {
    event.preventDefault();
    sendBuddyMessage(chatInput);
  }

  function placeOrder(event) {
    event.preventDefault();
    if (!bag.length) {
      setToast("Your bag is empty");
      return;
    }

    setOrderLoading(true);

    const order = {
      orderNumber: `TN${Date.now().toString().slice(-8)}`,
      items: bag.map((item) => {
        const product = catalogue.find((entry) => entry.id === item.id);
        return { ...(product || {}), ...item, quantity: Number(item.quantity || 1) };
      }),
      total: bagTotal,
      customer,
      payment: "Cash on Delivery",
      createdAt: new Date().toISOString(),
    };

    try {
      const previousOrders = readStorage("trendnest-orders", []);
      localStorage.setItem(
        "trendnest-orders",
        JSON.stringify([order, ...previousOrders])
      );
      setOrders((current) => [order, ...current]);
      setOrderComplete(order);
      setBag([]);
      setCheckoutOpen(false);
      setActivePanel("");
    } catch {
      setToast("Unable to save the demo order. Please try again.");
    } finally {
      setOrderLoading(false);
    }
  }

  return (
    <div className="tn-app">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');

        :root {
          --tn-ink: #27212d;
          --tn-muted: #827987;
          --tn-line: #eee8f0;
          --tn-paper: #fffdfd;
          --tn-plum: #653b70;
          --tn-plum-dark: #4c2859;
          --tn-lilac: #f2eaf5;
          --tn-rose: #b85e7c;
          --tn-green: #32765c;
        }

        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: #fff; color: var(--tn-ink); font-family: 'DM Sans', sans-serif; }
        button, input, select, textarea { font: inherit; }
        button { cursor: pointer; }
        button:disabled { opacity: .6; cursor: not-allowed; }
        button:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible { outline: 3px solid #d8c0e2; outline-offset: 2px; }
        .tn-app { min-height: 100vh; }
        .tn-promo { padding: 9px 16px; background: #4e2d59; color: white; text-align: center; font-size: 11px; letter-spacing: .65px; }
        .tn-promo strong { font-weight: 700; }
        .tn-header { background: rgba(255,255,255,.96); border-bottom: 1px solid var(--tn-line); position: sticky; top: 0; z-index: 30; backdrop-filter: blur(14px); }
        .tn-header-inner { max-width: 1480px; margin: auto; padding: 17px 28px; display: grid; grid-template-columns: 220px minmax(200px,1fr) auto; gap: 26px; align-items: center; }
        .tn-logo { border: 0; background: none; color: var(--tn-ink); display: flex; align-items: center; gap: 9px; padding: 0; text-align: left; }
        .tn-logo-name { font: 800 20px Manrope,sans-serif; letter-spacing: -1px; }
        .tn-logo-name span { color: var(--tn-plum); }
        .tn-search { display: flex; align-items: center; gap: 10px; padding: 0 14px; background: #f8f5f9; border: 1px solid transparent; border-radius: 12px; height: 45px; color: var(--tn-muted); }
        .tn-search:focus-within { border-color: #c9afd4; background: white; }
        .tn-search input { min-width: 0; width: 100%; border: 0; outline: 0; background: transparent; color: var(--tn-ink); font-size: 13px; }
        .tn-search input:focus-visible { outline: none; }
        .tn-header-actions { display: flex; gap: 7px; align-items: center; }
        .tn-icon-button { position: relative; width: 42px; height: 42px; border: 0; border-radius: 12px; background: transparent; color: var(--tn-ink); display: grid; place-items: center; }
        .tn-icon-button:hover { background: var(--tn-lilac); }
        .tn-icon-label { display: flex; gap: 8px; align-items: center; border: 0; background: transparent; font-size: 12px; color: var(--tn-ink); padding: 9px; }
        .tn-count { position: absolute; right: 0; top: 0; min-width: 18px; height: 18px; padding: 0 4px; border-radius: 20px; background: var(--tn-rose); color: white; font-size: 10px; font-weight: 700; display: grid; place-items: center; }
        .tn-nav { max-width: 1480px; padding: 0 28px; margin: auto; display: flex; align-items: center; gap: 27px; min-height: 43px; }
        .tn-nav button { height: 43px; padding: 0 0; background: none; border: 0; border-bottom: 2px solid transparent; color: #716876; font-size: 12px; font-weight: 600; }
        .tn-nav button:hover, .tn-nav button.active { color: var(--tn-plum); border-bottom-color: var(--tn-plum); }
        .tn-nav-spacer { flex: 1; }
        .tn-nav-note { font-size: 11px; color: var(--tn-muted); display: flex; align-items: center; gap: 7px; }
        .tn-main { max-width: 1480px; margin: auto; padding: 27px 28px 65px; }
        .tn-layout { display: grid; grid-template-columns: 205px minmax(0,1fr); gap: 24px; align-items: start; }
        .tn-sidebar { min-width: 0; }
        .tn-side-card { border: 1px solid var(--tn-line); border-radius: 15px; padding: 18px; margin-bottom: 15px; background: white; }
        .tn-side-title { font: 800 12px Manrope,sans-serif; margin: 0 0 17px; letter-spacing: -.15px; }
        .tn-side-subtitle { font-size: 11px; color: var(--tn-muted); margin: 0 0 12px; }
        .tn-category-list { display: grid; gap: 4px; }
        .tn-category-button { width: 100%; display: flex; justify-content: space-between; gap: 6px; align-items: center; padding: 10px 9px; border: 0; border-radius: 9px; background: transparent; text-align: left; color: #6e6573; font-size: 12px; }
        .tn-category-button:hover, .tn-category-button.active { color: var(--tn-plum); background: #f6eff8; font-weight: 700; }
        .tn-category-count { font-size: 10px; color: #a399aa; }
        .tn-filter-block { border-top: 1px solid var(--tn-line); padding-top: 15px; margin-top: 15px; }
        .tn-filter-head { display: flex; justify-content: space-between; align-items: center; gap: 8px; font-size: 12px; font-weight: 700; margin-bottom: 12px; }
        .tn-reset { border: 0; background: none; color: var(--tn-plum); font-size: 10px; font-weight: 700; padding: 0; }
        .tn-range { width: 100%; accent-color: var(--tn-plum); cursor: pointer; }
        .tn-range-labels { display: flex; justify-content: space-between; margin-top: 8px; color: var(--tn-muted); font-size: 10px; }
        .tn-check-row { display: flex; align-items: center; gap: 8px; font-size: 11px; color: #665d6b; cursor: pointer; }
        .tn-check-row input { accent-color: var(--tn-plum); }
        .tn-mini-banner { background: #f4edf6; border-radius: 13px; padding: 17px 15px; }
        .tn-mini-banner .tn-mini-label { color: var(--tn-plum); font-size: 9px; font-weight: 800; letter-spacing: 1.2px; }
        .tn-mini-banner h3 { font: 800 17px/1.35 Manrope,sans-serif; margin: 9px 0; letter-spacing: -.6px; }
        .tn-mini-banner p { font-size: 11px; color: #756a7b; line-height: 1.65; margin: 0 0 12px; }
        .tn-mini-banner button { background: var(--tn-plum); color: white; border: 0; border-radius: 8px; padding: 9px 12px; font-size: 10px; font-weight: 700; }
        .tn-hero { position: relative; min-height: 215px; border-radius: 17px; overflow: hidden; background: #eee4f0; margin-bottom: 26px; display: grid; grid-template-columns: 1.1fr .9fr; }
        .tn-hero-copy { padding: 30px 27px; z-index: 1; align-self: center; }
        .tn-eyebrow { color: var(--tn-plum); font-size: 9px; font-weight: 800; letter-spacing: 1.6px; text-transform: uppercase; }
        .tn-hero h1 { max-width: 360px; margin: 11px 0 9px; font: 800 clamp(26px,3vw,39px)/1.13 Manrope,sans-serif; letter-spacing: -1.8px; }
        .tn-hero p { max-width: 300px; color: #726579; font-size: 12px; line-height: 1.7; margin: 0 0 17px; }
        .tn-primary { display: inline-flex; justify-content: center; align-items: center; gap: 9px; background: var(--tn-plum); color: white; border: 1px solid var(--tn-plum); border-radius: 9px; padding: 12px 15px; font-size: 11px; font-weight: 700; transition: background .2s, transform .2s; }
        .tn-primary:hover { background: var(--tn-plum-dark); transform: translateY(-1px); }
        .tn-hero-image { position: relative; min-height: 215px; overflow: hidden; }
        .tn-hero-image img { width: 100%; height: 100%; position: absolute; inset: 0; object-fit: cover; object-position: center 40%; }
        .tn-hero-image:after { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg,#eee4f0 0%,rgba(238,228,240,.1) 48%,transparent 100%); }
        .tn-collection-heading { display: flex; align-items: end; justify-content: space-between; gap: 12px; margin-bottom: 16px; }
        .tn-collection-heading h2 { font: 800 22px Manrope,sans-serif; letter-spacing: -.7px; margin: 5px 0 4px; }
        .tn-collection-heading p { color: var(--tn-muted); font-size: 11px; margin: 0; }
        .tn-sort { border: 1px solid var(--tn-line); background: white; border-radius: 9px; padding: 10px 11px; color: #554b5a; font-size: 11px; max-width: 160px; }
        .tn-active-filters { display: flex; flex-wrap: wrap; gap: 7px; margin: -3px 0 17px; }
        .tn-chip { display: inline-flex; align-items: center; gap: 6px; border: 1px solid #e5d8e9; background: #fbf7fc; color: var(--tn-plum); border-radius: 20px; padding: 6px 9px; font-size: 10px; }
        .tn-product-grid { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 21px 15px; }
        .tn-product-card { min-width: 0; position: relative; }
        .tn-product-image { width: 100%; position: relative; aspect-ratio: 4 / 4.7; overflow: hidden; background: #f4f0f4; border-radius: 12px; cursor: pointer; }
        .tn-product-image img { width: 100%; height: 100%; display: block; object-fit: cover; transition: transform .35s; }
        .tn-product-card:hover .tn-product-image img { transform: scale(1.045); }
        .tn-product-tag { position: absolute; left: 9px; top: 9px; z-index: 1; background: rgba(255,255,255,.94); color: var(--tn-plum); padding: 6px 7px; border-radius: 5px; font-size: 8px; letter-spacing: .45px; font-weight: 800; }
        .tn-wish-button { position: absolute; z-index: 2; right: 9px; top: 9px; width: 32px; height: 32px; border-radius: 50%; border: 0; background: rgba(255,255,255,.94); color: #66566c; display: grid; place-items: center; }
        .tn-wish-button.saved { color: #b84e73; }
        .tn-quick-add { position: absolute; left: 9px; right: 9px; bottom: 9px; width: calc(100% - 18px); padding: 11px 6px; background: rgba(255,255,255,.96); border: 0; border-radius: 8px; color: var(--tn-ink); font-size: 10px; font-weight: 800; opacity: 0; transform: translateY(5px); transition: all .2s; }
        .tn-product-card:hover .tn-quick-add, .tn-quick-add:focus-visible { opacity: 1; transform: translateY(0); }
        .tn-product-info { padding: 11px 2px 0; }
        .tn-product-category { color: #988e9d; font-size: 9px; letter-spacing: .5px; text-transform: uppercase; }
        .tn-product-name { margin: 5px 0 7px; padding: 0; border: 0; background: none; text-align: left; font-size: 12px; line-height: 1.45; font-weight: 600; color: var(--tn-ink); }
        .tn-product-name:hover { color: var(--tn-plum); }
        .tn-product-bottom { display: flex; justify-content: space-between; gap: 5px; align-items: center; flex-wrap: wrap; }
        .tn-product-price { display: flex; flex-wrap: wrap; gap: 6px; align-items: baseline; font-size: 13px; font-weight: 850; color: #39233f; line-height: 1.5; }
        .tn-product-price > span:first-child { display: inline-block; color: #39233f !important; visibility: visible !important; opacity: 1 !important; }
        .tn-old-price { color: #8c8290; font-size: 10px; font-weight: 500; text-decoration: line-through; }
        .tn-rating { display: flex; align-items: center; gap: 3px; color: #a46c35; font-size: 10px; }
        .tn-mobile-add { display: none; }
        .tn-empty { text-align: center; border: 1px dashed #ded0e3; background: #fcf9fd; padding: 48px 20px; border-radius: 15px; }
        .tn-empty h3 { font: 800 18px Manrope,sans-serif; margin: 12px 0 6px; }
        .tn-empty p { color: var(--tn-muted); font-size: 12px; line-height: 1.7; }
        .tn-benefit { display: flex; align-items: flex-start; gap: 11px; padding: 13px 0; border-bottom: 1px solid var(--tn-line); }
        .tn-benefit:last-child { border-bottom: 0; padding-bottom: 0; }
        .tn-benefit-icon { width: 33px; height: 33px; flex-shrink: 0; display: grid; place-items: center; border-radius: 10px; color: var(--tn-plum); background: #f4edf6; }
        .tn-benefit strong { display: block; font-size: 11px; margin: 1px 0 4px; }
        .tn-benefit span { display: block; color: var(--tn-muted); font-size: 10px; line-height: 1.5; }
        .tn-trend-link { display: flex; gap: 10px; align-items: center; padding: 10px 0; border-bottom: 1px solid var(--tn-line); cursor: pointer; }
        .tn-trend-link:last-child { border-bottom: 0; padding-bottom: 0; }
        .tn-trend-link img { width: 48px; height: 55px; border-radius: 7px; object-fit: cover; background: #f4f0f4; }
        .tn-trend-link strong { display: block; font-size: 10px; line-height: 1.5; }
        .tn-trend-link span { display: block; font-size: 10px; color: var(--tn-muted); margin-top: 4px; }
        .tn-newsletter { border-radius: 14px; background: #4e2d59; color: white; padding: 18px; }
        .tn-newsletter h3 { font: 800 16px Manrope,sans-serif; margin: 0 0 8px; }
        .tn-newsletter p { font-size: 10px; color: #e1d4e5; line-height: 1.7; margin: 0 0 13px; }
        .tn-newsletter form { display: flex; gap: 4px; }
        .tn-newsletter input { width: 100%; min-width: 0; border: 0; background: white; border-radius: 7px; padding: 10px 8px; font-size: 10px; }
        .tn-newsletter button { border: 0; background: #ead9ef; color: var(--tn-plum-dark); border-radius: 7px; padding: 0 10px; font-size: 10px; font-weight: 800; }
        .tn-newsletter .tn-newsletter-privacy { margin-top: 9px; margin-bottom: 0; font-size: 9px; line-height: 1.5; color: #e1d4e5; }
        .tn-image-unavailable { background: linear-gradient(135deg,#f7edf8,#f9f2eb); }
        .tn-product-image-failed { display: none !important; }
        .tn-image-unavailable img { opacity: 0 !important; }
        .tn-footer { background: #f9f6fa; border-top: 1px solid var(--tn-line); }
        .tn-footer-inner { max-width: 1480px; padding: 39px 28px 25px; margin: auto; }
        .tn-footer-grid { display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr; gap: 35px; padding-bottom: 30px; }
        .tn-footer-about { color: var(--tn-muted); font-size: 11px; line-height: 1.8; max-width: 270px; margin-top: 13px; }
        .tn-footer-title { font: 800 12px Manrope,sans-serif; margin: 0 0 14px; }
        .tn-footer-links { display: grid; gap: 10px; }
        .tn-footer-links button { border: 0; background: none; color: #766b7d; text-align: left; padding: 0; font-size: 11px; }
        .tn-footer-links button:hover { color: var(--tn-plum); }
        .tn-footer-bottom { display: flex; flex-wrap: wrap; gap: 12px; justify-content: space-between; padding-top: 18px; border-top: 1px solid #e9e1eb; color: #8c8291; font-size: 10px; }
        .tn-overlay { position: fixed; inset: 0; z-index: 60; background: rgba(35,24,40,.45); backdrop-filter: blur(3px); display: flex; justify-content: flex-end; }
        .tn-drawer { height: 100%; width: min(450px,100%); background: white; box-shadow: -10px 0 40px rgba(37,20,45,.12); display: flex; flex-direction: column; animation: tn-slide-in .2s ease-out; }
        @keyframes tn-slide-in { from { transform: translateX(20px); opacity: .7; } to { transform: translateX(0); opacity: 1; } }
        .tn-drawer-header { padding: 22px 22px 17px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--tn-line); }
        .tn-drawer-header h2 { font: 800 19px Manrope,sans-serif; margin: 0; }
        .tn-drawer-header p { color: var(--tn-muted); font-size: 11px; margin: 5px 0 0; }
        .tn-close { border: 0; background: #f6f1f7; width: 35px; height: 35px; border-radius: 10px; display: grid; place-items: center; color: var(--tn-ink); }
        .tn-drawer-body { flex: 1; min-height: 0; overflow-y: auto; padding: 18px 22px; }
        .tn-bag-item { display: grid; grid-template-columns: 78px minmax(0,1fr) auto; gap: 12px; padding: 14px 0; border-bottom: 1px solid var(--tn-line); }
        .tn-bag-item img { width: 78px; height: 91px; border-radius: 9px; object-fit: cover; background: #f4f0f4; }
        .tn-bag-name { font-size: 12px; font-weight: 700; line-height: 1.5; }
        .tn-bag-price { font-size: 12px; font-weight: 800; margin-top: 7px; }
        .tn-qty { display: inline-flex; align-items: center; border: 1px solid var(--tn-line); border-radius: 7px; margin-top: 10px; }
        .tn-qty button { border: 0; background: transparent; display: grid; place-items: center; width: 27px; height: 27px; }
        .tn-qty span { min-width: 20px; text-align: center; font-size: 11px; }
        .tn-remove { border: 0; background: none; color: #9a8e9f; padding: 4px; align-self: start; }
        .tn-drawer-footer { padding: 18px 22px 24px; border-top: 1px solid var(--tn-line); }
        .tn-summary-row { display: flex; justify-content: space-between; gap: 10px; margin-bottom: 11px; color: #766b7d; font-size: 12px; }
        .tn-summary-row strong { color: var(--tn-ink); }
        .tn-summary-total { padding-top: 12px; margin-top: 12px; border-top: 1px solid var(--tn-line); color: var(--tn-ink); font-weight: 800; font-size: 14px; }
        .tn-full { width: 100%; margin-top: 8px; }
        .tn-drawer-note { text-align: center; color: var(--tn-muted); font-size: 10px; line-height: 1.6; margin: 12px 0 0; }
        .tn-modal-overlay { position: fixed; inset: 0; z-index: 70; background: rgba(35,24,40,.53); backdrop-filter: blur(4px); padding: 22px; display: flex; align-items: center; justify-content: center; overflow-y: auto; }
        .tn-modal { width: min(780px,100%); max-height: min(90vh,900px); overflow-y: auto; position: relative; border-radius: 17px; background: white; box-shadow: 0 20px 80px rgba(20,10,30,.2); }
        .tn-modal-close { position: absolute; z-index: 2; right: 14px; top: 14px; }
        .tn-product-modal-grid { display: grid; grid-template-columns: 1fr 1fr; }
        .tn-product-modal-image { min-height: 410px; background: #f4f0f4; }
        .tn-product-modal-image img { width: 100%; height: 100%; min-height: 410px; object-fit: cover; display: block; }
        .tn-product-modal-copy { padding: 37px 28px 28px; align-self: center; }
        .tn-product-modal-copy h2 { font: 800 25px/1.25 Manrope,sans-serif; letter-spacing: -.8px; margin: 11px 0; }
        .tn-product-modal-copy p { color: var(--tn-muted); font-size: 12px; line-height: 1.8; }
        .tn-modal-price { display: flex; align-items: center; gap: 10px; font: 800 22px Manrope,sans-serif; margin: 18px 0; }
        .tn-modal-old { color: #a69ba9; font: 400 13px 'DM Sans',sans-serif; text-decoration: line-through; }
        .tn-product-perks { display: grid; gap: 12px; margin: 22px 0; color: #6c6271; font-size: 11px; }
        .tn-product-perks div { display: flex; align-items: center; gap: 8px; }
        .tn-checkout-form { padding: 27px; }
        .tn-checkout-form h2 { font: 800 23px Manrope,sans-serif; margin: 8px 0; }
        .tn-checkout-form > p { color: var(--tn-muted); font-size: 11px; line-height: 1.7; }
        .tn-checkout-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 13px; margin-top: 18px; }
        .tn-field { display: grid; gap: 7px; margin-bottom: 13px; }
        .tn-field label { color: #554a5b; font-size: 11px; font-weight: 700; }
        .tn-field input, .tn-field textarea { width: 100%; border: 1px solid #e8dfea; border-radius: 9px; padding: 12px; outline: 0; color: var(--tn-ink); background: #fff; font-size: 12px; }
        .tn-field input:focus, .tn-field textarea:focus { border-color: #ad8cbb; }
        .tn-field textarea { resize: vertical; }
        .tn-checkout-summary { background: #f9f5fa; padding: 15px; border-radius: 11px; margin: 18px 0; }
        .tn-order-success { padding: 43px 28px; text-align: center; }
        .tn-success-mark { margin: 0 auto 17px; width: 56px; height: 56px; border-radius: 50%; background: #e5f4ec; color: var(--tn-green); display: grid; place-items: center; font-size: 27px; }
        .tn-order-success h2 { font: 800 24px Manrope,sans-serif; margin: 0 0 8px; }
        .tn-order-success p { color: var(--tn-muted); font-size: 12px; line-height: 1.8; }
        .tn-order-number { background: #f8f3fa; border-radius: 9px; padding: 12px; margin: 17px auto; color: var(--tn-plum); font-size: 13px; font-weight: 800; max-width: 270px; }
        .tn-chat-button { position: fixed; right: 24px; bottom: 23px; z-index: 45; border: 0; background: var(--tn-plum); color: white; border-radius: 30px; box-shadow: 0 8px 26px rgba(77,39,91,.3); display: flex; align-items: center; gap: 10px; padding: 13px 17px; font-size: 11px; font-weight: 800; }
        .tn-chat-window { position: fixed; right: 24px; bottom: 83px; z-index: 46; width: min(355px,calc(100vw - 30px)); height: min(480px,calc(100vh - 120px)); background: white; border: 1px solid var(--tn-line); border-radius: 16px; box-shadow: 0 15px 60px rgba(45,24,55,.18); display: flex; flex-direction: column; overflow: hidden; }
        .tn-chat-header { padding: 16px; background: #4e2d59; color: white; display: flex; justify-content: space-between; align-items: center; }
        .tn-chat-header strong { font: 800 13px Manrope,sans-serif; }
        .tn-chat-header span { display: block; color: #e1d4e5; font-size: 10px; margin-top: 4px; }
        .tn-chat-header button { border: 0; background: transparent; color: white; }
        .tn-chat-messages { flex: 1; overflow-y: auto; padding: 14px; display: flex; flex-direction: column; gap: 11px; background: #fdfbfe; }
        .tn-chat-message { max-width: 88%; padding: 11px 12px; border-radius: 12px; font-size: 11px; line-height: 1.7; white-space: pre-wrap; }
        .tn-chat-message.assistant { align-self: flex-start; background: #f0e7f3; color: #514158; border-bottom-left-radius: 3px; }
        .tn-chat-message.user { align-self: flex-end; background: var(--tn-plum); color: white; border-bottom-right-radius: 3px; }
        .tn-chat-form { padding: 12px; border-top: 1px solid var(--tn-line); display: flex; gap: 7px; }
        .tn-chat-form input { flex: 1; min-width: 0; border: 1px solid var(--tn-line); border-radius: 8px; padding: 10px; font-size: 11px; }
        .tn-chat-form button { border: 0; background: var(--tn-plum); color: white; border-radius: 8px; padding: 0 12px; }
        .tn-toast { position: fixed; left: 50%; bottom: 24px; z-index: 100; transform: translateX(-50%); max-width: calc(100vw - 30px); background: #302436; color: white; border-radius: 10px; padding: 12px 17px; font-size: 11px; box-shadow: 0 8px 28px rgba(30,15,35,.2); text-align: center; }
        .tn-mobile-menu { display: none; }
        .tn-mobile-overlay { display: none; }

        .tn-orders-shortcut { position: relative; border: 1px solid #e7d8ec; border-radius: 11px; background: linear-gradient(135deg,#fbf5fd,#fff8fa); color: var(--tn-plum); font-weight: 800; white-space: nowrap; }
        .tn-orders-shortcut:hover { background: linear-gradient(135deg,#f1e4f6,#fbe7ef); transform: translateY(-1px); }
        .tn-orders-count { top: -6px; right: -5px; }
        #product-collection { scroll-margin-top: 150px; }
        .tn-nav button { transition: color .18s, border-color .18s; }
        .tn-product-card { animation: tn-rise .32s both; }
        @keyframes tn-rise { from { opacity: .65; transform: translateY(7px); } to { opacity: 1; transform: translateY(0); } }
        .tn-chat-button { right: 20px; bottom: 20px; padding: 10px 12px 10px 13px; border-radius: 18px; gap: 10px; background: linear-gradient(135deg,#663874,#9c5d9f 58%,#c36d91); box-shadow: 0 12px 35px rgba(91,44,105,.32); text-align: left; transition: transform .2s, box-shadow .2s; }
        .tn-chat-button:hover { transform: translateY(-3px); box-shadow: 0 16px 38px rgba(91,44,105,.38); }
        .tn-buddy-sparkle { width: 35px; height: 35px; display: grid; place-items: center; border-radius: 12px; color: #63366f; background: linear-gradient(135deg,#fff2bc,#ffd5e8); font-size: 21px; }
        .tn-buddy-button-copy { display: grid; gap: 3px; }
        .tn-buddy-button-copy strong { font: 800 11px Manrope,sans-serif; }
        .tn-buddy-button-copy small { color: #f0e2f4; font-size: 9px; }
        .tn-buddy-chat-icon { width: 29px; height: 29px; display: grid; place-items: center; border: 1px solid rgba(255,255,255,.3); border-radius: 50%; }
        .tn-chat-window { border-radius: 21px; box-shadow: 0 25px 80px rgba(48,25,58,.25); border-color: #eadced; }
        .tn-chat-header { padding: 17px; gap: 10px; background: linear-gradient(125deg,#4c2859,#80508f 62%,#b85e7c); }
        .tn-buddy-avatar { flex: 0 0 39px; height: 39px; display: grid; place-items: center; color: #67386f; background: linear-gradient(135deg,#fff2bc,#ffd5e8); border-radius: 13px; font-size: 23px; }
        .tn-buddy-title-copy { flex: 1; }
        .tn-buddy-title-copy strong { font: 800 14px Manrope,sans-serif; }
        .tn-buddy-title-copy span { display: block; color: #f1e4f5; font-size: 9px; margin-top: 4px; }
        .tn-chat-messages { gap: 12px; background: radial-gradient(circle at 100% 0%,#f8eef9 0%,#fffafd 44%,#fff 100%); }
        .tn-chat-message-wrap { display: flex; flex-direction: column; gap: 7px; }
        .tn-chat-message-wrap.user { align-items: flex-end; }
        .tn-buddy-suggestions { display: flex; gap: 6px; flex-wrap: wrap; padding: 10px 12px 4px; background: #fff; border-top: 1px solid #f1e7f3; }
        .tn-buddy-suggestions button { border: 1px solid #e6d5ec; border-radius: 18px; background: linear-gradient(135deg,#fff,#fbf3fd); color: #664171; font-size: 9px; padding: 7px 9px; font-weight: 700; }
        .tn-buddy-suggestions button:hover { background: #f0e2f5; border-color: #cbaed6; }
        .tn-buddy-recommendations { display: grid; gap: 7px; width: 100%; }
        .tn-buddy-product { display: grid; grid-template-columns: minmax(0,1fr) 30px; gap: 6px; align-items: center; padding: 6px; border: 1px solid #eee2f1; border-radius: 11px; background: white; }
        .tn-buddy-product-open { min-width: 0; display: flex; align-items: center; gap: 9px; text-align: left; border: 0; padding: 0; background: transparent; color: var(--tn-ink); }
        .tn-buddy-product-open img { width: 42px; height: 48px; border-radius: 7px; object-fit: cover; background: #f4edf6; }
        .tn-buddy-product-open span { min-width: 0; display: grid; gap: 5px; }
        .tn-buddy-product-open strong { font-size: 10px; line-height: 1.35; }
        .tn-buddy-product-open small { font-size: 9px; color: var(--tn-plum); font-weight: 800; }
        .tn-buddy-add { width: 28px; height: 28px; border: 0; border-radius: 9px; background: #f1e4f5; color: #653b70; font-size: 20px; font-weight: 600; }
        .tn-buddy-add:hover { background: #e5d0ec; }
        .tn-chat-form { background: white; }
        .tn-chat-form input { border-radius: 20px; padding-left: 13px; }
        .tn-chat-form button { width: 38px; border-radius: 50%; }
        .tn-side-card { position: relative; overflow: hidden; }
        .tn-side-card:after { content: ""; position: absolute; width: 80px; height: 80px; right: -48px; top: -48px; border-radius: 50%; background: rgba(199,155,213,.08); pointer-events: none; }
        @media (max-width: 900px) { .tn-orders-shortcut { padding: 7px; font-size: 10px; gap: 5px; } .tn-orders-shortcut span:nth-child(2) { display: none; } }
        @media (max-width: 760px) { #product-collection { scroll-margin-top: 115px; } .tn-chat-button { right: 12px; bottom: 12px; padding: 8px; border-radius: 16px; } .tn-buddy-button-copy small { display: none; } .tn-buddy-sparkle { width: 31px; height: 31px; } .tn-buddy-chat-icon { display: none; } .tn-orders-shortcut { width: 34px; height: 35px; justify-content: center; } .tn-orders-shortcut span:nth-child(2) { display: none; } }

        /* Extra polish: richer surfaces, clearer hierarchy, and softer motion. */
        .tn-side-card, .tn-product-card, .tn-newsletter, .tn-hero { box-shadow: 0 8px 26px rgba(58, 35, 67, .045); }
        .tn-side-card { border-color: #eee5f1; background: linear-gradient(155deg,#fff 0%,#fdf9fe 100%); box-shadow: 0 10px 30px rgba(63,35,72,.065); transition: transform .2s, box-shadow .2s; }
        .tn-side-card:hover { box-shadow: 0 14px 32px rgba(63,35,72,.09); }
        .tn-left-sidebar .tn-side-card:first-child { border-top: 3px solid #8b6197; }
        .tn-right-sidebar { display: none !important; }
        .tn-layout { grid-template-columns: 230px minmax(0, 1fr) !important; }
        .tn-left-sidebar { position: sticky; top: 112px; align-self: start; max-height: calc(100vh - 128px); overflow-y: auto; overscroll-behavior: contain; scrollbar-width: thin; scrollbar-color: #d8c3e0 transparent; padding: 2px 5px 12px 2px; }
        .tn-left-sidebar::-webkit-scrollbar { width: 5px; }
        .tn-left-sidebar::-webkit-scrollbar-thumb { background: #d8c3e0; border-radius: 99px; }
        .tn-left-sidebar .tn-side-card { border-radius: 16px; padding: 17px 14px; }
        .tn-left-sidebar .tn-side-title { color: #5c3868; letter-spacing: .7px; font-size: 11px; }
        .tn-left-sidebar .tn-category-button { min-height: 39px; padding: 10px 11px; border: 1px solid transparent; transition: background .18s, border-color .18s, transform .18s; }
        .tn-left-sidebar .tn-category-button:hover { border-color: #eadbed; transform: translateX(2px); }
        .tn-left-sidebar .tn-category-button.active { border-color: #e5d3eb; background: linear-gradient(100deg,#f4e9f8,#fff4f7); box-shadow: inset 3px 0 #8b6197; }
        .tn-mini-banner { background: linear-gradient(135deg,#f2e7f5,#fcecf2); border: 1px solid #eadbed; box-shadow: inset 0 1px 0 rgba(255,255,255,.8); }
        .tn-hero { background: linear-gradient(125deg, #f5eaf7 0%, #eee2f2 54%, #f9e9ef 100%); }
        .tn-hero-copy { position: relative; }
        .tn-hero-copy:before { content: ""; position: absolute; width: 155px; height: 155px; left: -65px; bottom: -95px; border-radius: 50%; background: rgba(255,255,255,.32); pointer-events: none; }
        .tn-primary { box-shadow: 0 5px 14px rgba(82, 43, 96, .12); }
        .tn-primary:hover { background: var(--tn-plum-dark); transform: translateY(-1px); }
        .tn-product-card { transition: transform .2s ease, box-shadow .2s ease; border-radius: 13px; }
        .tn-product-card:hover { transform: translateY(-3px); }
        .tn-product-image { box-shadow: inset 0 0 0 1px rgba(70,40,80,.025); }
        .tn-product-image img { transition: transform .35s ease; }
        .tn-product-card:hover .tn-product-image img { transform: scale(1.035); }
        .tn-nav button { white-space: nowrap; }
        .tn-order-list { display: grid; gap: 14px; }
        .tn-order-item-clickable { width: 100%; border: 0; border-radius: 10px; background: #fff; padding: 7px; text-align: left; color: inherit; transition: background .18s, transform .18s; }
        .tn-order-item-clickable:hover { background: #f6eff8; transform: translateX(2px); }
        .tn-order-item-copy { display: grid; gap: 3px; min-width: 0; }
        .tn-order-item-name { display: block; }
        .tn-order-item-meta { display: block; }
        .tn-order-details-button { width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; border: 1px solid #e6d7eb; background: #fff; color: var(--tn-plum); border-radius: 9px; margin-top: 12px; padding: 11px; font-size: 11px; font-weight: 800; }
        .tn-order-details-button:hover { background: #f5edf8; border-color: #cdb5d7; }
        .tn-order-detail-modal { width: min(720px, 100%); }
        .tn-order-detail-content { padding: 30px; }
        .tn-order-detail-content h2 { font: 800 25px Manrope,sans-serif; letter-spacing: -.8px; margin: 7px 0 18px; }
        .tn-order-detail-content h3 { font: 800 13px Manrope,sans-serif; margin: 22px 0 12px; }
        .tn-order-detail-banner { display: grid; gap: 8px; padding: 15px; border: 1px solid #eaddec; background: linear-gradient(130deg,#f7eff9,#fff7fa); border-radius: 13px; }
        .tn-order-detail-banner strong { color: var(--tn-plum); font-size: 14px; }
        .tn-order-detail-banner > span:last-child { color: var(--tn-muted); font-size: 11px; }
        .tn-order-detail-items { display: grid; gap: 8px; }
        .tn-order-detail-item { width: 100%; display: grid; grid-template-columns: 64px minmax(0,1fr) auto; gap: 12px; align-items: center; padding: 10px; text-align: left; color: var(--tn-ink); background: white; border: 1px solid var(--tn-line); border-radius: 11px; }
        .tn-order-detail-item:hover { background: #fcf7fd; border-color: #d8c4e0; }
        .tn-order-detail-item img { width: 64px; height: 72px; object-fit: cover; border-radius: 8px; background: #f4edf6; }
        .tn-order-detail-item-copy { min-width: 0; display: grid; gap: 5px; }
        .tn-order-detail-item-copy strong { font-size: 12px; }
        .tn-order-detail-item-copy span { color: var(--tn-muted); font-size: 10px; line-height: 1.5; }
        .tn-order-detail-item > strong { font-size: 12px; white-space: nowrap; }
        .tn-order-detail-summary { display: grid; gap: 12px; border: 1px solid var(--tn-line); background: #fcf9fd; border-radius: 12px; padding: 15px; margin-top: 18px; }
        .tn-order-detail-summary > div { display: flex; justify-content: space-between; gap: 20px; align-items: flex-start; }
        .tn-order-detail-summary span { color: var(--tn-muted); font-size: 11px; }
        .tn-order-detail-summary strong { max-width: 65%; text-align: right; font-size: 11px; line-height: 1.7; overflow-wrap: anywhere; }
        .tn-order-detail-summary .tn-order-detail-total { border-top: 1px solid var(--tn-line); padding-top: 12px; }
        .tn-order-detail-summary .tn-order-detail-total strong { color: var(--tn-plum); font: 800 20px Manrope,sans-serif; }
        .tn-order-card { border: 1px solid #e9deed; border-radius: 14px; padding: 16px; background: linear-gradient(145deg, #fff 0%, #fcf8fd 100%); box-shadow: 0 6px 18px rgba(60,35,68,.04); }
        .tn-order-card-top { display: flex; justify-content: space-between; gap: 10px; align-items: flex-start; }
        .tn-order-card-number { color: var(--tn-plum); font-size: 12px; font-weight: 800; letter-spacing: .2px; }
        .tn-order-status { display: inline-flex; align-items: center; gap: 5px; background: #eaf6ef; color: #2d7757; padding: 6px 8px; border-radius: 20px; font-size: 9px; font-weight: 800; white-space: nowrap; }
        .tn-order-date { margin-top: 5px; color: var(--tn-muted); font-size: 10px; }
        .tn-order-items { display: grid; gap: 10px; margin: 15px 0; }
        .tn-order-item { display: grid; grid-template-columns: 48px minmax(0,1fr) auto; gap: 10px; align-items: center; }
        .tn-order-item img { width: 48px; height: 56px; object-fit: cover; border-radius: 8px; background: #f3edf5; }
        .tn-order-item-name { font-size: 11px; font-weight: 700; line-height: 1.45; }
        .tn-order-item-meta { margin-top: 3px; color: var(--tn-muted); font-size: 10px; }
        .tn-order-item-price { font-size: 11px; font-weight: 800; white-space: nowrap; }
        .tn-order-card-bottom { display: flex; justify-content: space-between; align-items: center; gap: 12px; border-top: 1px solid #eee5f1; padding-top: 12px; font-size: 11px; color: var(--tn-muted); }
        .tn-order-card-bottom strong { color: var(--tn-ink); font-size: 15px; }
        .tn-orders-summary { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 10px; margin-bottom: 16px; }
        .tn-orders-stat { padding: 14px; border-radius: 12px; background: #f4edf7; }
        .tn-orders-stat:nth-child(2) { background: #fbecf1; }
        .tn-orders-stat span { display: block; font-size: 10px; color: var(--tn-muted); margin-bottom: 5px; }
        .tn-orders-stat strong { display: block; color: var(--tn-plum-dark); font: 800 20px Manrope,sans-serif; }

        @media (min-width: 1200px) {
          .tn-product-grid { grid-template-columns: repeat(3,minmax(0,1fr)); gap: 24px 18px; }
          .tn-main { padding-top: 30px; }
        }
        @media (max-width: 1120px) {
          .tn-layout { grid-template-columns: 185px minmax(0,1fr); }
          .tn-right-sidebar { display: none !important; }
          .tn-product-grid { grid-template-columns: repeat(3,minmax(0,1fr)); }
          .tn-header-inner { grid-template-columns: 185px minmax(150px,1fr) auto; gap: 15px; }
        }
        @media (max-width: 760px) {
          .tn-promo { font-size: 9px; padding: 8px 10px; }
          .tn-header-inner { padding: 12px 15px; grid-template-columns: auto minmax(0,1fr) auto; gap: 10px; }
          .tn-logo-name { font-size: 17px; }
          .tn-header-actions { gap: 0; }
          .tn-icon-label { padding: 7px; }
          .tn-header-actions .tn-account-label { display: none; }
          .tn-search { height: 39px; padding: 0 10px; }
          .tn-search input { font-size: 11px; }
          .tn-icon-button { width: 35px; height: 35px; }
          .tn-nav { padding: 0 15px; gap: 20px; overflow-x: auto; min-height: 39px; }
          .tn-nav button { flex-shrink: 0; height: 39px; font-size: 11px; }
          .tn-nav-note { display: none; }
          .tn-main { padding: 18px 15px 45px; }
          .tn-breadcrumb { margin-bottom: 14px; }
          .tn-layout { display: block; }
          .tn-left-sidebar { display: none; position: static; top: auto; max-height: none; overflow: visible; padding: 0; }
          .tn-left-sidebar.mobile-open { display: block; position: fixed; z-index: 55; inset: 0 auto 0 0; width: min(300px,85vw); max-height: 100dvh; top: 0; overflow-y: auto; background: white; padding: 20px 16px; box-shadow: 10px 0 35px rgba(30,20,35,.15); }
          .tn-mobile-overlay.show { display: block; position: fixed; inset: 0; z-index: 54; background: rgba(35,24,40,.4); }
          .tn-mobile-menu { display: grid; }
          .tn-hero { min-height: 190px; grid-template-columns: 1.15fr .85fr; margin-bottom: 23px; }
          .tn-hero-copy { padding: 22px 17px; }
          .tn-hero h1 { font-size: 26px; letter-spacing: -1.2px; }
          .tn-hero p { font-size: 10px; margin-bottom: 13px; }
          .tn-primary { padding: 10px 12px; font-size: 10px; }
          .tn-hero-image { min-height: 190px; }
          .tn-collection-heading h2 { font-size: 19px; }
          .tn-collection-heading p { font-size: 10px; }
          .tn-sort { max-width: 135px; padding: 9px 7px; font-size: 10px; }
          .tn-product-grid { grid-template-columns: repeat(2,minmax(0,1fr)); gap: 20px 12px; }
          .tn-product-image { border-radius: 10px; }
          .tn-product-tag { left: 7px; top: 7px; font-size: 7px; padding: 5px 6px; }
          .tn-wish-button { right: 6px; top: 6px; width: 29px; height: 29px; }
          .tn-quick-add { display: none; }
          .tn-mobile-add { display: inline-flex; align-items: center; justify-content: center; gap: 5px; width: 100%; margin-top: 9px; border: 1px solid #e6dbe9; background: #fbf7fc; color: var(--tn-plum); border-radius: 8px; padding: 9px 4px; font-size: 10px; font-weight: 800; }
          .tn-product-info { padding-top: 9px; }
          .tn-product-name { font-size: 11px; }
          .tn-product-price { font-size: 11px; }
          .tn-rating { font-size: 9px; }
          .tn-footer-inner { padding: 30px 16px 20px; }
          .tn-footer-grid { grid-template-columns: repeat(2,minmax(0,1fr)); gap: 25px 18px; }
          .tn-footer-about { font-size: 10px; }
          .tn-footer-title { font-size: 11px; }
          .tn-footer-links button { font-size: 10px; }
          .tn-chat-button { right: 14px; bottom: 14px; padding: 11px 14px; }
          .tn-chat-window { right: 12px; bottom: 70px; }
        }
        @media (max-width: 420px) {
          .tn-header-inner { grid-template-columns: auto minmax(0,1fr) auto; gap: 6px; }
          .tn-logo { gap: 5px; }
          .tn-logo-name { font-size: 14px; letter-spacing: -.6px; }
          .tn-search { padding: 0 7px; gap: 6px; }
          .tn-search input { font-size: 10px; }
          .tn-header-actions .tn-icon-button { width: 30px; height: 34px; }
          .tn-hero { grid-template-columns: 1.25fr .75fr; min-height: 180px; }
          .tn-hero-copy { padding: 16px 12px; }
          .tn-hero h1 { font-size: 22px; }
          .tn-hero p { font-size: 9px; }
          .tn-eyebrow { font-size: 8px; }
          .tn-hero-image { min-height: 180px; }
          .tn-collection-heading { align-items: start; }
          .tn-collection-heading h2 { font-size: 17px; }
          .tn-sort { max-width: 120px; }
          .tn-modal-overlay { padding: 10px; }
          .tn-product-modal-grid { grid-template-columns: 1fr; }
          .tn-order-detail-content { padding: 22px 17px; }
          .tn-order-detail-item { grid-template-columns: 52px minmax(0,1fr); }
          .tn-order-detail-item img { width: 52px; height: 60px; }
          .tn-order-detail-item > strong { grid-column: 2; text-align: left; }
          .tn-order-detail-summary > div { gap: 12px; }
          .tn-product-modal-image, .tn-product-modal-image img { min-height: 0; height: 240px; }
          .tn-product-modal-copy { padding: 22px; }
          .tn-product-modal-copy h2 { font-size: 21px; }
          .tn-checkout-form { padding: 22px 18px; }
          .tn-checkout-grid { grid-template-columns: 1fr; gap: 0; }
          .tn-footer-grid { gap: 22px 12px; }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; transition-duration: .01ms !important; }
        }
      `}</style>

      <header className="tn-header">
        <div className="tn-header-inner">
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <button
              className="tn-icon-button tn-mobile-menu"
              onClick={() => setMobileMenu(true)}
              aria-label="Open categories"
            >
              <Icon name="menu" />
            </button>
            <button className="tn-logo" onClick={() => { clearFilters(); window.scrollTo({ top: 0, behavior: "smooth" }); }} aria-label="TrendNest home">
              <span className="tn-logo-name">trend<span>nest</span></span>
            </button>
          </div>

          <label className="tn-search">
            <Icon name="search" size={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products, styles, and more..."
              aria-label="Search products"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                style={{ border: 0, background: "none", padding: 0, color: "#817487" }}
                aria-label="Clear search"
              >
                <Icon name="close" size={16} />
              </button>
            )}
          </label>

          <div className="tn-header-actions">
            <button className="tn-icon-button" onClick={openWishlist} aria-label="View wishlist">
              <Icon name="heart" />
              {wishlist.length > 0 && <span className="tn-count">{wishlist.length}</span>}
            </button>
            <button
              className="tn-icon-button"
              onClick={() => setActivePanel("bag")}
              aria-label="Open shopping bag"
            >
              <Icon name="bag" />
              {bagCount > 0 && <span className="tn-count">{bagCount}</span>}
            </button>
            <button
              className="tn-icon-label tn-orders-shortcut"
              onClick={() => setActivePanel("orders")}
              aria-label="Open My Orders"
            >
              <span aria-hidden="true">▤</span>
              <span>My Orders</span>
              {orders.length > 0 && <span className="tn-count tn-orders-count">{orders.length}</span>}
            </button>
            <button
              className="tn-icon-label tn-account-label"
              onClick={() => setActivePanel("account")}
              aria-label="Open account"
            >
              <Icon name="user" size={19} />
              <span>Account</span>
            </button>
          </div>
        </div>

        <nav className="tn-nav" aria-label="Main navigation">
          {CATEGORIES.map((item) => (
            <button
              key={item}
              className={category === item && !wishlistOnly ? "active" : ""}
              onClick={() => openCategory(item)}
            >
              {item}
            </button>
          ))}
          <button onClick={() => { setSaleOnly(true); setWishlistOnly(false); scrollToCollection(); }}>
            Sale & offers
          </button>
          <button onClick={() => setActivePanel("orders")}>My Orders{orders.length > 0 ? ` (${orders.length})` : ""}</button>
          <div className="tn-nav-spacer" />
        </nav>
      </header>

      <main className="tn-main">
        <div className="tn-layout">
          <aside className={`tn-sidebar tn-left-sidebar ${mobileMenu ? "mobile-open" : ""}`}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} className="tn-mobile-menu-heading">
              <h3 className="tn-side-title">SHOP BY CATEGORY</h3>
              <button
                className="tn-close"
                onClick={() => setMobileMenu(false)}
                aria-label="Close categories"
                style={{ display: mobileMenu ? "grid" : "none", marginBottom: 14 }}
              >
                <Icon name="close" size={17} />
              </button>
            </div>

            <section className="tn-side-card">
              <div className="tn-category-list">
                {CATEGORIES.map((item) => {
                  const count = item === "All products"
                    ? catalogue.length
                    : catalogue.filter((product) => product.category === item).length;
                  return (
                    <button
                      key={item}
                      className={`tn-category-button ${category === item && !wishlistOnly ? "active" : ""}`}
                      onClick={() => openCategory(item)}
                    >
                      <span>{item}</span>
                      <span className="tn-category-count">{count}</span>
                    </button>
                  );
                })}
                <button
                  className={`tn-category-button ${wishlistOnly ? "active" : ""}`}
                  onClick={openWishlist}
                >
                  <span>My wishlist</span>
                  <span className="tn-category-count">{wishlist.length}</span>
                </button>
              </div>

              <div className="tn-filter-block">
                <div className="tn-filter-head">
                  <span>Price range</span>
                  <button className="tn-reset" onClick={() => setMaxPrice(MAX_PRICE_FILTER)}>Reset</button>
                </div>
                <input
                  className="tn-range"
                  type="range"
                  min="0"
                  max={MAX_PRICE_FILTER}
                  step="100"
                  value={maxPrice}
                  onChange={(event) => setMaxPrice(Number(event.target.value))}
                  aria-label="Maximum price"
                />
                <div className="tn-range-labels">
                  <span>₹0</span>
                  <strong>Up to {money(maxPrice)}</strong>
                </div>
              </div>

              <div className="tn-filter-block">
                <div className="tn-filter-head">
                  <span>Offers</span>
                </div>
                <label className="tn-check-row">
                  <input
                    type="checkbox"
                    checked={saleOnly}
                    onChange={(event) => setSaleOnly(event.target.checked)}
                  />
                  Discounted products only
                </label>
              </div>

              <div className="tn-filter-block">
                <div className="tn-filter-head">
                  <span>Quick filters</span>
                  <button className="tn-reset" onClick={clearFilters}>Clear all</button>
                </div>
                <button
                  className="tn-category-button"
                  onClick={() => setSort("rating")}
                >
                  <span>Top rated</span>
                  <span>★</span>
                </button>
                <button
                  className="tn-category-button"
                  onClick={() => setSort("price-low")}
                >
                  <span>Lowest price</span>
                  <Icon name="arrow" size={14} />
                </button>
                <button
                  className="tn-category-button"
                  onClick={() => setSort("name")}
                >
                  <span>Name A–Z</span>
                  <Icon name="arrow" size={14} />
                </button>
              </div>
            </section>

            <section className="tn-mini-banner">
              <div className="tn-mini-label">THE TRENDNEST EDIT</div>
              <h3>Good style.<br />Everyday prices.</h3>
              <p>Discover thoughtful picks that fit your style and your budget.</p>
              <button onClick={() => { clearFilters(); setMobileMenu(false); }}>
                Explore collection <Icon name="arrow" size={13} />
              </button>
            </section>
          </aside>

          <div className={`tn-mobile-overlay ${mobileMenu ? "show" : ""}`} onClick={() => setMobileMenu(false)} />

          <section className="tn-center">
            <div className="tn-hero">
              <div className="tn-hero-copy">
                <div className="tn-eyebrow">THE NEW EVERYDAY</div>
                <h1>Find your kind of <span style={{ color: "var(--tn-plum)" }}>style.</span></h1>
                <p>Fresh essentials, timeless favourites, and little things that make a difference.</p>
                <button className="tn-primary" onClick={() => openCategory("All products")}>
                  Explore collection <Icon name="arrow" size={15} />
                </button>
              </div>
              <div className="tn-hero-image">
                <img
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85"
                  alt="Fashion collection inspiration"
                />
              </div>
            </div>

            <div className="tn-collection-heading" id="product-collection">
              <div>
                <div className="tn-eyebrow">
                  {wishlistOnly ? "YOUR PERSONAL EDIT" : category === "All products" ? "CURATED FOR YOU" : category.toUpperCase()}
                </div>
                <h2>
                  {wishlistOnly ? "Your wishlist" : category === "All products" ? "Everyday favourites" : category}
                </h2>
                <p>{filteredProducts.length.toLocaleString()} products to discover{catalogueLoading ? " · curating trending finds across every category…" : ` · ${catalogue.length.toLocaleString()} products in the catalogue`}</p>
                <p style={{ marginTop: 5 }}>Demo catalogue: prices are illustrative and are not live store inventory.</p>
              </div>

              <select
                className="tn-sort"
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                aria-label="Sort products"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
                <option value="rating">Top rated</option>
                <option value="name">Name A–Z</option>
              </select>
            </div>

            {(query || saleOnly || maxPrice < MAX_PRICE_FILTER || wishlistOnly) && (
              <div className="tn-active-filters">
                {query && <span className="tn-chip">Search: {query}</span>}
                {saleOnly && <span className="tn-chip">On sale</span>}
                {maxPrice < MAX_PRICE_FILTER && <span className="tn-chip">Up to {money(maxPrice)}</span>}
                {wishlistOnly && <span className="tn-chip">Wishlist</span>}
                <button className="tn-reset" onClick={clearFilters}>Clear filters ×</button>
              </div>
            )}

            {filteredProducts.length > 0 ? (
              <div className="tn-product-grid">
                {filteredProducts.map((product) => {
                  const saved = wishlist.includes(product.id);
                  return (
                    <article className="tn-product-card" key={product.id}>
                      <div className="tn-product-image" onClick={() => setSelectedProduct(product)}>
                        <span className="tn-product-tag">{product.tag}</span>
                        <button
                          className={`tn-wish-button ${saved ? "saved" : ""}`}
                          onClick={(event) => {
                            event.stopPropagation();
                            toggleWishlist(product);
                          }}
                          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
                        >
                          <Icon name="heart" size={17} />
                        </button>
                        <img src={product.image} alt={product.name} loading="lazy" onError={(event) => { event.currentTarget.closest(".tn-product-card, .tn-buddy-product-open")?.classList.add("tn-product-image-failed"); }} />
                        <button
                          className="tn-quick-add"
                          onClick={(event) => {
                            event.stopPropagation();
                            addToBag(product);
                          }}
                        >
                          + ADD TO BAG
                        </button>
                      </div>

                      <div className="tn-product-info">
                        <div className="tn-product-category">{product.category} · {product.color}</div>
                        <button className="tn-product-name" onClick={() => setSelectedProduct(product)}>
                          {product.name}
                        </button>
                        <div className="tn-product-bottom">
                          <div className="tn-product-price">
                            <span>{money(product.price)}</span>
                            <span className="tn-old-price">{money(product.oldPrice)}</span>
                          </div>
                          <div className="tn-rating"><span>★</span> {product.rating}</div>
                        </div>
                        <button className="tn-mobile-add" onClick={() => addToBag(product)}>
                          <Icon name="plus" size={13} /> Add to bag
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="tn-empty">
                <Icon name="search" size={30} />
                <h3>No products found</h3>
                <p>Try another search or clear some filters to discover more products.</p>
                <button className="tn-primary" onClick={clearFilters}>Clear all filters</button>
              </div>
            )}
          </section>

          <aside className="tn-sidebar tn-right-sidebar">
            <section className="tn-side-card">
              <h3 className="tn-side-title">THE TRENDNEST PROMISE</h3>
              <div className="tn-benefit">
                <div className="tn-benefit-icon"><Icon name="truck" size={17} /></div>
                <div><strong>Simple delivery</strong><span>Delivery details at checkout</span></div>
              </div>
              <div className="tn-benefit">
                <div className="tn-benefit-icon"><Icon name="shield" size={17} /></div>
                <div><strong>Shop with confidence</strong><span>Clear prices, no hidden fees in this demo</span></div>
              </div>
              <div className="tn-benefit">
                <div className="tn-benefit-icon"><Icon name="heart" size={17} /></div>
                <div><strong>Your personal edit</strong><span>Save favourites for later</span></div>
              </div>
            </section>

            <section className="tn-side-card">
              <h3 className="tn-side-title">TRENDING RIGHT NOW</h3>
              {catalogue.filter((product) => ["BESTSELLER", "TRENDING"].includes(product.tag))
                .slice(0, 3)
                .map((product) => (
                  <div
                    className="tn-trend-link"
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") setSelectedProduct(product);
                    }}
                  >
                    <img src={product.image} alt="" loading="lazy" onError={(event) => { event.currentTarget.closest(".tn-product-card, .tn-buddy-product-open")?.classList.add("tn-product-image-failed"); }} />
                    <div>
                      <strong>{product.name}</strong>
                      <span>{money(product.price)}</span>
                    </div>
                  </div>
                ))}
            </section>

            <section className="tn-newsletter">
              <h3>A little more lovely.</h3>
              <p>Get updates on new finds, fresh edits, and the things worth discovering.</p>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  const form = event.currentTarget;
                  const emailField = form.elements.namedItem("email");
                  const email = String(emailField?.value || "").trim().toLowerCase();
                  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    setToast("Please enter a valid email address.");
                    emailField?.focus();
                    return;
                  }
                  const savedEmails = readStorage("trendnest-newsletter", []);
                  if (savedEmails.includes(email)) {
                    setToast("You’re already on the TrendNest list ✨");
                    form.reset();
                    return;
                  }
                  try {
                    localStorage.setItem("trendnest-newsletter", JSON.stringify([...savedEmails, email]));
                    setToast("You’re in! Welcome to the TrendNest community ✨");
                    form.reset();
                  } catch {
                    setToast("Thanks for joining TrendNest! Your browser could not save this locally.");
                  }
                }}
              >
                <input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="Your email address" aria-label="Newsletter email" />
                <button type="submit" aria-label="Join newsletter">Join</button>
              </form>
              <p className="tn-newsletter-privacy">Demo signup saved on this device. No email is sent until a newsletter service is connected.</p>
            </section>
          </aside>
        </div>
      </main>

      <footer className="tn-footer">
        <div className="tn-footer-inner">
          <div className="tn-footer-grid">
            <div>
              <button className="tn-logo" onClick={clearFilters}>
                <span className="tn-logo-name">trend<span>nest</span></span>
              </button>
              <p className="tn-footer-about">
                Your place for everyday essentials, considered details, and style that feels like you.
                Discover something good, one find at a time.
              </p>
            </div>
            <div>
              <h4 className="tn-footer-title">Explore</h4>
              <div className="tn-footer-links">
                {CATEGORIES.map((item) => (
                  <button key={item} onClick={() => openCategory(item)}>{item}</button>
                ))}
                <button onClick={openWishlist}>My wishlist</button>
              </div>
            </div>
            <div>
              <h4 className="tn-footer-title">Your account</h4>
              <div className="tn-footer-links">
                <button onClick={() => setActivePanel("account")}>Account details</button>
                <button onClick={() => setActivePanel("bag")}>Shopping bag</button>
                <button onClick={() => setActivePanel("orders")}>My Orders</button>
                <button onClick={() => setChatOpen(true)}>Contact & support</button>
              </div>
            </div>
            <div>
              <h4 className="tn-footer-title">Good to know</h4>
              <div className="tn-footer-links">
                <button onClick={() => setToast("This demo supports Cash on Delivery only.")}>Payment options</button>
                <button onClick={() => setToast("Shipping policy information needs to be configured for your store.")}>Shipping information</button>
                <button onClick={() => setToast("Return policy information needs to be configured for your store.")}>Returns & exchanges</button>
              </div>
            </div>
          </div>
          <div className="tn-footer-bottom">
            <span>© {new Date().getFullYear()} TrendNest. All rights reserved.</span>
            <span>Made for your everyday.</span>
          </div>
        </div>
      </footer>

      <button className={`tn-chat-button ${chatOpen ? "is-open" : ""}`} onClick={() => setChatOpen((open) => !open)} aria-label="Open Shopping Buddy">
        <span className="tn-buddy-sparkle" aria-hidden="true">✦</span>
        <span className="tn-buddy-button-copy"><strong>Shopping Buddy</strong><small>Your personal shopping helper</small></span>
        <span className="tn-buddy-chat-icon"><Icon name="chat" size={18} /></span>
      </button>

      {chatOpen && (
        <section className="tn-chat-window" aria-label="TrendNest chat assistant">
          <div className="tn-chat-header">
            <div>
              <div className="tn-buddy-avatar">✦</div>
              <div className="tn-buddy-title-copy"><strong>Shopping Buddy</strong><span>Your cheerful shopping sidekick · Usually instant</span></div>
            </div>
            <button onClick={() => setChatOpen(false)} aria-label="Close chat">
              <Icon name="close" size={19} />
            </button>
          </div>
          <div className="tn-chat-messages">
            {chatMessages.map((message, index) => (
              <div className={`tn-chat-message-wrap ${message.role}`} key={`${index}-${message.role}`}>
                <div className={`tn-chat-message ${message.role}`}>{message.text}</div>
                {message.products?.length > 0 && <div className="tn-buddy-recommendations">{message.products.map((product) => (
                  <div className="tn-buddy-product" key={`${index}-${product.id}`}>
                    <button className="tn-buddy-product-open" onClick={() => { setSelectedProduct(product); setChatOpen(false); }}>
                      <img src={product.image} alt={product.name} loading="lazy" onError={(event) => { event.currentTarget.closest(".tn-product-card, .tn-buddy-product-open")?.classList.add("tn-product-image-failed"); }} />
                      <span><strong>{product.name}</strong><small>{money(product.price)} · ★ {product.rating}</small></span>
                    </button>
                    <button className="tn-buddy-add" onClick={() => addToBag(product)} aria-label={`Add ${product.name} to bag`}>+</button>
                  </div>
                ))}</div>}
              </div>
            ))}
            <div ref={chatMessagesEndRef} />
          </div>
          <div className="tn-buddy-suggestions" aria-label="Shopping Buddy suggestions">
            {["Find gifts 🎁", "Under ₹500 💸", "Build an outfit ✨", "Tech finds 🎧", "Kids & baby 🧸", "My orders 📦"].map((prompt) => <button key={prompt} onClick={() => sendBuddyMessage(prompt)}>{prompt}</button>)}
          </div>
          <form className="tn-chat-form" onSubmit={submitChat}>
            <input
              value={chatInput}
              onChange={(event) => setChatInput(event.target.value)}
              placeholder="Ask us anything..."
              aria-label="Chat message"
            />
            <button type="submit" aria-label="Send message"><Icon name="arrow" size={17} /></button>
          </form>
        </section>
      )}

      {activePanel && (
        <div className="tn-overlay" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setActivePanel("");
        }}>
          <section className="tn-drawer" aria-label={activePanel === "bag" ? "Shopping bag" : activePanel === "orders" ? "My orders" : "Account"}>
            <div className="tn-drawer-header">
              <div>
                <h2>{activePanel === "bag" ? "Your shopping bag" : activePanel === "orders" ? "My orders" : "Your account"}</h2>
                <p>{activePanel === "bag" ? `${bagCount} ${bagCount === 1 ? "item" : "items"} in your bag` : activePanel === "orders" ? `${orders.length} saved ${orders.length === 1 ? "order" : "orders"} · Order history on this device` : "Your TrendNest shopping space"}</p>
              </div>
              <button className="tn-close" onClick={() => setActivePanel("")} aria-label="Close panel">
                <Icon name="close" />
              </button>
            </div>

            {activePanel === "bag" ? (
              <>
                <div className="tn-drawer-body">
                  {bag.length === 0 ? (
                    <div className="tn-empty" style={{ marginTop: 15 }}>
                      <Icon name="bag" size={28} />
                      <h3>Your bag is taking a break</h3>
                      <p>Find something you love and add it here.</p>
                      <button className="tn-primary" onClick={() => { setActivePanel(""); openCategory("All products"); }}>
                        Explore products
                      </button>
                    </div>
                  ) : (
                    bag.map((item) => (
                      <div className="tn-bag-item" key={item.id}>
                        <img src={item.image} alt={item.name} onError={(event) => { event.currentTarget.closest(".tn-product-card, .tn-buddy-product-open, .tn-order-item")?.classList.add("tn-product-image-failed"); }} />
                        <div>
                          <div className="tn-bag-name">{item.name}</div>
                          <div className="tn-bag-price">{money(item.price)}</div>
                          <div className="tn-qty">
                            <button onClick={() => updateQuantity(item.id, -1)} aria-label="Decrease quantity">
                              <Icon name="minus" size={13} />
                            </button>
                            <span>{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} aria-label="Increase quantity">
                              <Icon name="plus" size={13} />
                            </button>
                          </div>
                        </div>
                        <button className="tn-remove" onClick={() => setBag((current) => current.filter((entry) => entry.id !== item.id))} aria-label={`Remove ${item.name}`}>
                          <Icon name="trash" size={16} />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {bag.length > 0 && (
                  <div className="tn-drawer-footer">
                    <div className="tn-summary-row"><span>Subtotal</span><strong>{money(bagTotal)}</strong></div>
                    <div className="tn-summary-row"><span>Shipping</span><strong>Calculated at checkout</strong></div>
                    {savedTotal > 0 && <div className="tn-summary-row" style={{ color: "var(--tn-green)" }}><span>You save</span><strong>{money(savedTotal)}</strong></div>}
                    <div className="tn-summary-row tn-summary-total"><span>Estimated total</span><strong>{money(bagTotal)}</strong></div>
                    <button className="tn-primary tn-full" onClick={() => { setActivePanel(""); setCheckoutOpen(true); }}>
                      Continue to checkout <Icon name="arrow" size={15} />
                    </button>
                    <p className="tn-drawer-note">Cash on Delivery · Demo checkout · No online payment is taken</p>
                  </div>
                )}
              </>
            ) : activePanel === "orders" ? (
              <div className="tn-drawer-body">
                <div className="tn-orders-summary">
                  <div className="tn-orders-stat"><span>Total orders</span><strong>{orders.length}</strong></div>
                  <div className="tn-orders-stat"><span>Total spent</span><strong>{money(orders.reduce((sum, order) => sum + Number(order.total || 0), 0))}</strong></div>
                </div>
                {orders.length === 0 ? (
                  <div className="tn-empty" style={{ marginTop: 8 }}>
                    <div style={{ fontSize: 30, marginBottom: 8 }}>✦</div>
                    <h3>Your story starts with a find</h3>
                    <p>Your demo orders will appear here after you complete checkout.</p>
                    <button className="tn-primary" onClick={() => { setActivePanel(""); clearFilters(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Explore products <Icon name="arrow" size={15} /></button>
                  </div>
                ) : (
                  <div className="tn-order-list">
                    {orders.map((order) => (
                      <article className="tn-order-card" key={order.orderNumber}>
                        <div className="tn-order-card-top">
                          <div>
                            <div className="tn-order-card-number">{order.orderNumber}</div>
                            <div className="tn-order-date">{order.createdAt ? new Date(order.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "Date not available"}</div>
                          </div>
                          <span className="tn-order-status">✓ Order placed</span>
                        </div>
                        <div className="tn-order-items">
                          {(order.items || []).map((item, index) => (
                            <button className="tn-order-item tn-order-item-clickable" key={`${order.orderNumber}-${item.id}-${index}`} onClick={() => {
                              const product = catalogue.find((entry) => entry.id === item.id) || {};
                              setActivePanel("");
                              setSelectedProduct({ ...product, ...item, description: item.description || product.description });
                            }} aria-label={`View product details for ${item.name}`}>
                              <img src={item.image} alt={item.name} onError={(event) => { event.currentTarget.style.opacity = "0"; }} />
                              <span className="tn-order-item-copy"><span className="tn-order-item-name">{item.name}</span><span className="tn-order-item-meta">Qty: {item.quantity} · View product details ↗</span></span>
                              <span className="tn-order-item-price">{money(Number(item.price || 0) * Number(item.quantity || 1))}</span>
                            </button>
                          ))}
                        </div>
                        <div className="tn-order-card-bottom"><span>{(order.items || []).reduce((sum, item) => sum + Number(item.quantity || 1), 0)} item(s) · Demo order</span><strong>{money(order.total || 0)}</strong></div>
                        <button className="tn-order-details-button" onClick={() => setSelectedOrder(order)}>View order details <Icon name="arrow" size={14} /></button>
                      </article>
                    ))}
                  </div>
                )}
                <p className="tn-drawer-note">Order history is stored in this browser only. Clearing browser storage can remove it. Demo orders are not sent to a real store.</p>
              </div>
            ) : (
              <div className="tn-drawer-body">
                <div className="tn-side-card">
                  <h3 className="tn-side-title">Welcome to TrendNest</h3>
                  <p style={{ color: "var(--tn-muted)", fontSize: 12, lineHeight: 1.8 }}>
                    Your wishlist and shopping bag are saved in this browser. Account registration and sign-in require a backend service.
                  </p>
                  <button className="tn-primary tn-full" onClick={() => { setActivePanel(""); openWishlist(); }}>
                    View my wishlist
                  </button>
                  <button className="tn-primary tn-full" style={{ background: "white", color: "var(--tn-plum)" }} onClick={() => setActivePanel("bag")}>
                    View my shopping bag
                  </button>
                  <button className="tn-primary tn-full" style={{ background: "white", color: "var(--tn-plum)" }} onClick={() => setActivePanel("orders")}>
                    My orders ({orders.length})
                  </button>
                  <button className="tn-primary tn-full" style={{ background: "white", color: "var(--tn-plum)" }} onClick={() => { setActivePanel(""); setChatOpen(true); }}>
                    Contact support
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      )}

      {selectedOrder && (
        <div className="tn-modal-overlay" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setSelectedOrder(null);
        }}>
          <section className="tn-modal tn-order-detail-modal" role="dialog" aria-modal="true" aria-label={`Order details ${selectedOrder.orderNumber}`}>
            <button className="tn-close tn-modal-close" onClick={() => setSelectedOrder(null)} aria-label="Close order details"><Icon name="close" /></button>
            <div className="tn-order-detail-content">
              <div className="tn-eyebrow">YOUR TRENDNEST PURCHASE</div>
              <h2>Order details</h2>
              <div className="tn-order-detail-banner"><span className="tn-order-status">✓ Order placed · Demo</span><strong>{selectedOrder.orderNumber}</strong><span>{selectedOrder.createdAt ? new Date(selectedOrder.createdAt).toLocaleString("en-IN", { dateStyle: "long", timeStyle: "short" }) : "Date not available"}</span></div>
              <h3>Items in this order</h3>
              <div className="tn-order-detail-items">
                {(selectedOrder.items || []).map((item, index) => (
                  <button className="tn-order-detail-item" key={`${selectedOrder.orderNumber}-detail-${item.id}-${index}`} onClick={() => {
                    const product = catalogue.find((entry) => entry.id === item.id) || {};
                    setSelectedOrder(null);
                    setSelectedProduct({ ...product, ...item });
                  }}>
                    <img src={item.image} alt={item.name} onError={(event) => { event.currentTarget.style.opacity = "0"; }} />
                    <span className="tn-order-detail-item-copy"><strong>{item.name}</strong><span>{item.category || catalogue.find((entry) => entry.id === item.id)?.category || "TrendNest essential"} · {item.color || catalogue.find((entry) => entry.id === item.id)?.color || "Classic"}</span><span>Quantity: {item.quantity || 1}</span></span>
                    <strong>{money(Number(item.price || 0) * Number(item.quantity || 1))}</strong>
                  </button>
                ))}
              </div>
              <div className="tn-order-detail-summary"><div><span>Payment method</span><strong>{selectedOrder.payment || "Cash on Delivery"}</strong></div><div><span>Delivery to</span><strong>{selectedOrder.customer?.name || "Customer"}<br />{selectedOrder.customer?.address || "Address not available"}{selectedOrder.customer?.city ? `, ${selectedOrder.customer.city}` : ""}{selectedOrder.customer?.pincode ? ` – ${selectedOrder.customer.pincode}` : ""}</strong></div><div className="tn-order-detail-total"><span>Order total</span><strong>{money(selectedOrder.total || 0)}</strong></div></div>
              <p className="tn-drawer-note">Demo order details are stored locally in this browser. No real payment or delivery has been initiated.</p>
            </div>
          </section>
        </div>
      )}

      {selectedProduct && (
        <div className="tn-modal-overlay" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setSelectedProduct(null);
        }}>
          <section className="tn-modal" role="dialog" aria-modal="true" aria-label={selectedProduct.name}>
            <button className="tn-close tn-modal-close" onClick={() => setSelectedProduct(null)} aria-label="Close product details">
              <Icon name="close" />
            </button>
            <div className="tn-product-modal-grid">
              <div className="tn-product-modal-image">
                <img src={selectedProduct.image} alt={selectedProduct.name} loading="lazy" onError={(event) => { event.currentTarget.style.display = "none"; }} />
              </div>
              <div className="tn-product-modal-copy">
                <div className="tn-eyebrow">{selectedProduct.category} · {selectedProduct.tag}</div>
                <h2>{selectedProduct.name}</h2>
                <div className="tn-rating"><span>★</span> {selectedProduct.rating} <span style={{ color: "var(--tn-muted)" }}>· Customer rating</span></div>
                <div className="tn-modal-price">
                  {money(selectedProduct.price)}
                  <span className="tn-modal-old">{money(selectedProduct.oldPrice)}</span>
                </div>
                <p>{selectedProduct.description || `A versatile ${String(selectedProduct.category || "everyday").toLowerCase()} pick designed to fit effortlessly into your routine. Pair it with your favourite essentials for a look that feels entirely your own.`}</p>

                <p style={{ fontWeight: 700, color: "var(--tn-ink)" }}>Colour: {selectedProduct.color}</p>
                <div className="tn-product-perks">
                  <div><Icon name="truck" size={16} /> Delivery details available at checkout</div>
                  <div><Icon name="shield" size={16} /> Secure order flow requires backend integration</div>
                  <div><Icon name="heart" size={16} /> Save it to your personal wishlist</div>
                </div>
                <button className="tn-primary tn-full" onClick={() => { addToBag(selectedProduct); setSelectedProduct(null); }}>
                  <Icon name="bag" size={17} /> Add to bag · {money(selectedProduct.price)}
                </button>
                <button
                  className="tn-primary tn-full"
                  style={{ background: "white", color: "var(--tn-plum)", marginTop: 9 }}
                  onClick={() => toggleWishlist(selectedProduct)}
                >
                  <Icon name="heart" size={17} />
                  {wishlist.includes(selectedProduct.id) ? "Remove from wishlist" : "Add to wishlist"}
                </button>
              </div>
            </div>
          </section>
        </div>
      )}

      {checkoutOpen && (
        <div className="tn-modal-overlay" onMouseDown={(event) => {
          if (event.target === event.currentTarget && !orderLoading) setCheckoutOpen(false);
        }}>
          <section className="tn-modal" style={{ width: "min(570px, 100%)" }} role="dialog" aria-modal="true" aria-label="Checkout">
            <button className="tn-close tn-modal-close" onClick={() => setCheckoutOpen(false)} disabled={orderLoading} aria-label="Close checkout">
              <Icon name="close" />
            </button>

            <form className="tn-checkout-form" onSubmit={placeOrder}>
              <div className="tn-eyebrow">ALMOST YOURS</div>
              <h2>Checkout</h2>
              <p>Enter your delivery details to create your demo order.</p>

              <div className="tn-checkout-summary">
                <div className="tn-summary-row"><span>Items ({bagCount})</span><strong>{money(bagTotal)}</strong></div>
                <div className="tn-summary-row"><span>Shipping</span><strong>₹0</strong></div>
                <div className="tn-summary-row tn-summary-total"><span>Order total</span><strong>{money(bagTotal)}</strong></div>
              </div>

              <div className="tn-field">
                <label htmlFor="tn-name">Full name</label>
                <input id="tn-name" required autoComplete="name" value={customer.name} onChange={(event) => setCustomer({ ...customer, name: event.target.value })} placeholder="Your full name" />
              </div>
              <div className="tn-checkout-grid">
                <div className="tn-field">
                  <label htmlFor="tn-email">Email address</label>
                  <input id="tn-email" type="email" required autoComplete="email" value={customer.email} onChange={(event) => setCustomer({ ...customer, email: event.target.value })} placeholder="you@example.com" />
                </div>
                <div className="tn-field">
                  <label htmlFor="tn-phone">Phone number</label>
                  <input id="tn-phone" type="tel" required autoComplete="tel" value={customer.phone} onChange={(event) => setCustomer({ ...customer, phone: event.target.value })} placeholder="Contact number" />
                </div>
              </div>
              <div className="tn-field">
                <label htmlFor="tn-address">Delivery address</label>
                <textarea id="tn-address" required rows={3} autoComplete="street-address" value={customer.address} onChange={(event) => setCustomer({ ...customer, address: event.target.value })} placeholder="House number, street, area" />
              </div>
              <div className="tn-checkout-grid">
                <div className="tn-field">
                  <label htmlFor="tn-city">City</label>
                  <input id="tn-city" required autoComplete="address-level2" value={customer.city} onChange={(event) => setCustomer({ ...customer, city: event.target.value })} placeholder="City" />
                </div>
                <div className="tn-field">
                  <label htmlFor="tn-pin">PIN code</label>
                  <input id="tn-pin" required inputMode="numeric" pattern="[0-9]{6}" maxLength={6} autoComplete="postal-code" value={customer.pincode} onChange={(event) => setCustomer({ ...customer, pincode: event.target.value })} placeholder="6-digit PIN" />
                </div>
              </div>

              <div className="tn-side-card" style={{ marginBottom: 14, padding: 13 }}>
                <div style={{ fontSize: 11, fontWeight: 700 }}>Payment method</div>
                <div style={{ fontSize: 11, color: "var(--tn-muted)", marginTop: 5 }}>Cash on Delivery (demo only)</div>
              </div>

              <button className="tn-primary tn-full" type="submit" disabled={orderLoading}>
                {orderLoading ? "Placing order..." : `Place demo order · ${money(bagTotal)}`}
              </button>
              <p>This is a frontend demonstration. It stores the order in your browser and does not contact a real store or payment provider.</p>
            </form>
          </section>
        </div>
      )}

      {orderComplete && (
        <div className="tn-modal-overlay" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setOrderComplete(null);
        }}>
          <section className="tn-modal" style={{ width: "min(480px, 100%)" }} role="dialog" aria-modal="true" aria-label="Order confirmation">
            <div className="tn-order-success">
              <div className="tn-success-mark">✓</div>
              <div className="tn-eyebrow">ORDER CREATED</div>
              <h2>Thank you, {orderComplete.customer.name.split(" ")[0]}!</h2>
              <p>Your demo order has been saved in this browser. This is not a real purchase and no payment or delivery has been initiated.</p>
              <div className="tn-order-number">Order reference: {orderComplete.orderNumber}</div>
              <div className="tn-summary-row"><span>Order total</span><strong>{money(orderComplete.total)}</strong></div>
              <div className="tn-summary-row"><span>Payment</span><strong>Cash on Delivery</strong></div>
              <button className="tn-primary tn-full" onClick={() => { setOrderComplete(null); clearFilters(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                Continue shopping <Icon name="arrow" size={15} />
              </button>
            </div>
          </section>
        </div>
      )}

      {toast && <div className="tn-toast" role="status">{toast}</div>}
    </div>
  );
}

export default App;
