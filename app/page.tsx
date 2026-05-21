"use client";

import { useState, useEffect } from "react";
import { Country, State, City } from "country-state-city";

export default function RegistrationPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [position, setPosition] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [buildingApart, setBuildingApart] = useState("");
  const [street, setStreet] = useState("");

  useEffect(() => {
    setSelectedState("");
    setSelectedCity("");
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) setSelectedCity("");
  }, [selectedState]);

  const validateForm = () => {
    if (!firstName.trim()) return "First name is required";
    if (!lastName.trim()) return "Last name is required";
    if (!position.trim()) return "Position is required";
    if (!organisation.trim()) return "Organisation is required";
    if (!phone.trim()) return "Phone number is required";
    if (!/^\+?[0-9\s\-]{7,15}$/.test(phone.trim())) return "Valid phone number is required";
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) return "Valid email is required";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    const err = validateForm();
    if (err) { setError(err); return; }

    setLoading(true);

    const countryName = Country.getCountryByCode(selectedCountry)?.name || selectedCountry;
    const stateName = State.getStateByCodeAndCountry(selectedState, selectedCountry)?.name || selectedState;

    const payload = {
      first_name: firstName,
      last_name: lastName,
      number_of_guests: numberOfGuests,
      position,
      organisation,
      address: {
        ...(countryName && { country: countryName }),
        ...(stateName && { state: stateName }),
        ...(selectedCity && { city: selectedCity }),
        ...(buildingApart && { building_apart: buildingApart }),
        ...(street && { street }),
      },
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
        setSuccessMessage("Successful. Thank you for registering.");
        setTimeout(() => window.location.reload(), 3000);
        return;
      }

      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Submission failed. Please try again.");
    } catch {
      setError("Network error. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-white border border-black/70 text-black text-sm px-4 py-3 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all placeholder:text-black/40 rounded-sm";
  const optionalLabel = <span className="text-black/40 font-normal text-xs ml-1">(optional)</span>;

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
            <p className="text-red-800 text-xs text-right">DRIVEN BY A <br/> STRATEGIC <br/> PARTNESHIP OF:</p>
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
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-black text-black uppercase tracking-tight mb-3">
            Registration Form
          </h1>
        </div>

        <div className="bg-white border border-black p-8 sm:p-10">
          {successMessage ? (
            <div className="p-8 text-center bg-emerald-50 border-2 border-emerald-600 rounded-sm my-4" role="status">
              <p className="text-xl font-black text-emerald-900 uppercase tracking-wide mb-2">Success!</p>
              <p className="text-base font-bold text-black">{successMessage}</p>
              <p className="text-xs text-emerald-800/60 mt-4 animate-pulse">Refreshing registration window...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">

              {/* Required fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-black mb-2">First Name <span className="text-emerald-600">*</span></label>
                  <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="e.g. Amaka" className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-black mb-2">Last Name <span className="text-emerald-600">*</span></label>
                  <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="e.g. Okonkwo" className={inputClass} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-black mb-2">Position / Title <span className="text-emerald-600">*</span></label>
                <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} placeholder="e.g. Director, Program Manager" className={inputClass} />
              </div>

              <div>
                <label className="block text-sm font-bold text-black mb-2">Organisation <span className="text-emerald-600">*</span></label>
                <input type="text" value={organisation} onChange={(e) => setOrganisation(e.target.value)} placeholder="e.g. Ministry of Youth Development" className={inputClass} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-black mb-2">Phone Number <span className="text-emerald-600">*</span></label>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="08012345678" className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-black mb-2">Email Address <span className="text-emerald-600">*</span></label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={inputClass} />
                </div>
              </div>

              {/* Optional: Number of Guests */}
              <div>
                <label htmlFor="numberOfGuests" className="block text-sm font-bold text-black mb-2">
                  Number of Guests {optionalLabel}
                </label>
                <div className="flex items-center border border-black/70 rounded-sm w-36">
                  <button type="button" onClick={() => setNumberOfGuests(Math.max(1, numberOfGuests - 1))} className="px-4 py-3 text-lg font-bold text-black hover:bg-gray-100 transition-colors select-none">−</button>
                  <input id="numberOfGuests" type="number" min={1} max={10} value={numberOfGuests} onChange={(e) => setNumberOfGuests(Math.min(10, Math.max(1, Number(e.target.value))))} className="w-full text-center text-sm font-bold text-black bg-white outline-none py-3 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" />
                  <button type="button" onClick={() => setNumberOfGuests(Math.min(10, numberOfGuests + 1))} className="px-4 py-3 text-lg font-bold text-black hover:bg-gray-100 transition-colors select-none">+</button>
                </div>
              </div>

              {/* Optional: Address */}
              <div className="border-t border-gray-100 pt-6 space-y-6">
                <h3 className="text-md font-bold text-black uppercase tracking-wider">
                  Address Details {optionalLabel}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-black mb-2">Country</label>
                    <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} className={inputClass}>
                      <option value="">Select Country</option>
                      {Country.getAllCountries().map((country) => (
                        <option key={country.isoCode} value={country.isoCode}>{country.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-black mb-2">State</label>
                    <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} className={inputClass} disabled={!selectedCountry}>
                      <option value="">Select State</option>
                      {selectedCountry && State.getStatesOfCountry(selectedCountry).map((state) => (
                        <option key={state.isoCode} value={state.isoCode}>{state.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-black mb-2">City</label>
                    <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className={inputClass} disabled={!selectedState}>
                      <option value="">Select City</option>
                      {selectedCountry && selectedState && City.getCitiesOfState(selectedCountry, selectedState).map((city) => (
                        <option key={city.name} value={city.name}>{city.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-black mb-2">Building / Apt Number</label>
                    <input type="text" value={buildingApart} onChange={(e) => setBuildingApart(e.target.value)} placeholder="e.g. Apt 4B" className={inputClass} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-2">Street</label>
                  <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} placeholder="e.g. 123 Main Street" className={inputClass} />
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded" role="alert">
                  ⚠ {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-800 py-4 text-white font-bold text-lg transition-all mt-6"
              >
                {loading ? "Submitting..." : "Submit Registration"}
              </button>
            </form>
          )}
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