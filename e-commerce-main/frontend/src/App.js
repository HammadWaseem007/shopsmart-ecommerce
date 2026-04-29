import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { supabase } from "./supabaseClient";

/* =========================
   HOME PAGE
========================= */
function Home({ products, addToCart }) {
  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ textAlign: "center" }}>🔥 Featured Products</h2>

      <div style={gridStyle}>
        {products.map((product) => (
          <div key={product.id} style={cardStyle}>
            <img src={product.image} alt={product.name} style={imgStyle} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>

            <button style={btnStyle} onClick={() => addToCart(product)}>
              Add to Cart 🛒
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================
   PRODUCTS PAGE
========================= */
function Products({ products, addToCart }) {
  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ textAlign: "center" }}>🛍 All Products</h2>

      <div style={gridStyle}>
        {products.map((product) => (
          <div key={product.id} style={cardStyle}>
            <img src={product.image} alt={product.name} style={imgStyle} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>

            <button style={btnStyle} onClick={() => addToCart(product)}>
              Add to Cart 🛒
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================
   CART PAGE
========================= */
function Cart({ cart }) {
  const [address, setAddress] = useState("");

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "auto" }}>
      <h2 style={{ textAlign: "center" }}>🧾 Checkout</h2>

      {/* ITEMS */}
      <div>
        <h3>🛒 Order Summary</h3>

        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cart.map((item, index) => (
            <div key={index} style={itemStyle}>
              <span>{item.name}</span>
              <span>${item.price}</span>
            </div>
          ))
        )}
      </div>

      {/* ADDRESS */}
      <h3>📍 Shipping Address</h3>
      <textarea
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter address..."
        style={inputStyle}
      />

      {/* PAYMENT */}
      <h3>💳 Payment</h3>
      <select style={inputStyle}>
        <option>Credit Card</option>
        <option>Debit Card</option>
        <option>Cash on Delivery</option>
      </select>

      {/* TOTAL */}
      <div style={summaryBox}>
        <div style={rowStyle}>
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div style={rowStyle}>
          <span>Tax (10%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>

        <div style={{ ...rowStyle, fontWeight: "bold" }}>
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* BUTTON */}
      <button
        style={checkoutBtn}
        onClick={() => {
          if (!address) return alert("Enter address");
          alert("Order placed successfully 🎉");
        }}
      >
        Place Order 🚀
      </button>
    </div>
  );
}

/* =========================
   LOGIN
========================= */
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Login successful ✅");
      console.log(data);
    }
  };

  const handleSignup = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Signup successful 🎉");
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "400px", margin: "auto" }}>
      <h2 style={{ textAlign: "center" }}>Login 🔐</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={inputStyle}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={inputStyle}
      />

      <button style={btnStyle} onClick={handleLogin}>
        Login
      </button>

      <button
        style={{ ...btnStyle, background: "#28a745", marginTop: "10px" }}
        onClick={handleSignup}
      >
        Sign Up
      </button>
    </div>
  );
}

/* =========================
   MAIN APP
========================= */
function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from("products").select("*");

    if (error) console.error(error);
    else setProducts(data);
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div>
      {/* NAV */}
      <nav style={navStyle}>
        <h2>E-Commerce</h2>

        <div style={{ display: "flex", gap: "20px" }}>
          <Link style={linkStyle} to="/">Home</Link>
          <Link style={linkStyle} to="/products">Products</Link>
          <Link style={linkStyle} to="/cart">Cart ({cart.length})</Link>
          <Link style={linkStyle} to="/login">Login</Link>
        </div>
      </nav>

      {/* HERO */}
      <div style={heroStyle}>
        <h1>Shop Smart 🛍️</h1>
        <p>Best deals. Fast delivery. Trusted service.</p>
      </div>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Home products={products} addToCart={addToCart} />} />
        <Route path="/products" element={<Products products={products} addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

/* =========================
   STYLES
========================= */

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  padding: "15px 40px",
  background: "#111",
  color: "#fff",
};

const heroStyle = {
  height: "50vh",
  background: "linear-gradient(to right, #667eea, #764ba2)",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontWeight: "bold",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",
  marginTop: "30px",
};

const cardStyle = {
  background: "#fff",
  padding: "15px",
  borderRadius: "10px",
  textAlign: "center",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
};

const imgStyle = {
  width: "100%",
  height: "200px",
  objectFit: "cover",
  borderRadius: "10px",
};

const btnStyle = {
  marginTop: "10px",
  padding: "10px",
  border: "none",
  background: "#667eea",
  color: "#fff",
  borderRadius: "5px",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const itemStyle = {
  display: "flex",
  justifyContent: "space-between",
  padding: "10px",
  borderBottom: "1px solid #ddd",
};

const summaryBox = {
  marginTop: "20px",
  padding: "15px",
  background: "#f9f9f9",
  borderRadius: "10px",
};

const rowStyle = {
  display: "flex",
  justifyContent: "space-between",
};

const checkoutBtn = {
  marginTop: "20px",
  width: "100%",
  padding: "12px",
  background: "#28a745",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
};

export default App;