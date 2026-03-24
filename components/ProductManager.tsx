"use client";

import { useState } from "react";
import { Product } from "@/types";

type ProductManagerProps = {
  editable: boolean;
  initialData: Product[];
};

export function ProductManager({ editable, initialData }: ProductManagerProps) {
  const [products, setProducts] = useState<Product[]>(initialData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", category: "", quantity: 0, unit: "", price: 0 });

  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      category: product.category,
      quantity: product.quantity,
      unit: product.unit,
      price: product.price,
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({ name: "", category: "", quantity: 0, unit: "", price: 0 });
  };

  const submit = () => {
    if (!editable) return;
    if (!form.name.trim() || !form.category.trim() || !form.unit.trim()) return;

    if (editingId) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingId
            ? { ...p, ...form, updatedAt: new Date().toISOString().slice(0, 10) }
            : p,
        ),
      );
    } else {
      setProducts((prev) => [
        {
          id: `P-${Math.floor(Math.random() * 9000 + 1000)}`,
          ...form,
          updatedAt: new Date().toISOString().slice(0, 10),
        },
        ...prev,
      ]);
    }

    resetForm();
  };

  return (
    <section style={cardStyle}>
      <h2 style={{ marginTop: 0 }}>Product Management</h2>
      <p style={{ color: "var(--muted)", marginTop: 0 }}>
        View access for Manager and Store Keeper. Add/edit enabled for both roles.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))", gap: 8 }}>
        <input placeholder="Name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} style={inputStyle} disabled={!editable} />
        <input placeholder="Category" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} style={inputStyle} disabled={!editable} />
        <input placeholder="Qty" type="number" value={form.quantity} onChange={(e) => setForm((f) => ({ ...f, quantity: Number(e.target.value) }))} style={inputStyle} disabled={!editable} />
        <input placeholder="Unit" value={form.unit} onChange={(e) => setForm((f) => ({ ...f, unit: e.target.value }))} style={inputStyle} disabled={!editable} />
        <input placeholder="Price" type="number" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))} style={inputStyle} disabled={!editable} />
      </div>

      <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
        <button onClick={submit} disabled={!editable} style={btnStyle}>
          {editingId ? "Save Product" : "Add Product"}
        </button>
        <button onClick={resetForm} style={btnStyle}>
          Clear
        </button>
      </div>

      <div style={{ overflowX: "auto", marginTop: 14 }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {[
                "ID",
                "Name",
                "Category",
                "Qty",
                "Unit",
                "Price",
                "Updated",
                "Action",
              ].map((h) => (
                <th key={h} style={thtd}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td style={thtd}>{product.id}</td>
                <td style={thtd}>{product.name}</td>
                <td style={thtd}>{product.category}</td>
                <td style={thtd}>{product.quantity}</td>
                <td style={thtd}>{product.unit}</td>
                <td style={thtd}>Rs. {product.price}</td>
                <td style={thtd}>{product.updatedAt}</td>
                <td style={thtd}>
                  <button disabled={!editable} style={btnStyle} onClick={() => startEdit(product)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

const cardStyle: React.CSSProperties = {
  background: "var(--panel)",
  border: "1px solid var(--border)",
  borderRadius: 16,
  padding: "1rem",
};

const inputStyle: React.CSSProperties = {
  border: "1px solid var(--border)",
  borderRadius: 10,
  background: "transparent",
  color: "var(--text)",
  padding: "0.5rem",
};

const thtd: React.CSSProperties = {
  border: "1px solid var(--border)",
  textAlign: "left",
  padding: "0.5rem",
};

const btnStyle: React.CSSProperties = {
  border: "1px solid var(--border)",
  background: "var(--panel)",
  color: "var(--text)",
  borderRadius: 10,
  padding: "0.4rem 0.65rem",
  cursor: "pointer",
};