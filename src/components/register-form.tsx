"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ErrorResponse } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Combobox, Option } from "@/components/ui/combobox";


const formSchema = z.object({
  nome: z.string().min(1, { message: "Il nome è obbligatorio." }),
  cognome: z.string().min(1, { message: "Il cognome è obbligatorio." }),
  email: z.string().email({ message: "Inserisci un email valida." }),
  password: z.string().min(8, {
    message: "La password deve contenere almeno 8 caratteri.",
  }),
});

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      cognome: "",
      email: "",
      password: "",
    },
  });

  //TODO: ADD CONNECTION TO DB TO GET UNIVERSITY NAME HERE
  const universities: Option[] = [
    { value: "1", label: "Università degli Studi di Perugia" },
    { value: "2", label: "Università degli Studi di Milano" },
    { value: "3", label: "Università degli Studi di Roma" },
    { value: "4", label: "Università degli Studi di Napoli" },
    { value: "5", label: "Università degli Studi di Torino" },
    { value: "6", label: "Università degli Studi di Bologna" },
    { value: "7", label: "Università degli Studi di Firenze" },
    { value: "8", label: "Università degli Studi di Bari" },
  ]

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      await axios.post("/api/auth/register", values);

      toast("Registrazione effettuata");
      router.push("/");
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      toast.error(err.response?.data?.error || err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" onClick={() => toast.warning("Questa feature sarà presto disponibile")}>
          <svg
            className="mr-2 h-4 w-4"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="google"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
          >
            <path
              fill="currentColor"
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            ></path>
          </svg>
          Google
        </Button>
        <Button variant="outline" onClick={() => toast.warning("Questa feature sarà presto disponibile")}>
          <svg
            className="mr-2 h-4 w-4"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="microsoft"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M0 32h214.6v214.6H0V32zm233.4 0H448v214.6H233.4V32zM0 265.4h214.6V480H0V265.4zm233.4 0H448V480H233.4V265.4z"
            ></path>
          </svg>
          Microsoft
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-black" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Oppure</span>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Mario" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="cognome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cognome</FormLabel>
                <FormControl>
                  <Input placeholder="Rossi" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="you@university.edu" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="passwordConfirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Conferma Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="university"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Università</FormLabel>
                <FormControl>
                  <Combobox
                    placeholder="Seleziona la tua università"
                    {...field}
                    options={universities}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

          <Button type="submit" className="w-full text-primary-foreground" disabled={isLoading}>
            {isLoading ? "Caricamento..." : "Registrati"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
