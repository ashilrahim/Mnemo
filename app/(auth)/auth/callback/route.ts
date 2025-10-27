import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  
  // Always redirect to dashboard
  // The middleware will handle session refresh
  const redirectUrl = new URL("/dashboard", requestUrl.origin);
  
  // If there's an error, pass it as a query param
  if (requestUrl.searchParams.get("error")) {
    redirectUrl.searchParams.set("error", requestUrl.searchParams.get("error")!);
    return NextResponse.redirect(redirectUrl);
  }

  if (code) {
    const supabase = createClient();
    // Exchange the code for a session
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (error) {
      redirectUrl.searchParams.set("error", error.message);
    }
  }

  // Redirect to dashboard after OAuth callback
  return NextResponse.redirect(redirectUrl);
}
