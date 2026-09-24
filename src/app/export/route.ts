import type { NextRequest } from "next/server";

import { backendGetRaw } from "@/lib/backend";

export async function GET(request: NextRequest) {
  const res = await backendGetRaw(`/api/v1/export${request.nextUrl.search}`);

  return new Response(res.body, {
    status: res.status,
    headers: {
      "Content-Type": res.headers.get("content-type") ?? "application/octet-stream",
      "Content-Disposition": res.headers.get("content-disposition") ?? "attachment",
    },
  });
}
