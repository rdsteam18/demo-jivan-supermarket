import { Zap, Tag, ShieldCheck, RotateCcw } from "lucide-react";

export default function TrustBar() {
  const trustItems = [
    {
      icon: Zap,
      iconColor: "text-[#16A34A] fill-[#16A34A]",
      title: "12 Min Delivery",
      subtitle: "Lightning fast to your door",
    },
    {
      icon: Tag,
      iconColor: "text-[#E11D48]",
      title: "Mandi Rates Guaranteed",
      subtitle: "Save big on every item",
    },
    {
      icon: ShieldCheck,
      iconColor: "text-[#16A34A]",
      title: "100% Original FMCG",
      subtitle: "Direct from verified brands",
    },
    {
      icon: RotateCcw,
      iconColor: "text-blue-600",
      title: "Instant Replacement",
      subtitle: "Doorstep ease & refunds",
    },
  ];

  return (
    <div className="w-full bg-white border border-gray-200/90 rounded-xl py-2 px-3 sm:px-4 shadow-2xs">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
        {trustItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`flex items-center gap-2.5 py-1 sm:py-0 ${
                idx !== 0 ? "sm:pl-4" : ""
              }`}
            >
              <div className="w-7 h-7 rounded-lg bg-[#FAFAFA] flex items-center justify-center flex-shrink-0 border border-gray-100">
                <Icon className={`w-3.5 h-3.5 ${item.iconColor}`} />
              </div>
              <div className="flex flex-col leading-tight min-w-0">
                <span className="text-[11px] sm:text-xs font-black text-[#1A1A1A] truncate">
                  {item.title}
                </span>
                <span className="text-[10px] text-gray-400 truncate">
                  {item.subtitle}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
