import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation | ConsoNum",
  description: "Conditions générales d'utilisation du service ConsoNum",
};

export default function CGUPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="mb-8 text-4xl font-bold">Conditions Générales d&apos;Utilisation</h1>
      
      <div className="prose prose-invert max-w-none space-y-8">
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Objet</h2>
          <p>
            Les présentes Conditions Générales d&apos;Utilisation (CGU) définissent les 
            modalités et conditions d&apos;utilisation du site <strong>consonum.fr</strong>.
          </p>
          <p>
            En accédant au site, vous acceptez sans réserve les présentes CGU.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Accès au site</h2>
          <p>
            Le site est accessible gratuitement à tout utilisateur disposant d&apos;un 
            accès Internet. L&apos;accès au questionnaire est soumis au paiement d&apos;un 
            montant de 1,99 € TTC.
          </p>
          <p>
            ConsoNum se réserve le droit de suspendre, modifier ou interrompre 
            l&apos;accès au site sans préavis.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Création de compte</h2>
          <p>
            L&apos;utilisation de certaines fonctionnalités (questionnaire, historique) 
            nécessite la création d&apos;un compte utilisateur.
          </p>
          <p>
            L&apos;utilisateur s&apos;engage à fournir des informations exactes et à maintenir 
            ses identifiants confidentiels. Il est seul responsable de l&apos;utilisation 
            de son compte.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Obligations de l&apos;utilisateur</h2>
          <p>L&apos;utilisateur s&apos;engage à :</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Utiliser le site de manière conforme à sa destination</li>
            <li>Ne pas tenter de contourner les mesures de sécurité</li>
            <li>Ne pas diffuser de contenu illicite ou offensant</li>
            <li>Respecter les droits de propriété intellectuelle</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Propriété intellectuelle</h2>
          <p>
            Tous les éléments du site (textes, graphismes, logos, questionnaires) 
            sont la propriété exclusive de ConsoNum.
          </p>
          <p>
            Toute reproduction, même partielle, sans autorisation est interdite.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Données personnelles</h2>
          <p>
            ConsoNum collecte et traite vos données personnelles conformément au RGPD 
            et à notre{" "}
            <a href="/privacy-policy" className="text-green-400 underline">
              Politique de Confidentialité
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Cookies</h2>
          <p>
            Le site utilise des cookies pour améliorer l&apos;expérience utilisateur. 
            Vous pouvez les gérer via les paramètres de votre navigateur.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Responsabilité</h2>
          <p>
            ConsoNum ne saurait être tenu responsable :
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>D&apos;une interruption temporaire du service</li>
            <li>De l&apos;utilisation des résultats du questionnaire</li>
            <li>De dommages indirects liés à l&apos;utilisation du site</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Modification des CGU</h2>
          <p>
            ConsoNum se réserve le droit de modifier les présentes CGU à tout moment. 
            Les utilisateurs seront informés des modifications via le site.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">10. Loi applicable et juridiction</h2>
          <p>
            Les présentes CGU sont régies par le droit français. Tout litige sera 
            soumis aux tribunaux compétents.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">11. Contact</h2>
          <p>
            Pour toute question concernant les CGU :<br/>
            <strong>Email :</strong> contact@consonum.fr
          </p>
        </section>

        <p className="text-sm text-gray-500 mt-12 pt-8 border-t border-gray-700">
          Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>
    </div>
  );
}