"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function PricePerDayList() {
  const [prices, setPrices] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [formRows, setFormRows] = useState([
    {
      item_id: 1,
      price_old: "",
      price_new: "",
      item_name: "Power Meteorite Fragment",
    },
    {
      item_id: 2,
      price_old: "",
      price_new: "",
      item_name: "Creative Meteorite Fragment",
    },
    {
      item_id: 3,
      price_old: "",
      price_new: "",
      item_name: "Concentration Meteorite Fragment",
    },
    {
      item_id: 4,
      price_old: "",
      price_new: "",
      item_name: "Stamina Meteorite Fragment",
    },
    {
      item_id: 5,
      price_old: "",
      price_new: "",
      item_name: "Spell Meteorite Fragment",
    },
    {
      item_id: 6,
      price_old: "",
      price_new: "",
      item_name: "Wisdom Meteorite Fragment",
    },
  ]);
  const [inserting, setInserting] = useState(false);
  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase
      .from("price_per_day")
      .select(
        "id, item_id, price_old, price_new, created_at, item(item_name,color)"
      )
      .order("created_at", { ascending: true });
    if (error) setError(error.message);
    else setPrices(data || []);
    // เติม price_old ใน formRows จาก 5 รายการล่าสุด (price_new)
    if (data) {
      setFormRows((prev) =>
        prev.map((row) => {
          const found = data.find((d: any) => d.item_id === row.item_id);
          return {
            ...row,
            price_old: found ? String(found.price_new ?? "") : "",
          };
        })
      );
    }
    setLoading(false);
    console.log("prices", data);
  };

  const handleFormChange = (idx: number, name: string, value: string) => {
    setFormRows((prev) =>
      prev.map((row, i) => (i === idx ? { ...row, [name]: value } : row))
    );
  };

  const handleInsert = async (e: React.FormEvent) => {
    e.preventDefault();
    setInserting(true);
    const supabase = createClient();
    const rowsToInsert = formRows.filter(
      (row) => row.price_old && row.price_new
    );
    if (rowsToInsert.length === 0) {
      setInserting(false);
      return;
    }
    const { error } = await supabase.from("price_per_day").insert(
      rowsToInsert.map((row) => ({
        item_id: row.item_id,
        price_old: Number(row.price_old),
        price_new: Number(row.price_new),
      }))
    );
    setInserting(false);
    setFormRows([
      {
        item_id: 1,
        price_old: "",
        price_new: "",
        item_name: "Power Meteorite Fragment",
      },
      {
        item_id: 2,
        price_old: "",
        price_new: "",
        item_name: "Creative Meteorite Fragment",
      },
      {
        item_id: 3,
        price_old: "",
        price_new: "",
        item_name: "Concentration Meteorite Fragment",
      },
      {
        item_id: 4,
        price_old: "",
        price_new: "",
        item_name: "Stamina Meteorite Fragment",
      },
      {
        item_id: 5,
        price_old: "",
        price_new: "",
        item_name: "Spell Meteorite Fragment",
      },
      {
        item_id: 6,
        price_old: "",
        price_new: "",
        item_name: "Wisdom Meteorite Fragment",
      },
    ]);
    fetchPrices();
    if (error) setError(error.message);
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className="font-bold mb-2">Price Per Day</h2>
      {/* ฟอร์ม insert ข้อมูลใหม่ 5 แถว */}
      <form onSubmit={handleInsert} className="mb-4">
        <table className="min-w-full border mb-2">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 border text-black">Item ID</th>
              <th className="px-4 py-2 border text-black">Item Name</th>
              <th className="px-4 py-2 border text-black">Price Old</th>
              <th className="px-4 py-2 border text-black">Price New</th>
            </tr>
          </thead>
          <tbody>
            {formRows.map((row, idx) => (
              <tr key={row.item_id}>
                <td className="px-4 py-2 border text-center">{row.item_id}</td>
                <td className="px-4 py-2 border">{row.item_name}</td>
                <td className="px-4 py-2 border text-white">{row.price_old}</td>
                <td className="px-4 py-2 border">
                  <input
                    type="number"
                    name="price_new"
                    className="border rounded px-2 py-1 w-24"
                    value={row.price_new}
                    onChange={(e) =>
                      handleFormChange(idx, "price_new", e.target.value)
                    }
                    required
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          disabled={inserting}
        >
          {inserting ? "กำลังเพิ่ม..." : "เพิ่มข้อมูล"}
        </button>
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                Item Name
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                Price Old
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                Price New
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: 5 }).map((_, idx) => (
                  <tr key={idx} className="animate-pulse">
                    <td className="px-4 py-2 border">
                      <div className="h-4 w-24 bg-gray-200 rounded" />
                    </td>
                    <td className="px-4 py-2 border">
                      <div className="h-4 w-16 bg-gray-200 rounded" />
                    </td>
                    <td className="px-4 py-2 border">
                      <div className="h-4 w-16 bg-gray-200 rounded" />
                    </td>
                    <td className="px-4 py-2 border">
                      <div className="h-4 w-28 bg-gray-200 rounded" />
                    </td>
                  </tr>
                ))
              : prices.map((row, idx) => {
                  const group = Math.floor(idx / 6);
                  const bg = group % 2 === 0 ? "bg-white" : "bg-gray-200";
                  return (
                    <tr key={row.id} className={bg}>
                      <td
                        className="px-4 py-2 border"
                        style={{ color: row.item?.color || "#000000" }}
                      >
                        {row.item?.item_name}
                      </td>
                      <td className="px-4 py-2 border text-black">
                        {row.price_old}
                      </td>
                      <td className="px-4 py-2 border text-black">
                        {row.price_new}
                      </td>
                      <td className="px-4 py-2 border text-black">
                        {row.created_at}
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
