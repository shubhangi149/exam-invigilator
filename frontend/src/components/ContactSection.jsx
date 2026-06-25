import { Phone, MessageCircle } from "lucide-react";

export default function ContactSection() {
  return (
    <div className="grid md:grid-cols-2 gap-5 mt-6">

      <a
        href="tel:+917767933022"
        className="bg-white rounded-2xl border border-gray-200 p-5 transition block"
      >
        <div className="flex items-center gap-2">
          <Phone className="text-indigo-600" />
          <h3 className="font-semibold">Recruitment Contact</h3>
        </div>

        <p className="mt-3 font-medium">Pratik Yeola</p>
        <p className="text-slate-500">7767933022</p>
      </a>

      <a
        href="https://wa.me/917972200682"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white rounded-2xl border border-gray-200 p-5 transition block"
      >
        <div className="flex items-center gap-2">
          <MessageCircle className="text-green-600" />
          <h3 className="font-semibold">WhatsApp Support</h3>
        </div>

        <p className="mt-3 text-slate-500">7972200682</p>
      </a>

    </div>
  );
}