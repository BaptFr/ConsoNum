export default function RegisterPendingPage() {
  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="w-full max-w-md p-8 border-gray-500 border-2 rounded-2xl bg-gray-900/60 flex flex-col items-center gap-6 text-center">
        <h1 className="text-2xl font-bold border-b pb-4 w-full">
          Vérifiez votre email
        </h1>
        <p className="text-default-500">
          Un email de confirmation vous a été envoyé. Cliquez sur le lien dans cet email pour activer votre compte.
        </p>
        <p className="text-sm text-default-400">
          Pensez à vérifier vos spams si vous ne trouvez pas l&apos;email.
        </p>
      </div>
    </div>
  );
}
