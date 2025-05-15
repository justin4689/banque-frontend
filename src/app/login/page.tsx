"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Lock } from "lucide-react";
import { login } from "../../../lib/action/auth.action";
import { toast } from "sonner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link"; // N'oublie pas d'importer ceci en haut du fichier


const schema = z.object({
  email: z.string().email("Email invalide"),
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

type LoginForm = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();

  const {
    register: registerField,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: LoginForm) => {
    const result = await login(data.email, data.password);
    if (result.success) {
      toast.success("Connexion réussie !");
      router.push("/dashboard");

      reset();
    } else {
      toast.error(result.error || "Erreur inconnue");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-2 sm:px-4 md:px-8">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-3 sm:p-6 md:p-8">
        <div className="flex justify-center items-center mb-2">
          <Image src="/logo.png" alt="Logo" width={80} height={80} className="sm:w-[100px] sm:h-[100px]" />
        </div>
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-6">Connexion</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <div className="flex items-center border rounded px-3 py-2 focus-within:ring-2 focus-within:ring-yellow-400">
              <Mail size={18} className="text-gray-400 mr-2" />
              <input
                id="email"
                type="email"
                placeholder="Email"
                className="flex-1 outline-none bg-transparent text-xs sm:text-sm md:text-base"
                {...registerField("email")}
                disabled={isSubmitting}
                autoComplete="username"
              />
            </div>
            {errors.email && (
              <div className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </div>
            )}
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="password"
            >
              Mot de passe
            </label>
            <div className="flex items-center border rounded px-3 py-2 focus-within:ring-2 focus-within:ring-yellow-400">
              <Lock size={18} className="text-gray-400 mr-2" />
              <input
                id="password"
                type="password"
                placeholder="Mot de passe"
                className="flex-1 outline-none bg-transparent text-xs sm:text-sm md:text-base"
                {...registerField("password")}
                disabled={isSubmitting}
                autoComplete="current-password"
              />
            </div>
            {errors.password && (
              <div className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#EFDE49] hover:bg-yellow-400 text-black font-semibold py-2 rounded transition-colors duration-200 disabled:opacity-60 mt-2"
          >
            {isSubmitting ? "Connexion..." : "Se connecter"}
          </button>
        </form>
        <div className="text-center text-xs sm:text-sm mt-4">
          <span>Vous n'êtes pas encore inscrit ? </span>
          <Link href="/register" className="text-yellow-600 hover:underline">
            Créez un compte
          </Link>
        </div>
      </div>
    </div>
  );
}
