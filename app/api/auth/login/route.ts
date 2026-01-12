import { NextResponse } from "next/server";
import { setAuthCookie } from "@/lib/auth";

export async function POST() {
  try {
    await setAuthCookie();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to authenticate" },
      { status: 500 }
    );
  }
}

