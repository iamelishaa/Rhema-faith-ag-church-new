"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import PaymentButtons from "@/components/donation/PaymentButtons";

interface GivingCategory {
  id: string;
  name: string;
}

const GIVING_CATEGORIES: GivingCategory[] = [
  { id: "tithe", name: "Tithes (general 10% offering)" },
  { id: "offering", name: "Offerings (freewill giving beyond tithe)" },
  { id: "missions", name: "Missions (supporting missionaries)" },
  {
    id: "building",
    name: "Building Fund (construction, renovation, maintenance)",
  },
  {
    id: "benevolence",
    name: "Benevolence / Charity (helping families in need, local outreach)",
  },
  { id: "youth", name: "Youth Ministry" },
  { id: "children", name: "Children's Ministry" },
  { id: "worship", name: "Worship / Music Ministry" },
  { id: "general", name: "General Fund (wherever most needed)" },
];

export default function DonatePage() {
  const [amount, setAmount] = useState<number>(0);
  const [customAmount, setCustomAmount] = useState("");
  const [category, setCategory] = useState("general");
  const [showCustomAmount, setShowCustomAmount] = useState(false);
  const [selectedPresetAmount, setSelectedPresetAmount] = useState<
    number | null
  >(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const presetAmounts = [100, 500, 1000, 2000, 5000];

  const handleAmountSelect = (selectedAmount: number) => {
    setAmount(selectedAmount);
    setSelectedPresetAmount(selectedAmount);
    setShowCustomAmount(false);
    setCustomAmount("");
  };

  const handleCustomAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomAmount(value);
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue > 0) {
      setAmount(numValue);
      setSelectedPresetAmount(0); // Reset to 0 instead of null
    } else {
      setAmount(0);
      setSelectedPresetAmount(0); // Reset to 0 instead of null
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Support Our Ministry
          </h1>
          <p className="text-xl text-gray-600">
            Your generous donation helps us spread the word of God and support
            our community.
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Make a Donation
            </h2>

            <div className="mb-6">
              <label
                htmlFor="giving-category"
                className="block text-sm font-medium mb-2"
              >
                Select Giving Category
              </label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {GIVING_CATEGORIES.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <h3 className="text-lg font-medium mb-4">Select an amount (₹)</h3>

            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select an amount (₹)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                {presetAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleAmountSelect(amount)}
                    className={`px-4 py-3 rounded-lg border-2 text-lg font-medium transition-colors ${
                      selectedPresetAmount === amount && !showCustomAmount
                        ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    ₹{amount.toLocaleString()}
                  </button>
                ))}
                <button
                  onClick={() => {
                    setShowCustomAmount(true);
                    setAmount(0);
                  }}
                  className={`px-4 py-3 rounded-lg border-2 text-lg font-medium transition-colors ${
                    showCustomAmount
                      ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Custom
                </button>
              </div>

              {showCustomAmount && (
                <div className="mt-4">
                  <input
                    type="number"
                    value={customAmount}
                    onChange={handleCustomAmount}
                    placeholder="Enter custom amount"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    min="1"
                  />
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Payment Method
              </h3>

              {amount > 0 ? (
                <PaymentButtons
                  amount={amount}
                  category={
                    GIVING_CATEGORIES.find((c) => c.id === category)?.name ||
                    "Donation"
                  }
                  onPaymentInit={() => {
                    setIsProcessing(true);
                    toast.loading("Processing your donation...");
                  }}
                  onPaymentSuccess={() => {
                    toast.success("Payment successful! Thank you for your donation.");
                    // Reset form
                    setAmount(0);
                    setCustomAmount("");
                    setSelectedPresetAmount(0);
                  }}
                  onPaymentError={(error) => {
                    toast.error(
                      error.message || "Payment failed. Please try again."
                    );
                  }}
                />
              ) : (
                <div className="text-center py-4 text-gray-500">
                  Please select an amount to continue
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              Your donation is secure and encrypted. All major credit and debit
              cards are accepted.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
