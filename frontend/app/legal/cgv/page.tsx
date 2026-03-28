import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Conditions Générales de Vente | ConsoNum",
  description: "Conditions générales de vente du service ConsoNum",
};

export default function CGVPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="mb-8 text-4xl font-bold">Conditions Générales de Vente</h1>
      
      <div className="prose prose-invert max-w-none space-y-8">
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Objet</h2>
          <p>
            Les présentes Conditions Générales de Vente (CGV) régissent la vente 
            du service de questionnaire proposé par ConsoNum, accessible à l&apos;adresse 
            <strong> https://consonum.fr</strong>.
          </p>
          <p>
            En validant votre commande, vous reconnaissez avoir pris connaissance 
            et accepter sans réserve l&apos;intégralité des présentes CGV.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Description du service</h2>
          <p>
            ConsoNum propose un questionnaire en ligne permettant d&apos;évaluer l&apos;empreinte 
            numérique de l&apos;utilisateur et d&apos;obtenir un score personnalisé accompagné 
            de recommandations.
          </p>
          <p>
            L&apos;accès au questionnaire est conditionné au paiement d&apos;un montant unique 
            de <strong>1,99 € TTC</strong>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Prix et paiement</h2>
          <p>
            Le prix du service est affiché en euros, toutes taxes comprises (TTC).
          </p>
          <p>
            Le paiement s&apos;effectue en ligne de manière sécurisée via la plateforme 
            <strong> Stripe</strong>. Les moyens de paiement acceptés sont : carte bancaire.
          </p>
          <p>
            Le paiement est exigible immédiatement lors de la commande. L&apos;accès au 
            questionnaire est activé dès réception du paiement.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Exécution du service</h2>
          <p>
            Le service (questionnaire et résultats) est fourni de manière instantanée 
            après validation du paiement.
          </p>
          <p>
            L&apos;utilisateur peut accéder à son historique de résultats via son espace personnel.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Droit de rétractation</h2>
          <p>
            Conformément à l&apos;article <strong>L221-28 du Code de la consommation</strong>, 
            le droit de rétractation ne peut être exercé pour les contrats de fourniture 
            de contenu numérique non fourni sur un support matériel dont l&apos;exécution a 
            commencé après accord préalable exprès du consommateur et renoncement exprès 
            à son droit de rétractation.
          </p>
          <p>
            En validant votre commande, vous acceptez expressément que le service soit 
            exécuté immédiatement et renoncez à votre droit de rétractation.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Responsabilité</h2>
          <p>
            ConsoNum s&apos;engage à fournir le service avec diligence, conformément aux 
            règles de l&apos;art. Toutefois, ConsoNum ne saurait être tenu responsable :
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Des dommages indirects ou immatériels</li>
            <li>De l&apos;inexactitude des informations fournies par l&apos;utilisateur</li>
            <li>D&apos;une interruption temporaire du service pour maintenance</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble du contenu du site (textes, images, logos, questionnaire) est 
            la propriété exclusive de ConsoNum et est protégé par le droit d&apos;auteur.
          </p>
          <p>
            Toute reproduction, distribution ou utilisation sans autorisation est interdite.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Données personnelles</h2>
          <p>
            Les données personnelles collectées sont traitées conformément à notre{" "}
            <a href="/privacy-policy" className="text-green-400 underline">
              Politique de Confidentialité
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Litige et loi applicable</h2>
          <p>
            Les présentes CGV sont soumises au droit français. En cas de litige, 
            une solution amiable sera recherchée avant toute action judiciaire.
          </p>
          <p>
            À défaut, les tribunaux français seront seuls compétents.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">10. Contact</h2>
          <p>
            Pour toute question relative aux présentes CGV ou à votre commande :<br/>
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