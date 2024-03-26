const fs = require('fs');
const path = require('path');
const Migration = require('../models/migrationModel');

const runMigrations = async () => {
  try {

    // Get list of applied migrations
    const appliedMigrations = await Migration.find();

    // Get list of available migration scripts
    const migrationFiles = fs.readdirSync(path.join(process.cwd(), 'migrations')).sort();

    // Find pending migrations
    const pendingMigrations = migrationFiles.filter(migration => {
      const migrationName = migration.replace(/\.js$/, '');
      return !appliedMigrations.some(appliedMigration => appliedMigration.name === migrationName);
    });

    // Apply pending migrations
    for (const migrationFile of pendingMigrations) {
      const migrationName = migrationFile.replace(/\.js$/, '');
      console.log(`Applying migration: ${migrationName}`);
      const migrationScript = require(path.join(process.cwd(), 'migrations', migrationFile));
      await migrationScript.up(); // Execute migration script
      await Migration.create({ name: migrationName }); // Record applied migration
      console.log(`Migration applied: ${migrationName}`);
    }

    console.log('All migrations have been applied successfully.');
  } catch (error) {
    console.error('Error running migrations:', error);
    process.exit(1); // Exit process with error code
  }
}

module.exports = runMigrations;