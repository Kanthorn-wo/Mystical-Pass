"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Input } from "./input";
import { Label } from "./label";

export function PricePerDayList() {
  const [dataPrice, setDataPrice] = useState<any[]>([]);
  const [form, setForm] = useState({
    power: "",
    stamina: "",
    concentration: "",
    creative: "",
    spell: "",
    wisdom: "",
  });
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

  const inp_label = [
    {
      name: "power",
    },
    {
      name: "stamina",
    },
    {
      name: "concentration",
    },
    {
      name: "creative",
    },
    {
      name: "spell",
    },
    {
      name: "wisdom",
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("name:", "value", e.target.name, e.target.value);
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submit", form);
    setForm({
      power: "",
      stamina: "",
      concentration: "",
      creative: "",
      spell: "",
      wisdom: "",
    });
  };

  const isFormEmpty = Object.values(form).every((v) => v === "");

  return (
    <>
      <div className="container-list">
        <form className="space-y-4" onSubmit={handleSubmit}>
          {inp_label.map((item) => (
            <div className="flex items-center gap-2" key={item.name}>
              <Label htmlFor={item.name} className="min-w-[250px]">
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}{" "}
                Meteorite Fragment
              </Label>
              <Input
                id={item.name}
                type="number"
                placeholder="กรอกราคาใหม่"
                value={form[item.name]}
                onChange={handleChange}
              />
            </div>
          ))}
          <button
            className="bg-blue-500 py-2 px-4 border rounded-md w-full disabled:bg-gray-500"
            type="submit"
            disabled={isFormEmpty}
          >
            Submit
          </button>
        </form>
        <h3 className="list-title py-4 text-xl font-bold">List</h3>
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
