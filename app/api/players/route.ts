import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.id || !body.nickname) return NextResponse.json({ error:"Nama pemain wajib diisi." }, { status:400 });
    const db = supabaseAdmin();
    const { error } = await db.from("players").upsert({
      id: body.id, nickname: String(body.nickname).slice(0,30),
      class_code: String(body.classCode || "UMUM").slice(0,20)
    });
    if (error) throw error;
    return NextResponse.json({ ok:true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error:"Data pemain belum tersimpan. Periksa konfigurasi basis data." }, { status:503 });
  }
}
