import { Table } from "antd";

interface AvgTableProps {
  data: any[];
}

function avg(data: any[], field: string) {
  if (!Array.isArray(data) || data.length === 0) return "-";
  const sum = data.reduce((acc, item) => acc + (Number(item[field]) || 0), 0);
  const result = sum / data.length;
  if (field === "price_m") {
    return result
      ? result.toLocaleString(undefined, { maximumFractionDigits: 2 })
      : "-";
  }
  return result
    ? result.toLocaleString(undefined, { maximumFractionDigits: 0 })
    : "-";
}

export default function AverageTable({ data }: AvgTableProps) {
  return (
    <div className="mb-4">
      <h3 className="font-bold mb-2">Average (ค่าเฉลี่ย)</h3>
      <Table
        dataSource={[
          {
            key: "avg",
            power: avg(data, "power_meteorite_fragment"),
            stamina: avg(data, "stamina_meteorite_fragment"),
            concentration: avg(data, "concentration_meteorite_fragment"),
            creative: avg(data, "creative_meteorite_fragment"),
            spell: avg(data, "spell_meteorite_fragment"),
            wisdom: avg(data, "wisdom_meteorite_fragment"),
            sumary_price: avg(data, "sumary_price"),
            price_m: avg(data, "price_m"),
          },
        ]}
        columns={[
          { title: "Power", dataIndex: "power", key: "power", align: "center" },
          {
            title: "Stamina",
            dataIndex: "stamina",
            key: "stamina",
            align: "center",
          },
          {
            title: "Concentration",
            dataIndex: "concentration",
            key: "concentration",
            align: "center",
          },
          {
            title: "Creative",
            dataIndex: "creative",
            key: "creative",
            align: "center",
          },
          { title: "Spell", dataIndex: "spell", key: "spell", align: "center" },
          {
            title: "Wisdom",
            dataIndex: "wisdom",
            key: "wisdom",
            align: "center",
          },
          {
            title: "Sumary",
            dataIndex: "sumary_price",
            key: "sumary_price",
            align: "center",
          },
          { title: "M", dataIndex: "price_m", key: "price_m", align: "center" },
        ]}
        pagination={false}
        style={{ tableLayout: "fixed", width: "100%" }}
        showHeader={true}
      />
    </div>
  );
}
