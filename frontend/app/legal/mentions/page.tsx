export const metadata = {
  title: "Mentions Légales | ConsoNum",
};

export default function MentionsPage() {
  return (
    <div className="h-screen mx-auto max-w-4xl px-6 py-16">
      <h1 className="mb-8 text-4xl font-bold">Mentions Légales</h1>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Éditeur du site</h2>
          <p><strong>Projet pédagogique</strong></p>
          <p>ConsoNum - Projet de formation</p>
          <p>Contact : contact@consonum.fr</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Hébergeur</h2>
            <p>DigitalOcean LLC</p>
            <p>101 Avenue of the Americas, 10th Floor</p>
            <p>New York, NY 10013, USA</p>
        </section>
      </div>
    </div>
  );
}