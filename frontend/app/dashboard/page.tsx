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
                    <h1 className="text-2xl font-bold">Informations du profil</h1>
                </CardHeader>
                <CardBody className="flex flex-col justify-start items-center gap-15">
                    <p className="text-default-500 mt-2">Email : </p> {user?.email}
                    <p className=" text-default-500 mt-10">
                        Compte créé le :
                    </p>
                     {user?.createdAt}
                </CardBody>
            </Card>
        </div>
    );
}