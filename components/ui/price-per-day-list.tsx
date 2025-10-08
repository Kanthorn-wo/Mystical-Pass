"use client";
import { FiCopy } from "react-icons/fi";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Label } from "./label";
import { useNotificationMessage } from "../notification";
import { Input } from "antd";
import PriceListTable from "./PriceListTable";
import AverageTable from "./AverageTable";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
export function PricePerDayList() {
  const { showNotification, contextHolder } = useNotificationMessage();
  const [dataPrice, setDataPrice] = useState<any[]>([]);
  const [form, setForm] = useState({
    power: "",
    stamina: "",
    concentration: "",
    creative: "",
    spell: "",
    wisdom: "",
    price_m: "",
  });
  // For displaying formatted values with commas
  const [displayValue, setDisplayValue] = useState({
    power: "",
    stamina: "",
    concentration: "",
    creative: "",
    spell: "",
    wisdom: "",
    price_m: "",
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
      id: 1,
      name: "power",
      color: "#dc0b0b",
    },
    {
      id: 2,
      name: "stamina",
      color: "#f99c04",
    },
    {
      id: 3,
      name: "concentration",
      color: "#02f42e",
    },
    {
      id: 4,
      name: "creative",
      color: "#08f1f1",
    },
    {
      id: 5,
      name: "spell",
      color: "#0342ef",
    },
    {
      id: 6,
      name: "wisdom",
      color: "#8b07f0",
    },
  ];

  // สำหรับ antd Input
  const handleChangeAntd = (value: string, name: string) => {
    const rawValue = value.replace(/,/g, "");
    if (!/^\d*$/.test(rawValue)) return;
    setForm({ ...form, [name]: rawValue });
    setDisplayValue({
      ...displayValue,
      [name]: rawValue ? Number(rawValue).toLocaleString() : "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // เตรียมข้อมูลสำหรับ insert
    const insertData = {
      power_meteorite_fragment: Number(form.power) || 0,
      stamina_meteorite_fragment: Number(form.stamina) || 0,
      concentration_meteorite_fragment: Number(form.concentration) || 0,
      creative_meteorite_fragment: Number(form.creative) || 0,
      spell_meteorite_fragment: Number(form.spell) || 0,
      wisdom_meteorite_fragment: Number(form.wisdom) || 0,
      price_m: Number(form.price_m) || 0,
    };
    try {
      const supabase = createClient();
      const { error } = await supabase.from("item").insert([insertData]);
      if (error) {
        showNotification(
          "error",
          "เกิดข้อผิดพลาด",
          error.message || "บันทึกไม่สำเร็จ"
        );
      } else {
        showNotification(
          "success",
          "บันทึกสำเร็จ",
          "ข้อมูลถูกบันทึกเรียบร้อยแล้ว"
        );
        setForm({
          power: "",
          stamina: "",
          concentration: "",
          creative: "",
          spell: "",
          wisdom: "",
          price_m: "",
        });
        fetchPrices();
      }
    } catch (err: any) {
      showNotification(
        "error",
        "เกิดข้อผิดพลาด",
        err.message || "บันทึกไม่สำเร็จ"
      );
    }
  };

  const handleDelete = async (id: number) => {
    const supabase = createClient();
    const { error } = await supabase.from("item").delete().eq("id", id);
    if (error) {
      showNotification(
        "error",
        "ลบไม่สำเร็จ",
        error.message || "เกิดข้อผิดพลาด"
      );
    } else {
      showNotification("success", "ลบสำเร็จ", "ข้อมูลถูกลบเรียบร้อยแล้ว");
      fetchPrices();
    }
  };

  const isFormEmpty = Object.values(form).every((v) => v === "");

  // Sync displayValue with form when form is reset or changed
  useEffect(() => {
    setDisplayValue({
      power: form.power ? Number(form.power).toLocaleString() : "",
      stamina: form.stamina ? Number(form.stamina).toLocaleString() : "",
      concentration: form.concentration
        ? Number(form.concentration).toLocaleString()
        : "",
      creative: form.creative ? Number(form.creative).toLocaleString() : "",
      spell: form.spell ? Number(form.spell).toLocaleString() : "",
      wisdom: form.wisdom ? Number(form.wisdom).toLocaleString() : "",
      price_m: form.price_m ? Number(form.price_m).toLocaleString() : "",
    });
  }, [
    form.power,
    form.stamina,
    form.concentration,
    form.creative,
    form.spell,
    form.wisdom,
    form.price_m,
  ]);

  function filterDecimal2(val: string) {
    return /^\d*\.?\d{0,2}$/.test(val);
  }

  return (
    <>
      {contextHolder}
      <div className="container-list">
        <form className="space-y-4" onSubmit={handleSubmit}>
          {inp_label.map((item) => (
            <div className="flex items-center gap-2" key={item.id}>
              {(() => {
                const labelText = `${
                  item.name.charAt(0).toUpperCase() + item.name.slice(1)
                } Meteorite Fragment`;
                return (
                  <>
                    <Label
                      htmlFor={item.name}
                      className="min-w-[250px] px-2 py-2 rounded text-white"
                      style={{ backgroundColor: item.color }}
                    >
                      {labelText}
                    </Label>
                    <button
                      type="button"
                      className="ml-2 p-1 rounded hover:bg-gray-200 hover:text-black"
                      title="Copy"
                      onClick={() => navigator.clipboard.writeText(labelText)}
                    >
                      <FiCopy size={18} className="ic" />
                    </button>
                  </>
                );
              })()}
              <Input
                value={displayValue[item.name]}
                onChange={(e) => handleChangeAntd(e.target.value, item.name)}
                inputMode="numeric"
                type="text"
                placeholder="กรอกราคาใหม่"
                autoComplete="off"
                className="text-black"
              />
            </div>
          ))}
          <Input
            value={form.price_m}
            onChange={(e) => {
              const val = e.target.value;
              if (filterDecimal2(val)) {
                setForm({ ...form, price_m: val });
              }
            }}
            inputMode="decimal"
            type="text"
            placeholder="กรอกราคา M"
            autoComplete="off"
            className="text-black mb-2"
          />
          <button
            className="bg-blue-500 py-2 px-4 border rounded-md w-full disabled:bg-gray-500"
            type="submit"
            disabled={isFormEmpty}
          >
            Submit
          </button>
        </form>
        {/* ตารางค่าเฉลี่ย */}
        <AverageTable data={dataPrice} />
        <h3 className="list-title py-4 text-xl font-bold">List</h3>
        <PriceListTable
          data={dataPrice}
          formatDate={formatDate}
          onDelete={handleDelete}
        />
      </div>
    </>
  );
}
