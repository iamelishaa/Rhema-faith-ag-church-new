"use client";

import { Button } from "@/components/ui/button";
import { Loader2, Smartphone } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

interface PaymentButtonsProps {
  amount: number;
  category: string;
  onPaymentInit: () => void;
  onPaymentSuccess: () => void;
  onPaymentError: (error: Error) => void;
  upiId?: string;
  disabled?: boolean;
}

export default function PaymentButtons({
  amount,
  category,
  onPaymentInit,
  onPaymentSuccess,
  onPaymentError,
  upiId = "your-upi-id@okhdfcbank",
  disabled = false,
}: PaymentButtonsProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeMethod, setActiveMethod] = useState<string | null>(null);

  const handlePayment = async (method: "googlepay" | "phonepe") => {
    try {
      onPaymentInit();
      setIsProcessing(true);
      setActiveMethod(method);

      // Create payment URL based on method
      let paymentUrl: string;

      if (method === "googlepay") {
        paymentUrl = `upi://pay?pa=${encodeURIComponent(
          upiId
        )}&pn=${encodeURIComponent(
          "Rhema Faith AG Church"
        )}&am=${amount}&cu=INR&tn=Donation for ${encodeURIComponent(category)}`;

        // Try direct UPI first
        window.location.href = paymentUrl;

        // Fallback to Google Pay web if UPI app not found
        setTimeout(() => {
          if (document.visibilityState === "visible") {
            window.open(
              `https://gpay.app.goo.gl/${encodeURIComponent(paymentUrl)}`,
              "_blank"
            );
          }
        }, 500);
      } else if (method === "phonepe") {
        paymentUrl = `phonepe://pay?pa=${encodeURIComponent(
          upiId
        )}&pn=RhemaFaithAG&am=${amount}&cu=INR&tn=Donation for ${encodeURIComponent(
          category
        )}`;

        // Try direct PhonePe URL first
        window.location.href = paymentUrl;

        // Fallback to Play Store if app not installed
        setTimeout(() => {
          if (document.visibilityState === "visible") {
            window.open(
              "https://play.google.com/store/apps/details?id=com.phonepe.app",
              "_blank"
            );
          }
        }, 500);
      }

      // Consider the payment initiated successfully if we reach here without errors
      onPaymentSuccess();
    } catch (error) {
      console.error("Payment error:", error);
      onPaymentError(
        error instanceof Error ? error : new Error("Payment failed")
      );
    } finally {
      setIsProcessing(false);
      setActiveMethod(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Select Payment Method
        </h3>

        <Button
          type="button"
          variant="outline"
          onClick={() => handlePayment("googlepay")}
          disabled={isProcessing || disabled}
          className="w-full h-14 border-gray-300 hover:bg-gray-50 hover:border-gray-400 flex items-center justify-between px-6"
        >
          {isProcessing && activeMethod === "googlepay" ? (
            <Loader2 className="h-5 w-5 animate-spin text-gray-700" />
          ) : (
            <>
              <span className="text-gray-800 font-medium">Google Pay</span>
              <div className="relative h-6 w-24">
                <Image
                  src="/images/google-pay.svg"
                  alt="Google Pay"
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            </>
          )}
        </Button>

        <div className="my-4 flex items-center">
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="px-3 text-sm text-gray-500">OR</span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={() => handlePayment("phonepe")}
          disabled={isProcessing || disabled}
          className="w-full h-14 border-gray-300 hover:bg-gray-50 hover:border-gray-400 flex items-center justify-between px-6"
        >
          {isProcessing && activeMethod === "phonepe" ? (
            <Loader2 className="h-5 w-5 animate-spin text-gray-700" />
          ) : (
            <>
              <span className="text-gray-800 font-medium">PhonePe</span>
              <div className="flex items-center">
                <span className="text-xs text-gray-500 mr-2">Powered by</span>
                <div className="h-6 w-6 rounded-full bg-[#5F259F] flex items-center justify-center">
                  <Smartphone className="h-4 w-4 text-white" />
                </div>
              </div>
            </>
          )}
        </Button>

        <div className="mt-4 text-xs text-gray-500 text-center">
          <p>Secure and encrypted payments</p>
        </div>
      </div>
    </div>
  );
}
