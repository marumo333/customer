"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      fetch("/api/checkout/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Purchase saved:", data);
        })
        .catch((err) => {
          console.error("Failed to save purchase:", err);
        });
    }
  }, [sessionId]);

  return (
    <div>
      <h1>決済が完了しました！</h1>
      <p>ご購入ありがとうございます。</p>
    </div>
  );
}
