import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";
import { questions } from "@/lib/questions";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.playerId || !Array.isArray(body.answers) || body.answers.length === 0 || body.answers.length > questions.length) {
      return NextResponse.json({error:"Data jawaban tidak lengkap atau tidak valid."},{status:400});
    }

    // Kunci jawaban dan skor dihitung ulang di server, bukan mempercayai skor dari browser.
    const questionMap = new Map(questions.map(q => [q.id, q]));
    const validated = body.answers.map((item: any) => {
      const question = questionMap.get(String(item.questionId));
      if (!question) throw new Error("Ada soal yang tidak dikenal.");
      const answer = String(item.answer ?? "");
      return {
        question_id: question.id,
        category: question.category,
        answer,
        correct: answer === question.answer
      };
    });

    const db = supabaseAdmin();
    const { data: attempt, error: attemptError } = await db.from("attempts").insert({
      player_id: body.playerId,
      score: validated.filter(a => a.correct).length,
      total: validated.length
    }).select("id").single();
    if (attemptError) throw attemptError;

    const rows = validated.map(a => ({ attempt_id: attempt.id, ...a }));
    const { error } = await db.from("attempt_answers").insert(rows);
    if (error) throw error;
    return NextResponse.json({ok:true,attemptId:attempt.id});
  } catch (error) {
    console.error(error);
    return NextResponse.json({error:"Hasil belum dapat disimpan. Pastikan pemain dan basis data tersedia."},{status:503});
  }
}
