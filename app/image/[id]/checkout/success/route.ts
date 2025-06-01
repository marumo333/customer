import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

export async function POST(request: Request) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json({ message: "sessionIdがありません" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const userId = session.client_reference_id;
    const productId = session.metadata?.productId;

    if (!userId || !productId) {
      return NextResponse.json({ message: "Session情報にuserIdまたはproductIdがありません" }, { status: 400 });
    }

    // 重複購入防止
    const existingPurchase = await prisma.purchase.findFirst({
      where: { userId, productId },
    });

    if (existingPurchase) {
      return NextResponse.json({ message: "すでに購入済みです" }, { status: 409 });
    }

    const purchase = await prisma.purchase.create({
      data: { userId, productId },
    });

    return NextResponse.json({ purchase }, { status: 200 });

  } catch (err: any) {
    console.error("Error in checkout complete:", err);

    if (err.type === 'StripeInvalidRequestError') {
      return NextResponse.json({ message: "Stripeセッションが無効です" }, { status: 400 });
    }

    return NextResponse.json({ message: err.message || "サーバーエラー" }, { status: 500 });
  }
}
