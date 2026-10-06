---
name: erd-generator
description: Generate and validate Mermaid ERD diagrams when the user asks to design an ERD, database schema, data model, or database architecture diagram.
---
ERD Generator
Purpose
Create a Mermaid Entity-Relationship Diagram from the user's domain requirements.

Workflow
Read and understand the user's domain requirements.

Identify:
Entities
Primary keys (PK)
Foreign keys (FK)
Relationships
Relationship cardinalities

Create a Mermaid ERD using erDiagram syntax.

Write the Mermaid diagram directly to:
docs/architecture/schema.mmd

Run the renderer:
node scripts/render_erd.js docs/architecture/schema.mmd

Check the result of the renderer.

Self-Correction
If the renderer returns SYNTAX_ERROR:
Read the error message.
Find the problem in docs/architecture/schema.mmd.
Fix the Mermaid syntax.
Run the renderer again.
Retry up to 3 times.

Do not consider the ERD complete until the renderer succeeds.

Final Output
When the renderer succeeds:
Show the raw Mermaid ERD in a Mermaid code block.
Tell the user that the rendered diagram was created at:
docs/architecture/erd.svg