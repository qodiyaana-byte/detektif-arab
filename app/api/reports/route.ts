import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";

export async function GET(request: Request) {
  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i,"");
  if (!process.env.TEACHER_DASHBOARD_TOKEN || token !== process.env.TEACHER_DASHBOARD_TOKEN) {
    return NextResponse.json({error:"Akses tidak diizinkan."},{status:401});
  }
  try {
    const db = supabaseAdmin();
    const { data, error } = await db.from("attempts")
      .select("id,score,total,created_at,players(nickname,class_code),attempt_answers(category,correct)")
      .order("created_at",{ascending:false}).limit(500);
    if (error) throw error;
    return NextResponse.json({rows:data || []});
  } catch (error) {
    console.error(error);
    return NextResponse.json({error:"Laporan belum dapat dimuat."},{status:503});
  }
}
