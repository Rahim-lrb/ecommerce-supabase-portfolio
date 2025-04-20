import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import { FaTruck, FaUndo } from "react-icons/fa";
import supabase from "../supabaseClient";
import { useAuth } from "../contexts/authContext";
import { useCart } from "../contexts/cartContext";

export default function ProductDetails() {
  const { productId } = useParams();
  const { session } = useAuth();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [inCart, setInCart] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);

  // Fetch product data
  useEffect(() => {
    async function fetchProduct() {
      const { data, error } = await supabase
        .from("product")
        .select("*")
        .eq("id", productId)
        .single();

      if (error) {
        console.error("Error fetching product:", error);
      } else {
        setProduct(data);
      }
      setLoading(false);
    }
    fetchProduct();
  }, [productId]);

  // Check if product already in cart or wishlist
  useEffect(() => {
    if (!session?.user) return;

    async function checkStatus() {
      const { data: cartData } = await supabase
        .from("cart")
        .select("*")
        .eq("user_id", session.user.id)
        .eq("product_id", productId)
        .single();

      setInCart(!!cartData);

      const { data: wishlistData } = await supabase
        .from("wishlist")
        .select("*")
        .eq("user_id", session.user.id)
        .eq("product_id", productId)
        .single();

      setInWishlist(!!wishlistData);
    }

    checkStatus();
  }, [session, productId]);

  if (loading) return <p className="text-center mt-10">Loading product...</p>;
  if (!product) return <p className="text-center mt-10">Product not found.</p>;

  const mainImage =
    product.image_main || (product.images?.length > 0 ? product.images[0] : null);

  // Handle cart add/remove
  async function handleCartToggle() {
    if (!session?.user) return;

    if (inCart) {
      const { error } = await supabase
        .from("cart")
        .delete()
        .eq("user_id", session.user.id)
        .eq("product_id", productId);

      if (!error) setInCart(false);
      else console.error("Error removing from cart:", error);
    } else {
      const { error } = await supabase
        .from("cart")
        .insert([{ user_id: session.user.id, product_id: productId, quantity }]);

      if (!error) setInCart(true);
      else console.error("Error adding to cart:", error);
    }
  }

  // Handle wishlist add/remove
  async function handleWishlistToggle() {
    if (!session?.user) return;

    if (inWishlist) {
      const { error } = await supabase
        .from("wishlist")
        .delete()
        .eq("user_id", session.user.id)
        .eq("product_id", productId);

      if (!error) setInWishlist(false);
      else console.error("Error removing from wishlist:", error);
    } else {
      const { error } = await supabase
        .from("wishlist")
        .insert([{ user_id: session.user.id, product_id: productId }]);

      if (!error) setInWishlist(true);
      else console.error("Error adding to wishlist:", error);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-12 gap-8">
      {/* Small Images */}
      <div className="hidden md:flex flex-col gap-3 col-span-2">
        {product.images && product.images.length > 0 ? (
          product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Product View ${index + 1}`}
              className="w-[170px] h-[138px] object-cover cursor-pointer border border-gray-300 rounded-md hover:border-gray-500 transition"
            />
          ))
        ) : (
          Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="w-[170px] h-[138px] flex items-center justify-center border border-gray-300 rounded-md bg-gray-100 text-gray-500"
            >
              No Image
            </div>
          ))
        )}
      </div>

      {/* Main Image */}
      <div className="col-span-5 flex justify-center">
        {mainImage ? (
          <img
            src={mainImage}
            alt={product.name}
            className="object-contain rounded-md shadow-md border border-gray-300"
          />
        ) : (
          <div className="w-[500px] h-[600px] flex items-center justify-center border border-gray-300 bg-gray-100 text-gray-500">
            No Image
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="col-span-5">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <div className="text-yellow-500 mt-2 text-lg">
          {"★".repeat(product.rating) + "☆".repeat(5 - product.rating)}
        </div>

        <div className="flex items-center space-x-3 mt-3">
          <span className="text-primary text-2xl font-semibold">${product.price}</span>
          {product.old_price && (
            <span className="text-gray-400 line-through text-lg">${product.old_price}</span>
          )}
        </div>

        <p className="text-gray-600 mt-4">{product.description}</p>

        <hr className="my-6 border-gray-300" />

        {/* Delivery & Return */}
        <div className="border border-gray-300 rounded-md p-4 flex flex-col divide-y">
          <div className="flex items-center space-x-3 pb-3">
            <FaTruck className="text-green-600" size={24} />
            <span className="text-gray-700 font-medium">Free Delivery</span>
          </div>
          <div className="flex items-center space-x-3 pt-3">
            <FaUndo className="text-blue-600" size={24} />
            <span className="text-gray-700 font-medium">Return & Delivery</span>
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center mt-6 space-x-3">
          <label className="text-gray-700 font-medium">Quantity:</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="border border-gray-300 rounded-md p-2 w-16 text-center"
          />
        </div>

        {/* Cart Button */}
        <button
          className="bg-black text-white w-full mt-6 py-3 rounded-md transition hover:bg-gray-900"
          onClick={handleCartToggle}
        >
          {inCart ? "Remove from Cart" : "Add to Cart"}
        </button>

        {/* Wishlist Button */}
        <div className="mt-4">
          <button
            className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition"
            onClick={handleWishlistToggle}
          >
            {inWishlist ? (
              <IoHeart size={26} color="red" strokeWidth={1.5} />
            ) : (
              <IoHeartOutline size={26} strokeWidth={1.5} />
            )}
            <span>{inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
