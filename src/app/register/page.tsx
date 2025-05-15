'use client'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, Mail, Lock } from "lucide-react";
import { register as registerUser } from "../../../lib/action/auth.action";
import { toast } from "sonner";
import { useRouter } from 'next/navigation'

const schema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

type RegisterForm = z.infer<typeof schema>;

export default function RegisterPage() {
    const router = useRouter()
  const {
    register: registerField,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: RegisterForm) => {
    const result = await registerUser(data.name, data.email, data.password);
    if (result.success) {
      toast.success("Inscription réussie !");
      router.push("/login")

      reset();
    } else {
      toast.error(result.error || "Erreur inconnue");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-2 sm:px-4 md:px-8">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-3 sm:p-6 md:p-8">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-6">Créer un compte</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">Nom</label>
            <div className="flex items-center border rounded px-3 py-2 focus-within:ring-2 focus-within:ring-yellow-400">
              <User size={18} className="text-gray-400 mr-2" />
              <input
                id="name"
                type="text"
                placeholder="Nom"
                className="flex-1 outline-none bg-transparent text-xs sm:text-sm md:text-base"
                {...registerField("name")}
                disabled={isSubmitting}
                autoComplete="name"
              />
            </div>
            {errors.name && (
              <div className="text-red-500 text-xs mt-1">{errors.name.message}</div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
            <div className="flex items-center border rounded px-3 py-2 focus-within:ring-2 focus-within:ring-yellow-400">
              <Mail size={18} className="text-gray-400 mr-2" />
              <input
                id="email"
                type="email"
                placeholder="Email"
                className="flex-1 outline-none bg-transparent text-xs sm:text-sm md:text-base"
                {...registerField("email")}
                disabled={isSubmitting}
                autoComplete="email"
              />
            </div>
            {errors.email && (
              <div className="text-red-500 text-xs mt-1">{errors.email.message}</div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="password">Mot de passe</label>
            <div className="flex items-center border rounded px-3 py-2 focus-within:ring-2 focus-within:ring-yellow-400">
              <Lock size={18} className="text-gray-400 mr-2" />
              <input
                id="password"
                type="password"
                placeholder="Mot de passe"
                className="flex-1 outline-none bg-transparent text-xs sm:text-sm md:text-base"
                {...registerField("password")}
                disabled={isSubmitting}
                autoComplete="new-password"
              />
            </div>
            {errors.password && (
              <div className="text-red-500 text-xs mt-1">{errors.password.message}</div>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#EFDE49] hover:bg-yellow-400 text-black font-semibold py-2 rounded transition-colors duration-200 disabled:opacity-60 mt-2"
          >
            {isSubmitting ? "Inscription..." : "S'inscrire"}
          </button>
        </form>
        <div className="text-center text-xs sm:text-sm mt-4">
          <span>Vous avez déjà un compte ? </span>
          <a href="/login" className="text-yellow-600 hover:underline">Se connecter</a>
        </div>
      </div>
    </div>
  );
}