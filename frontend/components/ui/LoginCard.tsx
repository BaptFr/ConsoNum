import { Card, CardHeader, CardBody, CardFooter } from "@heroui/react";
import { ReactNode } from "react";

interface LoginCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footerContent?: ReactNode;
}

export default function LoginCard({ title, subtitle, children, footerContent }: LoginCardProps) {
  return (
    <Card
      className="w-full max-w-sm border-none backdrop-blur-xl shadow-2xl rounded-lg bg-white/80"
      radius="lg"
    >
      <CardHeader className="flex flex-col gap-2 items-center justify-center pb-2 pt-8 ">
        <h1 className="text-3xl font-bold text-gray-800">
          {title}
        </h1>
        {subtitle && (
          <p className="text-small text-gray-600 font-medium text-center">
            {subtitle}
          </p>
        )}
      </CardHeader>
      <CardBody className="px-8 py-6 overflow-hidden">
        {children}
      </CardBody>

      {footerContent && (
        <CardFooter className="flex flex-col gap-2 justify-center pb-8 pt-0 ">
          {footerContent}
        </CardFooter>
      )}
    </Card>
  );
}
