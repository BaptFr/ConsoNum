'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/auth";
import { Card, CardBody, CardHeader, Spinner, Chip } from "@heroui/react";

interface Resultat {
  id: number;
  score: number;
  date: string;
  details?: {
    profil?: string;
  };
}

export default function HistoryPage() {
  const router = useRouter();
  const [resultats, setResultats] = useState<Resultat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/login");
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/resultat/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(" Réponse reçue:", res.status);

        if (!res.ok) {
          return res.json().then(
            (errorData) => {
              console.error(" Erreur API:", res.status, errorData);
              throw new Error(errorData.message || `HTTP ${res.status}`);
            },
            () => {
              // Si le JSON parse échoue (HTML d'erreur)
              console.error("Erreur serveur HTML");
              throw new Error(`Erreur serveur (${res.status})`);
            }
          );
        }

        return res.json();
      })

      .then((data) => {
        setResultats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [router]);

  const getProfilColor = (score: number) => {
    if (score <= 7) return "success";
    if (score <= 15) return "primary";
    if (score <= 22) return "warning";
    return "danger";
  };

  const getProfilLabel = (score: number) => {
    if (score <= 7) return "Exemplaire";
    if (score <= 15) return "Correct";
    if (score <= 22) return "À améliorer";
    return "Problématique";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (resultats.length === 0) {
    return (
      <div className="container mx-auto p-4 max-w-4xl">
        <Card>
          <CardBody className="text-center py-12">
            <p className="text-xl text-default-500">Aucun résultat enregistré</p>
            <p className="text-sm text-default-400 mt-2">
              Faites votre premier test pour voir votre historique
            </p>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold">Mon Historique</h1>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            {resultats.map((resultat) => (
              <Card key={resultat.id} shadow="sm">
                <CardBody className="flex flex-row items-center justify-between">
                  <div>
                    <p className="text-small text-default-500">
                      {new Date(resultat.date).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                    <p className="font-semibold text-lg mt-1">
                      Score : {resultat.score}/30
                    </p>
                  </div>
                  <Chip color={getProfilColor(resultat.score)} variant="flat" size="lg">
                    {getProfilLabel(resultat.score)}
                  </Chip>
                </CardBody>
              </Card>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}