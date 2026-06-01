const propFnc = (
  /** @type {import('plop').NodePlopAPI} */
  plop,
) => {
  plop.setGenerator('Component', {
    actions: function (data) {
      var actions = [
        {
          path: '../components/{{kebabCase levelName}}/{{kebabCase componentName}}/{{kebabCase componentName}}.tsx',
          templateFile: 'plop-templates/component/component.tsx.hbs',
          type: 'add',
        },
        {
          path: '../components/{{kebabCase levelName}}/{{kebabCase componentName}}/{{kebabCase componentName}}.module.scss',
          templateFile: 'plop-templates/component/component.module.scss.hbs',
          type: 'add',
        },
        {
          path: '../components/{{kebabCase levelName}}/{{kebabCase componentName}}/{{kebabCase componentName}}.stories.tsx',
          templateFile: 'plop-templates/component/component.stories.tsx.hbs',
          type: 'add',
        },
        {
          path: '../components/{{kebabCase levelName}}/{{kebabCase componentName}}/{{kebabCase componentName}}.stubs.ts',
          templateFile: 'plop-templates/component/component.stubs.ts.hbs',
          type: 'add',
        },
      ];

      if (data.addTestFile === 'yes') {
        actions.push({
          path: '../components/{{kebabCase levelName}}/{{kebabCase componentName}}/{{kebabCase componentName}}.test.ts',
          templateFile: 'plop-templates/component/component.test.ts.hbs',
          type: 'add',
        });
      }

      return actions;
    },
    description: 'Add a new component',
    prompts: [
      {
        message: 'Enter the components name:',
        name: 'componentName',
        type: 'input',
      },
      {
        choices: ['atoms', 'molecules', 'organisms', 'templates'],
        message: 'What atomic level is the component on?',
        name: 'levelName',
        type: 'list',
      },
      {
        choices: ['yes', 'no'],
        message: 'Do you want to add a file for writing tests?',
        name: 'addTestFile',
        type: 'list',
      },
    ],
  });

  plop.setGenerator('Documentation', {
    actions: function (data) {
      if (data.type === 'Services') {
        return [
          {
            path: '../../docs/{{kebabCase type}}/{{kebabCase category}}/{{kebabCase title}}.md',
            templateFile:
              'plop-templates/documentation/{{ kebabCase type}}.md.hbs',
            type: 'add',
          },
        ];
      }

      if (data.type === 'Ways of Working') {
        return [
          {
            path: '../../docs/{{kebabCase type}}/{{kebabCase category}}/{{kebabCase title}}.md',
            templateFile:
              'plop-templates/documentation/{{ kebabCase type}}.md.hbs',
            type: 'add',
          },
        ];
      }

      return [
        {
          path: '../../docs/{{kebabCase type}}/{{kebabCase title}}.md',
          templateFile:
            'plop-templates/documentation/{{ kebabCase type}}.md.hbs',
          type: 'add',
        },
      ];
    },
    description: 'Generate documentation page',
    prompts: [
      {
        choices: ['Features', 'Services', 'Tech Stack', 'Ways of Working'],
        message: 'Choose location:',
        name: 'type',
        type: 'list',
      },
      {
        choices: function (data) {
          var choices = [''];

          if (data.type === 'Tech Stack') {
            return ['Alignment', 'Development', 'Testing', 'Tools'];
          }

          if (data.type === 'Ways of Working') {
            return [
              'General',
              'Design Patterns',
              'File Structure',
              'Scripting',
              'Styling',
            ];
          }

          return choices;
        },
        message: 'Choose category (press "enter" if not relevant):',
        name: 'category',
        type: 'list',
      },
      {
        message: 'Add a document title:',
        name: 'title',
        type: 'input',
      },
    ],
  });
};

export default propFnc;
