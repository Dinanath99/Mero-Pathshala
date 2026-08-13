import React from "react";
import { 
  Keyboard, 
  Cpu, 
  Monitor, 
  HardDrive, 
  Save, 
  MousePointer, 
  Layers, 
  CircuitBoard, 
  Zap, 
  Fan, 
  Cable, 
  Settings, 
  AppWindow, 
  Laptop, 
  Smartphone, 
  Server, 
  BookOpen, 
  CreditCard, 
  HeartPulse, 
  Landmark, 
  ShoppingBag, 
  RotateCw, 
  Sliders, 
  Grid, 
  Activity, 
  Calculator, 
  Mic, 
  Camera, 
  Volume2, 
  Printer, 
  Tv, 
  Terminal, 
  Apple, 
  Layout 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DiagramViewerProps {
  items: Array<{
    step: string;
    titleEn: string;
    titleNe: string;
    descEn: string;
    descNe: string;
    icon?: string;
  }>;
}

const iconMap: { [key: string]: any } = {
  Keyboard,
  Cpu,
  Monitor,
  HardDrive,
  Save,
  MousePointer,
  Layers,
  CircuitBoard,
  Zap,
  Fan,
  Cable,
  Settings,
  AppWindow,
  Laptop,
  Smartphone,
  Server,
  BookOpen,
  CreditCard,
  HeartPulse,
  Landmark,
  ShoppingBag,
  RotateCw,
  Sliders,
  Grid,
  Activity,
  Calculator,
  Mic,
  Camera,
  Volume2,
  Printer,
  Tv,
  Terminal,
  Apple,
  Layout
};

export const DiagramViewer: React.FC<DiagramViewerProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-8">
      {items.map((item, idx) => {
        const IconComponent = (item.icon && iconMap[item.icon]) ? iconMap[item.icon] : Cpu;

        return (
          <Card
            key={idx}
            className="border-2 border-orange-500/25 dark:border-orange-500/30 bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-orange-500 transition-all flex flex-col justify-between group"
          >
            <CardContent className="p-0 space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <IconComponent size={28} />
                </div>
                <Badge variant="outline" className="text-xs font-black uppercase text-orange-600 dark:text-orange-400 border-2 border-orange-500/30 px-3 py-1">
                  {item.step}
                </Badge>
              </div>

              <div>
                <h4 className="text-lg font-black text-gray-900 dark:text-white leading-tight">
                  {item.titleEn}
                </h4>
                <p className="text-base font-bold text-orange-600 dark:text-orange-400 font-nepali mt-1">
                  {item.titleNe}
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t-2 border-gray-100 dark:border-slate-800">
                <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
                  {item.descEn}
                </p>
                <p className="text-sm font-nepali text-gray-900 dark:text-gray-100 font-semibold leading-relaxed">
                  {item.descNe}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
