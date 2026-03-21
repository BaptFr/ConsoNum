"use client";

import { useState, useEffect } from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Button,
    RadioGroup,
    Radio,
    Spinner,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/auth";

import { calculateScore } from '@/lib/utils/scoreCalculator'


interface Reponse {
    id: number;
    texte: string;
    valeur: number;
}

interface Question {
    id: number;
    texte: string;
    categorie: string;
    reponses: Reponse[];
}

export default function CalculatorPage() {
    const router = useRouter();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [result, setResult] = useState<{
        score: number;
        profil: string;
        message: string;
    } | null>(null);

    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const token = getToken();
        if (!token) {
            router.push("/login");
            return;
        }

        //TODO refactor
        const fetchQuestions = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/question`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                const data = await res.json()
                setQuestions(Array.isArray(data) ? data : [])
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchQuestions()
    }, [router]);

    const handleAnswerChange = (questionId: number, reponseValeur: number) => {
        setAnswers((prev) => ({ ...prev, [questionId]: reponseValeur }));
    };


    const handleSubmit = async () => {
        if (Object.keys(answers).length < questions.length) {
            alert("Veuillez répondre à toutes les questions");
            return;
        }

        setSubmitting(true);

        const { score, profil, message } = calculateScore(answers)
        setResult({ score, profil, message });

        const token = getToken();

        if (!token) {
            console.error("Pas de token");
            setSubmitting(false);
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resultat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    score,
                    details: { profil, answers },
                }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.error("Erreur API:", response.status, errorData);
                alert(
                    `Erreur lors de la sauvegarde: ${errorData.error || "Erreur inconnue"}`,
                );
                setSubmitting(false);
                return;
            }

            const data = await response.json();
            console.log("Resultat sauvegardé:", data);
        } catch (err) {
            console.error("Erreur sauvegarde:", err);
            alert("Impossible de sauvegarder le résultat. Vérifiez votre connexion.");
            setSubmitting(false);
            return;
        }

        setSubmitting(false);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[80vh]">
                <Spinner size="lg" />
            </div>
        );
    }

    if (result) {
        return (
            <div className="container mx-auto p-4 max-w-2xl">
                <Card>
                    <CardHeader>
                        <h1 className="text-3xl font-bold text-center w-full">
                            Votre Résultat
                        </h1>
                    </CardHeader>
                    <CardBody className="text-center space-y-4">
                        <p className="text-6xl font-bold">{result.score}/30</p>
                        <p className="text-2xl font-semibold">{result.profil}</p>
                        <p className="text-lg text-default-600">{result.message}</p>
                        <div className="flex gap-4 justify-center mt-6">
                            <Button color="primary" onPress={() => router.push("/history")}>
                                Voir mon historique
                            </Button>
                            <Button variant="flat" onPress={() => window.location.reload()}>
                                Refaire le test
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 max-w-3xl">
            <Card>
                <CardHeader>
                    <h1 className="text-2xl font-bold">
                        Calculateur d&apos;Empreinte Numérique
                    </h1>
                </CardHeader>
                <CardBody className="space-y-6">
                    {questions.map((question) => (
                        <Card key={question.id} shadow="sm">
                            <CardBody>
                                <p className="font-semibold mb-2 text-small text-default-500">
                                    {question.categorie}
                                </p>
                                <p className="font-medium mb-4">{question.texte}</p>
                                <RadioGroup
                                    value={answers[question.id]?.toString()}
                                    onValueChange={(val) =>
                                        handleAnswerChange(question.id, parseInt(val))
                                    }
                                >
                                    {question.reponses.map((reponse) => (
                                        <Radio key={reponse.id} value={reponse.valeur.toString()} data-testid={`reponse-${reponse.id}`}>
                                            {reponse.texte}
                                        </Radio>
                                    ))}
                                </RadioGroup>
                            </CardBody>
                        </Card>
                    ))}

                    <Button
                        color="primary"
                        size="lg"
                        className="w-full"
                        onPress={handleSubmit}
                        isLoading={submitting}
                        isDisabled={Object.keys(answers).length < questions.length}
                    >
                        Calculer mon score
                    </Button>
                </CardBody>
            </Card>
        </div>
    );
}
