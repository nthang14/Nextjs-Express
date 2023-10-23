import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isLoginPage = (url: string) => {
  return url.includes("/auth/login");
};
const isGeneratePage = (url: string) => {
  return url.includes("/generate-wallet");
};
export function middleware(request: NextRequest) {
  // no token && go to the page without login => redirect '/auth/login'
  // no token && go to the page login => next
  // token && go to the page login => redirect '/'
  // token && go to the page without login => next

  // no token && go to the page without login => redirect '/auth/login'
  // no token && go to the page login => next

  const isMnemonic = !!request.cookies.get("mnemonic_encrypted")?.value;
  const isOtp = !!request.cookies.get("otp")?.value;
  const isToken = isMnemonic || isOtp;

  let url = "/auth/login";
  if (isToken && isLoginPage(request.url)) {
    url = "/";
    if (isOtp && !isMnemonic) {
      url = "/generate-wallet";
    }
  }
  // return isToken !== isLoginPage(request.url)
  //   ? NextResponse.next()
  //   : NextResponse.redirect(new URL(url, request.url));
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|404|500).*)"],
};
