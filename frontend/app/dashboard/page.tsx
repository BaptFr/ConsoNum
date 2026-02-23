'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/auth";
import { Card, CardBody, CardHeader, Spinner } from "@heroui/react";

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = getToken();

        if (!token) {
            router.push("/login");
            return;
        }

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error("Non autorisé");
                return res.json();
            })
            .then((data) => {
                setUser(data);
                setLoading(false);
            })
            .catch(() => {
                router.push("/login");
            });
    }, [router]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[80vh]">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <Card>
                <CardHeader>
                    <h1 className="text-2xl font-bold">Tableau de bord</h1>
                </CardHeader>
                <CardBody>
                    <p className="text-lg">Bienvenue ! <span className="font-semibold"></span> </p>
                    <p className="text-default-500 mt-2">Email : {user?.email}</p>
                    <p className="text-default-500 mt-2">Score actuel : {user?.score || 0}</p>
                    <p className="text-small text-default-400 mt-4">
                        Compte créé le : {user?.createdAt}
                    </p>
                </CardBody>
            </Card>
        </div>
    );
}