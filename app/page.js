import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export default function TruckCalculator() {
  const [loaded, setLoaded] = useState(0);
  const [unloaded, setUnloaded] = useState(0);
  const [idle, setIdle] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [lang, setLang] = useState("EN");

  const fuelPerKm = 11;
  const wearPerKm = 5;
  const idlePerHr = 90;

  const totalKm = Number(loaded) + Number(unloaded);
  const cost = totalKm * (fuelPerKm + wearPerKm) + idle * idlePerHr;
  const profit = revenue - cost;

  const getDecision = () => {
    if (profit >= 1000) return { en: "ACCEPT", th: "รับงาน", color: "bg-green-500" };
    if (profit >= 500) return { en: "CONSIDER", th: "พิจารณา", color: "bg-yellow-400" };
    return { en: "REJECT", th: "ไม่รับ", color: "bg-red-500" };
  };

  const decision = getDecision();

  const text = {
    EN: {
      title: "Truck Job Calculator",
      loaded: "Loaded km",
      unloaded: "Unloaded km",
      idle: "Idle hours",
      revenue: "Revenue (baht)",
      distance: "Total Distance",
      cost: "Estimated Cost",
      profit: "Profit",
      reset: "Reset",
    },
    TH: {
      title: "คำนวณงานรถบรรทุก",
      loaded: "กม. วิ่งบรรทุก",
      unloaded: "กม. วิ่งเปล่า",
      idle: "ชั่วโมงจอดรอ",
      revenue: "รายได้ (บาท)",
      distance: "ระยะทางรวม",
      cost: "ต้นทุน",
      profit: "กำไร",
      reset: "รีเซ็ต",
    },
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="flex justify-end mb-2">
        <Button size="sm" onClick={() => setLang(lang === "EN" ? "TH" : "EN")}> 
          {lang === "EN" ? "TH" : "EN"}
        </Button>
      </div>

      <motion.h1
        className="text-2xl font-bold mb-4 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {text[lang].title}
      </motion.h1>

      <Card className="rounded-2xl shadow-lg">
        <CardContent className="space-y-4 p-4">
          <Input
            type="number"
            placeholder={text[lang].loaded}
            onChange={(e) => setLoaded(e.target.value)}
          />
          <Input
            type="number"
            placeholder={text[lang].unloaded}
            onChange={(e) => setUnloaded(e.target.value)}
          />
          <Input
            type="number"
            placeholder={text[lang].idle}
            onChange={(e) => setIdle(e.target.value)}
          />
          <Input
            type="number"
            placeholder={text[lang].revenue}
            onChange={(e) => setRevenue(e.target.value)}
          />

          <div className="pt-4">
            <p className="text-sm">{text[lang].distance}: {totalKm.toFixed(1)} km</p>
            <p className="text-sm">{text[lang].cost}: {cost.toFixed(0)} ฿</p>
            <p className="text-lg font-bold">{text[lang].profit}: {profit.toFixed(0)} ฿</p>
          </div>

          <div className={`text-center text-white py-3 rounded-xl font-bold ${decision.color}`}>
            {lang === "EN" ? decision.en : decision.th}
          </div>
        </CardContent>
      </Card>

      <div className="mt-4 text-center">
        <Button
          onClick={() => {
            setLoaded(0);
            setUnloaded(0);
            setIdle(0);
            setRevenue(0);
          }}
        >
          {text[lang].reset}
        </Button>
      </div>
    </div>
  );
}
