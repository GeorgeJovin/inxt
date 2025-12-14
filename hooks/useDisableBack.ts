import { useEffect } from 'react';
import { BackHandler } from 'react-native';

export const useDisableBack = () => {
  useEffect(() => {
    const onBackPress = () => {
      // Returning true disables back action
      return true;
    };

    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress
    );

    return () => subscription.remove();
  }, []);
};
