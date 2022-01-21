import React from "react";
import { View } from "react-native";
import { RectButtonProps } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import {
  Container,
  Title,
  Icon,
  Button,
  GestureHandlerRootViewCustom,
  ViewButton,
} from './styles';

const icons = {
  income: 'arrow-up-circle',
  outcome: 'arrow-down-circle'
}

interface Props extends RectButtonProps {
  title: string;
  type: 'income' | 'outcome';
  isActive: boolean;
}

export function TransactionTypeButton({
  title,
  type,
  isActive,
  ...rest
}: Props) {
  return (
    <Container>
      <GestureHandlerRootViewCustom>
        <Button {...rest}>
          <ViewButton
            isActive={isActive}
            type={type}
          >
            <Icon
              name={icons[type]}
              type={type}
            />
            <Title>
              {title}
            </Title>
          </ViewButton>
        </Button>
      </GestureHandlerRootViewCustom>
    </Container>
  );
}