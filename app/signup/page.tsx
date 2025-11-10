"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { signUp } from "@/lib/actions/auth";
import DotGrid from "@/components/DotGrid";

export default function SignupPage() {
  const [state, formAction, pending] = useActionState(signUp, undefined);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="min-h-screen bg-[#8C2221] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-x-0 bottom-0 h-[40vh] bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: 'url(/fotter.avif)',
          zIndex: 0
        }}
      />

      {/* Background DotGrid */}
      <div className="absolute inset-0 z-1">
        <DotGrid
          dotSize={3}
          gap={20}
          baseColor="rgba(255, 255, 255, 0.3)"
          activeColor="#ffffff"
          proximity={100}
          style={{}}
        />
      </div>

      {/* Form Container */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white border border-gray-300/30 shadow-lg">
          <div className="p-6 sm:p-8 md:p-10">
            <div className="flex justify-start mb-6">
              <span className="px-2 py-1 bg-[#926AB0] text-[10px] font-semibold text-[#F3EDED]">
                FORM-BLOCK
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-[#533E3D] text-center mb-2 font-gaisyr">
              Create Account
            </h2>
            <p className="text-center text-gray-600 text-sm mb-6 sm:mb-8">
              Sign up for your Cardinal account
            </p>

            <form action={formAction} className="space-y-4 sm:space-y-5">
              {state?.error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {state.error}
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-[#533E3D] text-sm font-semibold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 bg-white text-[#533E3D] focus:outline-none focus:ring-2 focus:ring-[#809ACF] rounded"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-[#533E3D] text-sm font-semibold mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 bg-white text-[#533E3D] focus:outline-none focus:ring-2 focus:ring-[#809ACF] rounded"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#533E3D] transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-[#533E3D] text-sm font-semibold mb-2"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 bg-white text-[#533E3D] focus:outline-none focus:ring-2 focus:ring-[#809ACF] rounded"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#533E3D] transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={pending}
                className="w-full bg-[#8C2221] text-white px-8 py-4 font-semibold hover:bg-[#6d2421] transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded"
              >
                {pending ? "Creating account..." : "Sign Up"}
              </button>

              <p className="text-center text-gray-600 text-sm mt-4">
                Already have an account?{" "}
                <Link
                  href="/signin"
                  className="text-[#8C2221] hover:underline font-semibold"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
