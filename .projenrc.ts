import { awscdk } from 'projen';
import { DependabotScheduleInterval } from 'projen/lib/github';

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Gregg Schofield',
  authorAddress: 'schofieldgregg@gmail.com',
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.5.0',
  name: 'cdk-construct-library',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/GreggSchofield/cdk-construct-library',

  depsUpgrade: false,
  dependabot: true,
  dependabotOptions: {
    scheduleInterval: DependabotScheduleInterval.DAILY,
  },

  gitIgnoreOptions: {
    ignorePatterns: [
      '.idea/',
    ],
  },

  codeCov: true,

  publishToGo: {
    moduleName: 'github.com/GreggSchofield/cdk-construct-library-go',
    githubTokenSecret: 'GO_GITHUB_TOKEN',
  },

  publishToNuget: {
    dotNetNamespace: 'GreggSchofield.CdkConstructLibrary',
    packageId: 'GreggSchofield.CdkConstructLibrary',
  },

  publishToPypi: {
    distName: 'GreggSchofield-cdk-construct-library',
    module: 'GreggSchofield_cdk-construct-library',
  },

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();