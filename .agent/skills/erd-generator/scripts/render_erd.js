import { exec } from 'node:child_process';

const inputFile = process.argv[2] || 'docs/architecture/schema.mmd';
const outputFile = process.argv[3] || 'docs/architecture/erd.svg';

const command = `npx mmdc -i ${inputFile} -o ${outputFile}`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error('SYNTAX_ERROR:');
    console.error(stderr || stdout || error.message);
    process.exit(1);
  }

  console.log('SUCCESS');
  process.exit(0);
});
