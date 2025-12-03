import React from "react";

interface AuthInputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

export const AuthInput: React.FC<AuthInputProps> = ({ label, type, name, value, onChange, placeholder }) => {
  return (
    <div>
      <label className="block text-xs font-sans text-[#f5f1e8]/50 mb-2 uppercase tracking-widest">
        {label}
      </label>
      <input 
        type={type} 
        name={name} 
        value={value} 
        onChange={onChange} 
        className="w-full px-4 py-3.5 bg-black/30 border border-[#f5f1e8]/10 rounded-xl text-[#f5f1e8] font-sans text-sm placeholder-[#f5f1e8]/25 focus:border-[#d4e8d4]/30 focus:bg-black/40 focus:outline-none focus:ring-1 focus:ring-[#d4e8d4]/20 transition-all duration-300 backdrop-blur-sm" 
        placeholder={placeholder} 
      />
    </div>
  );
};
