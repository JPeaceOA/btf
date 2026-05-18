"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegistrationPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form States
  const [fullName, setFullName] = useState("");
  const [position, setPosition] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const validateForm = () => {
    if (!fullName.trim()) return "Full name is required";
    if (!position.trim()) return "Position is required";
    if (!organisation.trim()) return "Organisation is required";
    if (!address.trim()) return "Address is required";
    if (!phone.trim()) return "Phone number is required";
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) return "Valid email is required";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    const err = validateForm();
    if (err) {
      setError(err);
      return;
    }

    setLoading(true);

    const payload = {
      full_name: fullName,
      position,
      organisation,
      address,
      phone,
      email,
    };

    try {
      const res = await fetch("/api/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push("/pre"); 
      } else {
        setError("Submission failed. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Design */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(26,71,42,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(26,71,42,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-900/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Updated Header with 4 Logos */}
      <header className="relative z-10 border-b border-black bg-white backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 py-8">

            <div className=" mb-6">
                <img 
              src="/1.jpeg" 
              alt="FMYD Logo" 
              className="h-16 w-auto object-contain" 
            />
            <p className="text-sm font-bold text-emerald-500 tracking-widest uppercase">
              NIGERIA
            </p>
          </div>
        
          {/* Top Text */}
          <div className="text-center mb-6">
            <p className="text-sm font-bold text-emerald-500 tracking-widest uppercase">
              NIGERIA SUB-NATIONAL INVESTMENT AND TOURISM INFORMATION SUBMIT FEATURING THE LAUNCH OF A BOOK NIGEIRA
            </p>
          </div>

          {/* Logos Container */}
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
            {/* Logo 1 */}
            <img 
              src="/2.jpeg" 
              alt="FMYD Logo" 
              className="h-16 w-auto object-contain" 
            />
            
            {/* Logo 2 */}
            <img 
              src="/3.jpeg" 
              alt="Partner Logo 1" 
              className="h-16 w-auto object-contain" 
            />
            
            {/* Logo 3 */}
            <img 
              src="/4.jpeg" 
              alt="Partner Logo 2" 
              className="h-16 w-auto object-contain" 
            />
            
            {/* Logo 4 */}
            <img 
              src="/5.jpeg" 
              alt="Partner Logo 3" 
              className="h-16 w-auto object-contain" 
            />
          </div>

          {/* Bottom Text */}
          <div className="text-center mt-6 text-xs text-black">
            DATE: JUNE 17, 2026<br/>TIME: 10am - 1pm<br/>VENUE: CONFERENCE HALL, PRESIDENTIAL VILLA, ABUJA
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-2xl mx-auto px-6 py-16">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-black text-black uppercase tracking-tight mb-3">
            Registration form
          </h1>
          {/*<p className="text-black/70 max-w-md mx-auto">
            Join us in shaping the future of youth development. Please fill in your details below.
          </p>*/}
        </div>

        <div className="bg-white border border-black p-8 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-sm font-bold text-black mb-2">
                Full Name <span className="text-emerald-600">*</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Amaka Okonkwo"
                className="w-full bg-white border border-black/70 text-black text-sm px-4 py-3 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all placeholder:text-black/40 rounded-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-2">
                Position / Title <span className="text-emerald-600">*</span>
              </label>
              <input
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="e.g. Director, Program Manager"
                className="w-full bg-white border border-black/70 text-black text-sm px-4 py-3 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all placeholder:text-black/40 rounded-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-2">
                Organisation <span className="text-emerald-600">*</span>
              </label>
              <input
                type="text"
                value={organisation}
                onChange={(e) => setOrganisation(e.target.value)}
                placeholder="e.g. Ministry of Youth Development"
                className="w-full bg-white border border-black/70 text-black text-sm px-4 py-3 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all placeholder:text-black/40 rounded-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-2">
                Address <span className="text-emerald-600">*</span>
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Street address, City, State"
                rows={3}
                className="w-full bg-white border border-black/70 text-black text-sm px-4 py-3 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all placeholder:text-black/40 resize-none rounded-sm"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-black mb-2">
                  Phone Number <span className="text-emerald-600">*</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="08012345678"
                  className="w-full bg-white border border-black/70 text-black text-sm px-4 py-3 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all placeholder:text-black/40 rounded-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-black mb-2">
                  Email Address <span className="text-emerald-600">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-white border border-black/70 text-black text-sm px-4 py-3 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all placeholder:text-black/40 rounded-sm"
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded">
                ⚠ {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-800 py-4 text-white font-bold text-lg transition-all mt-6"
            >
              {loading ? "Submitting..." : "Submit Registration"}
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