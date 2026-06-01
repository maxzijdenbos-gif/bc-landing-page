import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import NewsletterSignUpSuccess from './newsletter-sign-up-success/newsletter-sign-up-success';
import Component from './newsletter-sign-up';
import newsletterSignUpStubs from './newsletter-sign-up.stubs';
import { withCenteredModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: newsletterSignUpStubs.default,
  component: Component,
  decorators: [withCenteredModulePreview],
  title: 'NewsletterSignUp',
};

export const Default: Story = {};

export const FormInteraction: Story = {
  name: 'Form interaction',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const emailInput = canvas.getByRole('textbox', { name: /email/i });
    await expect(emailInput).toHaveAttribute('type', 'email');
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.tab();
    await expect(emailInput).toHaveValue('test@example.com');

    const checkbox = canvas.getByRole('checkbox');
    const legalLabel = canvas.getByTestId('newsletter-sign-up-legal-text');
    await expect(checkbox).not.toBeChecked();
    await userEvent.click(legalLabel);
    await expect(checkbox).toBeChecked();
    await userEvent.click(legalLabel);
    await expect(checkbox).not.toBeChecked();
  },
};

export const Success: StoryObj<typeof NewsletterSignUpSuccess> = {
  args: {
    headline: newsletterSignUpStubs.default.successHeadline,
    text: newsletterSignUpStubs.default.successText,
  },
  parameters: {
    controls: { include: ['headline', 'text'] },
  },
  render: (args) => <NewsletterSignUpSuccess {...args} />,
};

export default meta;
