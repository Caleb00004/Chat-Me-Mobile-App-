import ScreenContainer from '@/components/primary/ScreenContainer';
import ThemeText from '@/components/primary/ThemeText';
import React from 'react';
import { View } from 'react-native';

const Updates = React.memo(() => {

  console.log("Updates screen")

  return (
    <ScreenContainer>
      <ThemeText>Status updates Screen</ThemeText>

      <ThemeText>Status</ThemeText>
      <ThemeText>User1, user2, user3</ThemeText>
    </ScreenContainer>
  );
})

export default Updates