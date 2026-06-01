import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import Accordion from './accordion';
import accordionStubs from './accordion.stubs';
import { withCenteredModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Accordion>;

function AccordionStory() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Accordion>
      {accordionStubs.items.map((item, index) => (
        <Accordion.AccordionItem
          key={item.title}
          isActive={index === activeIndex}
          onToggle={() =>
            setActiveIndex((current) => (current === index ? -1 : index))
          }
          title={item.title}
        >
          <p>{item.body}</p>
        </Accordion.AccordionItem>
      ))}
    </Accordion>
  );
}

const meta: Meta<typeof Accordion> = {
  component: Accordion,
  decorators: [withCenteredModulePreview],
  render: () => <AccordionStory />,
  title: 'Accordion',
};

export const Default: Story = {};

export default meta;
