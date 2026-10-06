---
name: kysely-migration-generator
description: Generate a type-safe Kysely database migration from a Mermaid ERD when the user asks to convert an ERD or database schema into a Kysely migration.
---
Kysely Migration Generator

Purpose
Read a Mermaid ERD and convert it into a Kysely database migration.
Translation Rules
Entities to Tables
Convert each Mermaid entity into a PostgreSQL table.
Use snake_case for table names.

Examples:
USERS -> users
BOOK_LOANS -> book_loans
LIBRARY_BOOKS -> library_books
Keys and Columns
Convert Mermaid attributes into database columns.
Primary keys marked with PK must become primary key columns.
Integer primary keys should use an auto-generating integer ID.
UUID primary keys should use UUIDs and an appropriate UUID generation method.
Foreign keys marked with FK must reference the correct parent table.
Foreign keys must use Kysely's references() method and:
.onDelete('cascade')

Example:
.addColumn("user_id", "integer", (column) =>
column.references("users.id").onDelete("cascade")
)

Cardinalities
For a one-to-many relationship:
||--o{
Put the foreign key on the many-side table.

For example:
USERS ||--o{ LOANS : has
means that loans should contain a user_id foreign key referencing users.id.
For a one-to-one relationship:
||--o|
Put the foreign key on the dependent table and make the foreign key unique.

Example:
.addColumn("profile_id", "integer", (column) =>
column
.references("profiles.id")
.unique()
)

Migration File

Create the generated migration in:
src/db/migrations/<timestamp>_<migration_name>.ts
The migration filename must contain a timestamp followed by a descriptive migration name.
Migration Structure
The migration must import Kysely and export both required functions:
up(db: Kysely<any>)
down(db: Kysely<any>)
The up function creates the required tables.
The down function removes the tables.
Table Creation Order
Create tables in dependency order.
Create a table before creating a foreign key that references that table.
Down Migration
The down function must drop tables in reverse dependency order.
If table B references table A, drop B before A.
Use ifExists() when dropping tables.
Existing Migration

Before creating a new migration, inspect:
src/db/migrations/001_initial_schema.ts
Use the existing migration as a reference for the project's Kysely style and database conventions.
Do not recreate tables that already exist unless the new migration specifically requires it.
Validation

After creating the migration:
Run npm run build.
Fix any TypeScript errors.
Run npm run migrate:up.
Fix any migration errors.

The migration is complete only when the project builds successfully and the migration runs successfully.