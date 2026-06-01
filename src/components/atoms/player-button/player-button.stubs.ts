import { PlayerButtonProps } from './player-button';

const defaultStub: PlayerButtonProps = {
  ariaLabel: 'Play video',
  iconName: 'Play_32',
};

export default <Record<string, PlayerButtonProps>>{
  default: defaultStub,
};
