import Link from "next/link";
import LoginForm from "@/components/login-form";

export default function Page() {
  return (
    <div className="h-full relative flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex">
        <div className="absolute inset-0 bg-secondary" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Link href="/" className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M5 3a2 2 0 0 0-2 2" />
              <path d="M19 3a2 2 0 0 1 2 2" />
              <path d="M21 19a2 2 0 0 1-2 2" />
              <path d="M5 21a2 2 0 0 1-2-2" />
              <path d="M9 3h1" />
              <path d="M9 21h1" />
              <path d="M14 3h1" />
              <path d="M14 21h1" />
              <path d="M3 9v1" />
              <path d="M21 9v1" />
              <path d="M3 14v1" />
              <path d="M21 14v1" />
            </svg>
            My Uninotes
          </Link>
        </div>
        <div className="relative z-20 mt-auto"></div>
      </div>
      <div className="p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight">
              Accedi a My Uninotes
            </h1>
            <p className="text-sm text-muted-foreground">
              Inserisci le tue credenziali per accedere al tuo account
            </p>
          </div>
          <LoginForm />
          <p className="px-6 text-center text-sm text-muted-foreground">
            <Link
              href="/register"
              className="underline underline-offset-4 hover:text-primary"
            >
              Non hai un account? Registrati
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
