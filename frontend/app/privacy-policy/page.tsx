export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 flex flex-col gap-8">
      <h1 className="text-3xl font-bold border-b pb-4">
        Politique de confidentialité
      </h1>

     <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">1. Responsable du traitement</h2>
        <p className="text-gray-300 text-sm">
            Pour toute question relative à vos données personnelles, vous pouvez nous contacter
            via le formulaire disponible sur ce site.
        </p>
    </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">2. Données collectées</h2>
        <p className="text-gray-300 text-sm">
          Nous collectons uniquement les données suivantes :
        </p>
        <ul className="list-disc list-inside text-gray-300 text-sm flex flex-col gap-1">
          <li>Adresse email (pour la création de compte et l&apos;authentification)</li>
          <li>Mot de passe (stocké sous forme hachée, non lisible)</li>
          <li>Score de sobriété numérique (résultat du questionnaire)</li>
          <li>Date de création du compte</li>
        </ul>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">3. Utilisation des cookies</h2>
        <p className="text-gray-300 text-sm">
          Ce site utilise uniquement des cookies strictement nécessaires au fonctionnement
          de l&apos;authentification (token JWT). Aucun cookie de tracking, publicitaire
          ou analytique n&apos;est utilisé.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">4. Durée de conservation</h2>
        <p className="text-gray-300 text-sm">
          Vos données sont conservées tant que votre compte est actif. En cas de suppression
          de compte, toutes vos données personnelles sont effacées.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">5. Vos droits</h2>
        <p className="text-gray-300 text-sm">
          Conformément au RGPD, vous disposez des droits suivants :
        </p>
        <ul className="list-disc list-inside text-gray-300 text-sm flex flex-col gap-1">
          <li>Droit d&apos;accès à vos données personnelles</li>
          <li>Droit de rectification</li>
          <li>Droit à l&apos;effacement (droit à l&apos;oubli)</li>
          <li>Droit à la portabilité</li>
          <li>Droit d&apos;opposition</li>
        </ul>
        <p className="text-gray-300 text-sm">
          Pour exercer ces droits, utilisez le formulaire de contact disponible sur ce site.
        </p>
      </section>
    </div>
  );
}
