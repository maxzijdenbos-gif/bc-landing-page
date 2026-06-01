import { useContext } from 'react';
import BreakpointContext from 'libraries/contexts/breakpoint-context';
import { BreakpointInfo } from './use-setupBreakpoints';

const useBreakpoints = () => {
  const breakpointSettings = useContext<BreakpointInfo>(BreakpointContext);

  return breakpointSettings;
};

export default useBreakpoints;
