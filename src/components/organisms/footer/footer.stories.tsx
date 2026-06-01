import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import Component from './footer';
import footerStubs from './footer.stubs';
import { withFullscreenModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: footerStubs.default,
  component: Component,
  decorators: [withFullscreenModulePreview],
  title: 'Footer',
};

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const stub = footerStubs.default;

    for (const col of stub.linkColumns) {
      expect(canvas.getByText(col.header)).toBeInTheDocument();
      for (const link of col.links) {
        const el = canvas.getByText(link?.linkText ?? '');
        expect(el).toHaveAttribute('href', link?.externalLink ?? '');
      }
    }

    for (const social of stub.socialMediaLinks) {
      const linkText = social?.link?.[0]?.linkText ?? '';
      const el = canvas.getByTitle(linkText);
      expect(el).toHaveAttribute('href', social?.link?.[0]?.externalLink ?? '');
    }

    const lang = stub.languageLink;
    const langLink = canvas.getByLabelText(lang?.link?.[0]?.linkText ?? '');
    expect(langLink).toHaveAttribute(
      'href',
      lang?.link?.[0]?.externalLink ?? '',
    );
    expect(canvas.getByText(lang?.selectedLanguage ?? '')).toBeInTheDocument();

    const year = new Date().getFullYear().toString();
    const copyright = stub.copyrightText?.replace('{{year}}', year) ?? '';
    expect(canvas.getByText(copyright)).toBeInTheDocument();
  },
};

export default meta;
