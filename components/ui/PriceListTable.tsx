import { Table } from "antd";

interface PriceListTableProps {
  data: any[];
  formatDate: (dateString: string) => string;
  onDelete: (id: number) => void;
}

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export default function PriceListTable({
  data,
  formatDate,
  onDelete,
}: PriceListTableProps) {
  return (
    <Table
      dataSource={data.map((item, idx) => ({
        key: item.id ?? idx,
        id: item.id,
        created_at: formatDate(item.created_at),
        power: item.power_meteorite_fragment.toLocaleString(),
        stamina: item.stamina_meteorite_fragment.toLocaleString(),
        concentration: item.concentration_meteorite_fragment.toLocaleString(),
        creative: item.creative_meteorite_fragment.toLocaleString(),
        spell: item.spell_meteorite_fragment.toLocaleString(),
        wisdom: item.wisdom_meteorite_fragment.toLocaleString(),
        sumary_price: item.sumary_price.toLocaleString(),
        price_m: item.price_m.toLocaleString(),
      }))}
      columns={[
        { title: "ID", dataIndex: "id", key: "id", align: "center" },
        {
          title: "Time Stemp",
          dataIndex: "created_at",
          key: "created_at",
          align: "center",
        },
        {
          title: (
            <span style={{ color: "#dc0b0b", display: "block" }}>
              Power
              <br /> Meteorite Fragment
            </span>
          ),
          dataIndex: "power",
          key: "power",
          align: "center",
        },
        {
          title: (
            <span style={{ color: "#f99c04", display: "block" }}>
              Stamina
              <br /> Meteorite Fragment
            </span>
          ),
          dataIndex: "stamina",
          key: "stamina",
          align: "center",
        },
        {
          title: (
            <span style={{ color: "#02f42e", display: "block" }}>
              Concentration
              <br /> Meteorite Fragment
            </span>
          ),
          dataIndex: "concentration",
          key: "concentration",
          align: "center",
        },
        {
          title: (
            <span style={{ color: "#08f1f1", display: "block" }}>
              Creative
              <br /> Meteorite Fragment
            </span>
          ),
          dataIndex: "creative",
          key: "creative",
          align: "center",
        },
        {
          title: (
            <span style={{ color: "#0342ef", display: "block" }}>
              Spell
              <br /> Meteorite Fragment
            </span>
          ),
          dataIndex: "spell",
          key: "spell",
          align: "center",
        },
        {
          title: (
            <span style={{ color: "#8b07f0", display: "block" }}>
              Wisdom
              <br /> Meteorite Fragment
            </span>
          ),
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
        {
          title: "M",
          dataIndex: "price_m",
          key: "price_m",
          align: "center",
        },
        {
          title: "Action",
          key: "action",
          align: "center",
          render: (_: any, record: any) => (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <EditOutlined
                style={{
                  color: "#1677ff",
                  fontSize: 18,
                  marginRight: 12,
                  cursor: "pointer",
                }}
              />
              <DeleteOutlined
                style={{
                  color: "#dc2626",
                  fontSize: 18,
                  cursor: "pointer",
                }}
                onClick={() => onDelete(record.id)}
              />
            </div>
          ),
        },
      ]}
      pagination={false}
      style={{ tableLayout: "fixed", width: "100%" }}
    />
  );
}
