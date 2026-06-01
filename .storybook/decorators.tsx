import { Decorator } from '@storybook/nextjs-vite';
import Column from 'components/utilities/column/column';
import Container from 'components/utilities/container/container';
import ModulePreview from 'components/utilities/module-preview/module-preview';
import Row from 'components/utilities/row/row';

export const withCenteredModulePreview: Decorator = (
  Story,
  { globals: { color, themeName }, viewMode },
) => (
  <ModulePreview
    color={color}
    isDocs={viewMode === 'docs'}
    layout="centered"
    theme={themeName}
  >
    <Story />
  </ModulePreview>
);

export const withExtraHeight: Decorator = (Story) => (
  <div style={{ padding: '100vh 0' }}>
    <Story />
  </div>
);

export const withFullscreenModulePreview: Decorator = (
  Story,
  { globals: { color, themeName }, viewMode },
) => (
  <ModulePreview
    color={color}
    isDocs={viewMode === 'docs'}
    layout="fullscreen"
    theme={themeName}
  >
    <Story />
  </ModulePreview>
);

export const withFourColumnsOnLaptop: Decorator = (Story) => (
  <Container>
    <Row>
      <Column offset={{ laptop: 4 }} width={{ laptop: 4 }}>
        <Story />
      </Column>
    </Row>
  </Container>
);

export const withSixColumnsOnLaptop: Decorator = (Story) => (
  <Container>
    <Row>
      <Column offset={{ laptop: 3 }} width={{ laptop: 6 }}>
        <Story />
      </Column>
    </Row>
  </Container>
);

export const withSixColumnsOnTablet: Decorator = (Story) => (
  <Container>
    <Row>
      <Column offset={{ tablet: 3 }} width={{ tablet: 6 }}>
        <Story />
      </Column>
    </Row>
  </Container>
);

export const asInModal: Decorator = (
  Story,
  { globals: { color, themeName }, viewMode },
) => {
  return (
    <ModulePreview
      color={color}
      isDocs={viewMode === 'docs'}
      layout="centered"
      theme={themeName}
    >
      <Container>
        <Row outerGutter={{ tablet: 'medium' }}>
          <Column offset={{ laptop: 1 }} width={{ laptop: 10 }}>
            <Story />
          </Column>
        </Row>
      </Container>
      <div id="modal-root"></div>
    </ModulePreview>
  );
};
