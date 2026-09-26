import { SignIn } from "@clerk/nextjs";

export default function AuthPage() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 px-4 py-8 sm:px-6">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Sign in or create your account to continue
          </p>
        </div>

        <SignIn
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-in"
          fallbackRedirectUrl="/"
          appearance={{
            elements: {
              rootBox: "mx-auto w-full",
              card: "w-full rounded-2xl p-4 shadow-xl sm:p-6",
              headerTitle: "hidden",
              headerSubtitle: "hidden",

              socialButtonsBlockButton:
                "rounded-lg border border-slate-300 text-sm hover:bg-slate-50 sm:text-base",

              formButtonPrimary:
                "rounded-lg bg-slate-900 py-2.5 text-sm hover:bg-slate-800 sm:text-base",

              formFieldInput:
                "rounded-lg border-slate-300 text-sm sm:text-base",

              footerActionText: "text-sm",
              footerActionLink: "font-semibold text-slate-900",
            },
          }}
        />
      </div>
    </main>
  );
}