import { generateFiles, readProjectConfiguration, Tree } from '@nrwl/devkit';
import { join } from 'path';
import { StringCase } from 'util-string-case';
import { tsquery } from '@phenomnomnominal/tsquery';

interface CreateRestResourceParams {
  name: string;
  project: string;
  directory: string;
}

const generateFilesFromTemplates = (
  tree: Tree,
  schema: CreateRestResourceParams
): void => {
  const name = schema.name;
  const project = schema.project;
  const directory = schema.directory;
  const projectRoot = readProjectConfiguration(tree, project).root;
  const camelCaseName = new StringCase(name).makeCamelCase();
  const pascalCaseName = new StringCase(name).makePascalCase();
  const dashCaseName = new StringCase(name).makeDashCase();
  const templateDirectoryPath = join(__dirname, 'files');
  const resourceDirectoryPath = join(projectRoot, 'src', directory, name);
  const templateSubstitutionParams = {
    name,
    camelCaseName,
    pascalCaseName,
    dashCaseName,
    template: '',
  };
  generateFiles(
    tree,
    templateDirectoryPath,
    resourceDirectoryPath,
    templateSubstitutionParams
  );
};

const updateAppModule = (tree: Tree, schema: CreateRestResourceParams) => {
  const name = schema.name;
  const project = schema.project;
  const pascalCaseName = new StringCase(name).makePascalCase();
  const dashCaseName = new StringCase(name).makeDashCase();
  const moduleName = `${pascalCaseName}Module`;
  const projectRoot = readProjectConfiguration(tree, project).root;
  const appModuleFilePath = join(projectRoot, 'src', 'app', 'app.module.ts');
  const appModuleContent = tree.read(appModuleFilePath, 'utf8');

  const esImportAstSelector = 'ImportDeclaration:nth-last-child(2)';
  let newAppModuleContent = tsquery.replace(
    appModuleContent,
    esImportAstSelector,
    (lastEsImportNode) => {
      const lastEsImport = lastEsImportNode.getText();
      const newEsImport = `import { ${moduleName} } from './${dashCaseName}/${dashCaseName}.module';`;
      return [lastEsImport, newEsImport].join('\n');
    }
  );
  const nestImportAstSelector =
    'ClassDeclaration > Decorator > CallExpression > ObjectLiteralExpression > PropertyAssignment:has(Identifier[name="imports"]) > ArrayLiteralExpression > *:nth-last-child(1)';
  newAppModuleContent = tsquery.replace(
    newAppModuleContent,
    nestImportAstSelector,
    (lastNestImportNode) => {
      const lastNestImport = lastNestImportNode.getText();
      const newNestImport = `${pascalCaseName}Module`;
      return [lastNestImport, newNestImport].join(',\n    ');
    }
  );
  tree.write(appModuleFilePath, newAppModuleContent);
};

export default function (tree: Tree, schema: CreateRestResourceParams) {
  generateFilesFromTemplates(tree, schema);
  updateAppModule(tree, schema);
}
