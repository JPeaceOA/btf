"use client";

import { useState } from "react";
import { Country, State, City } from "country-state-city";

const guestCategories = [
  "VVIP / Special Guest",
  "State Government Delegation",
  "Sponsor",
  "Investor",
  "Diplomatic Community",
  "International Delegation / Development Partner",
  "Chamber of Commerce / Business Association",
  "Professional Association / Cooperative Society",
  "Publication Committee",
  "Speaker / Facilitator / Panelist",
  "Media / Press",
  "Government Agency Representative",
  "Diaspora Participant",
  "Protocol / Security / Logistics",
  "Nigerian Press Council Staff",
  "General Participant / Guest"
];

export default function RegistrationPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [guestCategory, setGuestCategory] = useState("");
  const [position, setPosition] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [buildingApart, setBuildingApart] = useState("");
  const [street, setStreet] = useState("");

  const optionalLabel = <span className="text-black/40 font-normal text-xs ml-1">(optional)</span>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    return; // Form submittal blocked completely
  };

  const inputClass = "w-full bg-gray-50 border border-black/30 text-black/50 text-sm px-4 py-3 outline-none transition-all placeholder:text-black/20 rounded-sm cursor-not-allowed";

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(26,71,42,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(26,71,42,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-900/10 blur-[120px] rounded-full pointer-events-none" />

      <header className="relative z-10 border-b border-black bg-white backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="mb-6">
            <img src="/1.jpeg" alt="Event Logo" className="h-16 w-auto object-contain" />
          </div>
          <div className="text-center mb-6">
            <p className="text-sm font-bold text-emerald-800 tracking-widest uppercase">
              NIGERIA SUB-NATIONAL INVESTMENT AND TOURISM INFORMATION ROUNDTABLE FEATURING THE LAUNCH OF A BOOK NIGERIA: DOCUMENTING THE ECONOMIC AND TOURISM POTENTIALS <br/> OF THE 36 STATES AND THE FCT
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-6">
            <p className="text-red-800 text-xs text-right">DRIVEN BY A <br/> STRATEGIC <br/> PARTNERSHIP OF:</p>
            <img src="/2.jpeg" alt="Partner 1 Logo" className="h-16 w-auto object-contain" />
            <img src="/3.jpeg" alt="Partner 2 Logo" className="h-16 w-auto object-contain" />
            <img src="/4.jpeg" alt="Partner 3 Logo" className="h-16 w-auto object-contain" />
            <img src="/5.jpeg" alt="Partner 4 Logo" className="h-16 w-auto object-contain" />
          </div>
          <div className="text-center mt-6 text-xs text-black">
            DATE: JUNE 17, 2026<br/>TIME: 1:30pm - 6pm<br/>VENUE: CONFERENCE HALL, PRESIDENTIAL VILLA, ABUJA
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-2xl mx-auto px-6 py-16">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-black text-black uppercase tracking-tight mb-3">
            Registration Form
          </h1>
        </div>

        {/* Closed Registration Header Alert Banner */}
        <div className="mb-6 p-4 bg-red-50 border-2 border-red-600 text-center rounded-sm" role="alert">
          <p className="text-xl font-black text-red-700 uppercase tracking-wide">
            Registrations are closed
          </p>
          <p className="text-xs text-red-900/80 mt-1">
            The deadline for this roundtable event registration has passed.
          </p>
        </div>

        <div className="bg-white border border-black p-8 sm:p-10 opacity-75">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Names */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-black/60 mb-2">First Name <span className="text-red-400">*</span></label>
                <input type="text" value={firstName} disabled placeholder="e.g. Amaka" className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-bold text-black/60 mb-2">Last Name <span className="text-red-400">*</span></label>
                <input type="text" value={lastName} disabled placeholder="e.g. Okonkwo" className={inputClass} />
              </div>
            </div>

            {/* Guest Category */}
            <div>
              <label className="block text-sm font-bold text-black/60 mb-2">
                Guest Category <span className="text-red-400">*</span>
              </label>
              <select value={guestCategory} disabled className={inputClass}>
                <option value="">Select Guest Category</option>
                {guestCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Position & Organisation */}
            <div>
              <label className="block text-sm font-bold text-black/60 mb-2">Position / Title <span className="text-red-400">*</span></label>
              <input type="text" value={position} disabled placeholder="e.g. Director, Program Manager" className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-bold text-black/60 mb-2">Organisation <span className="text-red-400">*</span></label>
              <input type="text" value={organisation} disabled placeholder="e.g. Ministry of Youth Development" className={inputClass} />
            </div>

            {/* Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-black/60 mb-2">Phone Number <span className="text-red-400">*</span></label>
                <input type="tel" value={phone} disabled placeholder="08012345678" className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-bold text-black/60 mb-2">Email Address <span className="text-red-400">*</span></label>
                <input type="email" value={email} disabled placeholder="you@example.com" className={inputClass} />
              </div>
            </div>

            {/* Address Details */}
            <div className="border-t border-gray-100 pt-6 space-y-6">
              <h3 className="text-md font-bold text-black/60 uppercase tracking-wider">
                Address Details {optionalLabel}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-black/60 mb-2">Country</label>
                  <select value={selectedCountry} disabled className={inputClass}>
                    <option value="">Select Country</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-black/60 mb-2">State</label>
                  <select value={selectedState} disabled className={inputClass}>
                    <option value="">Select State</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-black/60 mb-2">City</label>
                  <select value={selectedCity} disabled className={inputClass}>
                    <option value="">Select City</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-black/60 mb-2">Building / Apt Number</label>
                  <input type="text" value={buildingApart} disabled placeholder="e.g. Apt 4B" className={inputClass} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-black/60 mb-2">Street</label>
                <input type="text" value={street} disabled placeholder="e.g. 123 Main Street" className={inputClass} />
              </div>
            </div>

            <button type="button" disabled className="w-full bg-gray-400 text-white font-bold text-lg py-4 cursor-not-allowed transition-all mt-6">
              Registration Closed
            </button>
          </form>
        </div>
      </main>

      <footer className="relative z-10 border-t border-black bg-white py-6 mt-16">
        <p className="text-center text-sm text-black/70">
          Block C 8TH Floor C807-C816, Federal Secretariat Complex, Phase II, Shehu Shagari Way, Abuja, Nigeria Tel:+234 803 704 1001
        </p>
      </footer>
    </div>
  );
}
