// data/dashboardData.js

import {
    MapPin,
    Briefcase,
    Calendar,
    IndianRupee,
    Shield,
    TrendingUp,
    CheckCircle,
    Award,
} from "lucide-react";

export const examLocations = [
    "New Delhi",
    "Gurugram",
    "Noida",
    "Kurukshetra",
    "Jalandhar",
];

export const responsibilities = [
    "Verify Candidate Identity Documents",
    "Assist In Examination Operations",
    "Maintain Examination Discipline",
    "Follow Examination Guidelines & Procedures",
];

export const applicationSteps = [
    "Complete Application",
    "Submit Details",
    "HR Contact",
    "Final Selection",
];

export const stats = [
    {
        label: "Active Locations",
        value: "31+",
        icon: MapPin,
        color: "from-blue-500 to-cyan-500",
    },
    {
        label: "Open Positions",
        value: "500+",
        icon: Briefcase,
        color: "from-green-500 to-emerald-500",
    },
    {
        label: "Project Duration",
        value: "20-25 Days",
        icon: Calendar,
        color: "from-purple-500 to-pink-500",
    },
    {
        label: "Daily Payout",
        value: "₹350-950",
        icon: IndianRupee,
        color: "from-orange-500 to-red-500",
    },
];

export const highlights = [
    {
        icon: Shield,
        text: "NO REGISTRATION FEE",
        color: "from-green-500 to-emerald-500",
    },
    {
        icon: TrendingUp,
        text: "100% TRANSPARENCY",
        color: "from-blue-500 to-cyan-500",
    },
    {
        icon: CheckCircle,
        text: "FAIR SELECTION",
        color: "from-purple-500 to-pink-500",
    },
    {
        icon: Award,
        text: "GROWTH OPPORTUNITY",
        color: "from-orange-500 to-red-500",
    },
];