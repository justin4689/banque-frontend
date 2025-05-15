 "use client";
import { useState } from "react";
import { toast } from "sonner";

import { SkeletonBox } from "../../../components/SkeletonBox"

import { logout } from "../../../lib/action/auth.action";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useProfile } from "@/hook/useProfile";
import Image from "next/image";

// Mocks de données
const MOCK_SOLDE = 1250.75;
const MOCK_HISTORIQUE = [
  { id: 1, expediteur: "Vous", destinataire: "FR123456789", montant: 100, date: "2025-05-10" },
  { id: 2, expediteur: "Vous", destinataire: "FR987654321", montant: 50, date: "2025-05-08" },
  { id: 3, expediteur: "FR112233445", destinataire: "Vous", montant: 200, date: "2025-05-01" },
];


export default function DashboardPage() {
  // Affichage sécurisé pour éviter écran blanc

  const [userData, setUserData] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [historique, setHistorique] = useState(MOCK_HISTORIQUE);
  const [solde, setSolde] = useState(MOCK_SOLDE);

  // Utilisation du hook useProfile
  const { data: profileData, isLoading, error } = useProfile();
  console.log(profileData);

  if (error) {
    return <div style={{color: 'red', textAlign: 'center', marginTop: '3rem'}}>Erreur lors du chargement du profil utilisateur</div>;
  }

  useEffect(() => {
    if (profileData) {
      setUserData(profileData.data);
      if (profileData.data && profileData.data.accounts && profileData.data.accounts.length > 0) {
        setSolde(profileData.data.accounts[0].balance);
      }
    }
  }, [profileData]);

  const [form, setForm] = useState({ destinataire: "", montant: "" });
  const [loading, setLoading] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setForm({ destinataire: "", montant: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Simulation succès/échec
      if (form.destinataire && Number(form.montant) > 0) {
        toast.success("Transfert effectué avec succès !");
        setSolde((s) => s - Number(form.montant));
        setHistorique([
          {
            id: Date.now(),
            expediteur: "Vous",
            destinataire: form.destinataire,
            montant: Number(form.montant),
            date: new Date().toISOString().slice(0, 10),
          },
          ...historique,
        ]);
        handleCloseModal();
      } else {
        toast.error("Veuillez remplir tous les champs correctement.");
      }
    }, 900);
  };

  const router = useRouter();
  const handleLogout = async () => {
    const res = await logout();
    if (res.success) {
      toast.success("Déconnexion réussie");
      router.push("/login");
    } else {
      toast.error(res.error || "Erreur lors de la déconnexion");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-6 flex flex-col items-center">
      {/* Barre du haut avec bouton Déconnexion */}
      <div className="w-full max-w-2xl flex justify-end mt-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded shadow transition-colors duration-200"
        >
          Déconnexion
        </button>
      </div>
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-4 sm:p-8 mt-4 sm:mt-8">

        <div className="flex justify-center items-center mb-2">
          <Image src="/logo.png" alt="Logo" width={80} height={80} className="sm:w-[100px] sm:h-[100px]" />
        </div>
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">Tableau de bord</h1>
        {/* Section informations utilisateur et comptes */}
        {isLoading ? (
          <section className="mb-8">
            <SkeletonBox className="h-6 w-48 mb-4" />
            <SkeletonBox className="h-5 w-32 mb-2" />
            <SkeletonBox className="h-10 w-full mb-4" />
            <SkeletonBox className="h-5 w-40 mb-2" />
            <SkeletonBox className="h-16 w-full mb-2" />
            <SkeletonBox className="h-16 w-full mb-2" />
          </section>
        ) : userData && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Informations du titulaire</h2>
            <div>Nom : <span className="font-bold">{userData.name}</span></div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4 mb-8">
              <button
                onClick={handleOpenModal}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded transition-colors duration-200 shadow"
              >
                Nouveau transfert
              </button>
            </div>
            <h3 className="text-lg font-semibold mt-4 mb-2">Compte(s)</h3>
            {userData.accounts && userData.accounts.map((account: any, idx: number) => (
              <div key={account.account_number} className="mb-2 p-2 border rounded">
                <div>Numéro Du Compte Bancaire: <span className="font-mono">{account.account_number}</span></div>
                <div>Solde : <span className="font-bold text-green-600">{account.balance.toLocaleString("fr-FR", { style: "currency", currency: "XOF" })}</span></div>
              </div>
            ))}
          </section>
        )}
       
        <h2 className="text-lg font-semibold mb-3 text-gray-700">Historique des transferts</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 py-2">Expéditeur</th>
                <th className="px-3 py-2">Destinataire</th>
                <th className="px-3 py-2">Montant</th>
                <th className="px-3 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {historique.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-400">Aucune transaction</td>
                </tr>
              ) : (
                historique.map((t) => (
                  <tr key={t.id} className="border-t">
                    <td className="px-3 py-2">{t.expediteur}</td>
                    <td className="px-3 py-2">{t.destinataire}</td>
                    <td className="px-3 py-2">{t.montant.toLocaleString("fr-FR", { style: "currency", currency: "XOF" })}</td>
                    <td className="px-3 py-2">{t.date}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal pour le transfert d'argent */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative animate-fadeIn">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl"
              onClick={handleCloseModal}
              aria-label="Fermer"
            >
              ×
            </button>
            <h3 className="text-xl font-bold mb-4 text-gray-800">Nouveau transfert</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="destinataire" className="block text-sm font-medium mb-1">Numéro de compte destinataire</label>
                <input
                  type="text"
                  id="destinataire"
                  name="destinataire"
                  className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
                  value={form.destinataire}
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
              </div>
              <div>
                <label htmlFor="montant" className="block text-sm font-medium mb-1">Montant (CFA)</label>
                <input
                  type="number"
                  id="montant"
                  name="montant"
                  min="1"
                  step="0.01"
                  className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
                  value={form.montant}
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded transition-colors duration-200 disabled:opacity-60"
                disabled={loading}
              >
                {loading ? "Transfert..." : "Confirmer"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}