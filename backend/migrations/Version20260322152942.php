<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260322152942 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE question DROP add_another_property');
        $this->addSql('ALTER TABLE reponse DROP add_another_property');
        $this->addSql('ALTER TABLE user ADD has_paid TINYINT(1) DEFAULT 0 NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE reponse ADD add_another_property LONGTEXT DEFAULT NULL');
        $this->addSql('ALTER TABLE user DROP has_paid');
        $this->addSql('ALTER TABLE question ADD add_another_property LONGTEXT DEFAULT NULL');
    }
}
