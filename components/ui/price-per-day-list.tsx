"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function PricePerDayList() {
  // ...existing code...
  const [dataPrice, setDataPrice] = useState<any[]>([]);

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("item")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) {
      setDataPrice(data);
      console.log("dataPrice (updated)", data);
    }
    if (error) {
      console.log("error", error);
    }
  };

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    // ปรับเวลาเป็นไทย (UTC+7)
    date.setUTCHours(date.getUTCHours() + 7);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hour}:${minute} น.`;
  }
  return (
    <>
      <div className="container-list">
        <h3 className="list-title">List</h3>
        <div className="wrapper-table overflow-x-auto">
          <table className="table-list border-collapse border border-gray-400">
            <thead>
              <tr className="text-center">
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Time Stemp</th>
                <th className="border border-gray-300 bg-[#dc0b0b] px-4 py-2">
                  Power Meteorite Fragment
                </th>
                <th className="border border-gray-300 bg-[#f99c04]  px-4 py-2">
                  Stamina Meteorite Fragment
                </th>
                <th className="border border-gray-300 bg-[#02f42e]  px-4 py-2">
                  Concentration Meteorite Fragment
                </th>
                <th className="border border-gray-300 bg-[#08f1f1] px-4 py-2">
                  Creative Meteorite Fragment
                </th>
                <th className="border border-gray-300 bg-[#0342ef] px-4 py-2">
                  Spell Meteorite Fragment
                </th>
                <th className="border border-gray-300 bg-[#8b07f0] px-4 py-2">
                  Wisdom Meteorite Fragment
                </th>
                <th className="border border-gray-300 px-4 py-2">Sumary</th>
                <th className="border border-gray-300 px-4 py-2">
                  Price M Rate
                </th>
                <th className="border border-gray-300 px-4 py-2" colSpan={2}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {dataPrice.map((item, idx) => (
                <tr key={item.id ?? idx} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">
                    {item.id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {formatDate(item.created_at)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.power_meteorite_fragment.toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.stamina_meteorite_fragment.toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.concentration_meteorite_fragment.toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.creative_meteorite_fragment.toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.spell_meteorite_fragment.toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.wisdom_meteorite_fragment.toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.sumary_price.toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.price_m}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <a href="">Edit</a>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <a href="">Delete</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
