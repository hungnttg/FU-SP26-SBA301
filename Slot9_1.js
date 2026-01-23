import { useState, useEffect } from "react";

function Slot9_1() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");
  const [products, setProducts] = useState([]);

  const login = async () => {
    const res = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ username, password }),
    });
    const data = await res.json();
    if (data.token) {
      setToken(data.token);
      setRole(data.role);
      fetchProducts(data.token);
    } else {
      alert(data.error);
    }
  };

  const fetchProducts = async (token) => {
    const res = await fetch("http://localhost:8080/products", {
      headers: { Authorization: "Bearer " + token },
    });
    const data = await res.json();
    setProducts(data);
  };

  const deleteProduct = async (name) => {
    if(role !== "ADMIN") { alert("Forbidden"); return; }
    await fetch(`http://localhost:8080/products/${name}`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token },
    });
    fetchProducts(token);
  };

  return (
    <div style={{ padding: "20px" }}>
      {!token ? (
        <div>
          <h2>Login</h2>
          <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} /><br/>
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} /><br/>
          <button onClick={login}>Login</button>
        </div>
      ) : (
        <div>
          <h2>Products ({role})</h2>
          <ul>
            {products.map(p => (
              <li key={p}>
                {p} {role === "ADMIN" && <button onClick={() => deleteProduct(p)}>Delete</button>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Slot9_1;
