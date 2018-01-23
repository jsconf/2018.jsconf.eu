const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const wordwrap = require('wordwrap')(80);
const chalk = require('chalk');
const program = require('commander');
const {promisify} = require('util');
const {getSheetData} = require('./spreadsheet-api');
const {processSheet, simplifySpreadsheetData} = require('./spreadsheet-utils');
const rimraf = promisify(require('rimraf'));

const timeout = promisify(setTimeout);

const contentRoot = path.resolve(__dirname, '../../contents');
const sheetParams = {
  speakers: {
    templateGlobals: {
      template: 'pages/speaker.html.njk'
    },
    dataFieldName: 'speaker',
    contentPath: 'speakers'
  },
  talks: {
    templateGlobals: {
      template: 'pages/talk.html.njk'
    },
    dataFieldName: 'talk',
    contentPath: 'talks'
  }
};

// example https://docs.google.com/spreadsheets/d/1qgPWxuEohNuTUafleeiMbrJPecyho6GtPJBCbj-IrfM/edit
const rxSpreadsheetIdFromUrl = /^https:\/\/docs.google.com\/.*\/d\/([^/]+).*$/;

program
  .description(
    'import speaker- and talk-data from the specified spreadheet and ' +
      'update the files in contents/speakers and contents/talks'
  )
  .arguments('<spreadsheet>')
  .action(spreadsheet => {
    program.spreadsheetId = spreadsheet;

    if (rxSpreadsheetIdFromUrl.test(spreadsheet)) {
      program.spreadsheetId = spreadsheet.replace(rxSpreadsheetIdFromUrl, '$1');
    }
  })
  .option(
    '-p --production',
    "run in production-mode (don't import unpublished items)"
  )
  .option('-C --no-cleanup', "don't run cleanup before import")
  .parse(process.argv);

if (!program.spreadsheetId) {
  console.log(
    chalk.red.bold('A spreadsheet-id (or spreadsheet-url) is required.')
  );
  program.outputHelp();
  process.exit(1);
}

const filterUnpublished =
  program.production || process.env.NODE_ENV === 'production';

(async function main() {
  // ---- cleanup...
  if (program.cleanup) {
    console.log(chalk.gray('cleaning up...'));

    await Promise.all([rimraf(path.join(contentRoot, '{speakers,talks}/*md'))]);
  }

  // ---- fetch spreadsheet-data...
  console.log(chalk.gray('loading spreadsheet data...'));
  const sheets = simplifySpreadsheetData(
    await getSheetData(program.spreadsheetId, {
      readonly: true,

      async beforeOpenCallback(url) {
        console.log(
          chalk.white(
            '\n\n🔐  You first need to grant access to your ' +
              'google-spreadsheets to this program.\n  An ' +
              'authorization-dialog will be ' +
              'opened in your browser in 5 seconds.\n\n'
          ),
          chalk.blue.underline(url)
        );

        return await timeout(5000);
      }
    })
  );

  // ---- parse and generate markdown-files
  console.log(chalk.gray('awesome, that worked.'));
  Object.keys(sheets).forEach(sheetId => {
    const {templateGlobals, dataFieldName, contentPath} = sheetParams[sheetId];
    const records = processSheet(sheets[sheetId]);

    console.log(chalk.white('processing sheet %s'), chalk.yellow(sheetId));
    records
      // filter unpublished records when not in dev-mode.
      .filter(r => r.published || !filterUnpublished)

      // render md-files
      .forEach(record => {
        const filename = path.join(
          contentRoot,
          contentPath,
          `${record.id}${record.published ? '' : '-PREVIEW'}.md`
        );

        const {content, ...frontmatterData} = record;
        const frontmatter = yaml.safeDump({
          ...templateGlobals,
          [dataFieldName]: frontmatterData
        });

        console.log(
          ' --> writing %s',
          chalk.green(path.relative(process.cwd(), filename))
        );

        const markdownContent =
          '----\n\n' +
          '# THIS FILE WAS GENERATED AUTOMATICALLY.\n' +
          '# CHANGES MADE HERE WILL BE OVERWRITTEN.\n\n' +
          frontmatter.trim() +
          '\n\n----\n\n' +
          wordwrap(content);

        fs.writeFileSync(filename, markdownContent);
      });
  });
})().catch(err => console.error(err));
