const defaultStub = {
  position: 'right' as const,
};

const drawerStubs = {
  default: defaultStub,
  left: { position: 'left' as const },
};

export default drawerStubs;
