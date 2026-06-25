import { IndianRupee, Clock } from "lucide-react";

export default function PaymentStructure() {
    const allLocations = [
        {
            shift: "SHIFT 1",
            time: "6:00 AM – 10:00 AM",
            pay: "₹350",
            color: "blue",
        },
        {
            shift: "SHIFT 2",
            time: "10:00 AM – 2:00 PM",
            pay: "₹600",
            color: "purple",
        },
        {
            shift: "SHIFT 3",
            time: "2:00 PM – 6:00 PM",
            pay: "₹800",
            color: "green",
            best: true,
        },
    ];

    const gujaratLocations = [
        {
            shift: "SHIFT 1",
            time: "6:00 AM – 10:00 AM",
            pay: "₹400",
            color: "blue",
        },
        {
            shift: "SHIFT 2",
            time: "10:00 AM – 2:00 PM",
            pay: "₹700",
            color: "purple",
        },
        {
            shift: "SHIFT 3",
            time: "2:00 PM – 6:00 PM",
            pay: "₹950",
            color: "orange",
            best: true,
        },
    ];

    const getBorderColor = (color) => {
        switch (color) {
            case "blue":
                return "border-blue-200";
            case "purple":
                return "border-purple-200";
            case "green":
                return "border-green-300";
            case "orange":
                return "border-orange-300";
            default:
                return "border-gray-200";
        }
    };

    const getTextColor = (color) => {
        switch (color) {
            case "blue":
                return "text-blue-600";
            case "purple":
                return "text-purple-600";
            case "green":
                return "text-green-600";
            case "orange":
                return "text-orange-600";
            default:
                return "text-gray-600";
        }
    };

    const getBgColor = (color) => {
        switch (color) {
            case "blue":
                return "bg-blue-100";
            case "purple":
                return "bg-purple-100";
            case "green":
                return "bg-green-100";
            case "orange":
                return "bg-orange-100";
            default:
                return "bg-gray-100";
        }
    };

    const getCornerBg = (color) => {
        switch (color) {
            case "blue":
                return "bg-blue-50";
            case "purple":
                return "bg-purple-50";
            case "green":
                return "bg-green-50";
            case "orange":
                return "bg-orange-50";
            default:
                return "bg-gray-50";
        }
    };

    return (
        <div className="bg-white rounded-2xl p-6 mt-10 shadow-sm border border-gray-100 mb-8">

            {/* Header */}
            <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-linear-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <IndianRupee
                        size={22}
                        className="text-white"
                    />
                </div>

                <div>
                    <h2 className="text-2xl font-bold text-slate-800">
                        Payment Structure
                    </h2>

                    <p className="text-gray-500 text-sm">
                        Transparent pay rates for all invigilators
                    </p>
                </div>
            </div>

            {/* All Locations */}
            <div className="mt-8 mb-8">
                <h3 className="font-bold text-indigo-700 text-lg mb-4">
                    📍 All Locations
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {allLocations.map((item, idx) => (
                        <div
                            key={idx}
                            className={`
                relative overflow-hidden
                bg-white rounded-2xl border p-4
                transition-all duration-300
                hover:shadow-lg hover:-translate-y-1
                ${getBorderColor(item.color)}
              `}
                        >
                            {item.best && (
                                <div className="absolute top-2 right-2 bg-green-500 text-white text-[10px] px-2 py-1 rounded-full font-semibold">
                                    BEST PAY ⭐
                                </div>
                            )}

                            <div
                                className={`
                  w-10 h-10 rounded-full
                  flex items-center justify-center mb-3
                  ${getBgColor(item.color)}
                  ${getTextColor(item.color)}
                `}
                            >
                                <Clock size={16} />
                            </div>

                            <h4
                                className={`
                  font-bold text-base mb-1
                  ${getTextColor(item.color)}
                `}
                            >
                                {item.shift}
                            </h4>

                            <p className="text-xs text-gray-500 mb-3">
                                {item.time}
                            </p>

                            <div className="border-t border-gray-100 mb-3"></div>

                            <h2
                                className={`
                  text-3xl font-bold
                  ${getTextColor(item.color)}
                `}
                            >
                                {item.pay}
                            </h2>

                            <p className="text-xs text-gray-500">
                                PER DAY
                            </p>

                            <div
                                className={`
                  absolute bottom-0 right-0
                  w-24 h-14 rounded-tl-full opacity-60
                  ${getCornerBg(item.color)}
                `}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Gujarat Locations */}
            <div>
                <h3 className="font-bold text-slate-800 text-lg mb-4">
                    📍 Gujarat Locations Only
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {gujaratLocations.map((item, idx) => (
                        <div
                            key={idx}
                            className={`
                relative overflow-hidden
                bg-white rounded-2xl border p-4
                transition-all duration-300
                hover:shadow-lg hover:-translate-y-1
                ${getBorderColor(item.color)}
              `}
                        >
                            {item.best && (
                                <div className="absolute top-2 right-2 bg-orange-500 text-white text-[10px] px-2 py-1 rounded-full font-semibold">
                                    BEST PAY ⭐
                                </div>
                            )}

                            <div
                                className={`
                  w-10 h-10 rounded-full
                  flex items-center justify-center mb-3
                  ${getBgColor(item.color)}
                  ${getTextColor(item.color)}
                `}
                            >
                                <Clock size={16} />
                            </div>

                            <h4
                                className={`
                  font-bold text-base mb-1
                  ${getTextColor(item.color)}
                `}
                            >
                                {item.shift}
                            </h4>

                            <p className="text-xs text-gray-500 mb-3">
                                {item.time}
                            </p>

                            <div className="border-t border-gray-100 mb-3"></div>

                            <h2
                                className={`
                  text-3xl font-bold
                  ${getTextColor(item.color)}
                `}
                            >
                                {item.pay}
                            </h2>

                            <p className="text-xs text-gray-500">
                                PER DAY
                            </p>

                            <div
                                className={`
                  absolute bottom-0 right-0
                  w-24 h-14 rounded-tl-full opacity-60
                  ${getCornerBg(item.color)}
                `}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}