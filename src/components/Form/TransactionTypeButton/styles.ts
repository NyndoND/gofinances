import styled, {css} from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import {Feather} from '@expo/vector-icons'
import { RFValue } from "react-native-responsive-fontsize";
import { GestureHandlerRootView } from "react-native-gesture-handler";

interface IconProps {
  type: 'income' | 'outcome';
}

interface ContainerProps {
  isActive: boolean;
  type: 'income' | 'outcome';
}

export const Container = styled.View`
  width: 48%
`;

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;

  color: ${({theme, type}) => 
    type === "income" ? theme.colors.sucess : theme.colors.attention 
  };
`;

export const Title = styled.Text`
font-family: ${({theme})=> theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;

export const Button = styled(RectButton)`
  
`;

export const GestureHandlerRootViewCustom = styled(GestureHandlerRootView)`
`;

export const ViewButton = styled.View<ContainerProps>`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  

  /*
  Forma resumida, onde cada propriedade é declarada
  border: 1.5px solid ${({theme})=> theme.colors.text};
  */
  border-width: ${({isActive })=> isActive ? 0 : 1.5}px;
  border-style: solid;
  border-color: ${({theme})=> theme.colors.text}; 
  border-radius: 5px;

  padding: 16px;

  ${({ isActive, type})=> isActive && type === 'income' && css`
    background-color: ${({theme})=> theme.colors.sucess_light};
  `};

  ${({ isActive, type})=> isActive && type === 'outcome' && css`
    background-color: ${({theme})=> theme.colors.attention_light};
  `};

`;