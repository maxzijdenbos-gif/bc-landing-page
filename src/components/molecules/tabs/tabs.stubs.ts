type Tab = {
  tabContent: string;
  tabTitle: string;
};

type TabStubProps = {
  tabs: Tab[];
};

const defaultStub: TabStubProps = {
  tabs: [
    {
      tabContent: 'Road biking tab content',
      tabTitle: 'Road biking',
    },
    {
      tabContent: 'Cross & Gravel  biking tab content',
      tabTitle: 'Cross & Gravel biking',
    },
    {
      tabContent: 'Mountain biking tab content',
      tabTitle: 'Mountain biking',
    },
  ],
};

export default <Record<string, TabStubProps>>{
  default: defaultStub,
};
