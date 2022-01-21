import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from 'react-native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useFocusEffect } from '@react-navigation/native';

import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionCardData,
} from "../../components/TransactionCard";
import { useTheme } from "styled-components";
import {
  Container,
  Header,
  UserInfo,
  Photo,
  User,
  UserGreeeting,
  UserName,
  UserWrapper,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
  LogoutButton,
  LoadContainer
} from "./styles";

import { useAuth } from "../../hooks/auth";

export interface DataListProps extends TransactionCardData {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}

interface HighlightData {
  entries: HighlightProps;
  expensives: HighlightProps;
  total: HighlightProps
}

export function Dashboard() {
  const [isLoading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);

  const theme = useTheme();
  const { signOut, user } = useAuth();

  function getLastTransactionDate(
    collection: DataListProps[], 
    type: 'income' | 'outcome'
    ){
    const collectionFilttered = collection
    .filter(transaction => transaction.type === type);

    if(collectionFilttered.length === 0) 
    return 0;

    const lastTransaction = new Date(
      new Date(Math.max.apply(Math, collectionFilttered
        .map(transaction => new Date(transaction.date).getTime()))))

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', { month: 'long' })}`;
  }

  async function loadTransactions() {
    const dataKey = `@gofinance:transactions_user:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensivesTotal = 0;


    const transactionsFormatted: DataListProps[] = transactions.map((item: DataListProps) => {

      if (item.type === 'income') {
        entriesTotal += Number(item.amount);
      } else {
        expensivesTotal += Number(item.amount);
      }

      const amount = Number(item.amount).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });


      const date = Intl.DateTimeFormat('pt-Br', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      }).format(new Date(item.date));


      return {
        id: item.id,
        name: item.name,
        amount,
        type: item.type,
        category: item.category,
        date: date,
      }

    });

    setTransactions(transactionsFormatted);

    const lastTransactionEntries = getLastTransactionDate(transactions, 'income');
    const lastTransactionExpensives = getLastTransactionDate(transactions, 'outcome');
    
    const totalInterval = lastTransactionExpensives === 0
    ? 'Não há transações' 
    : `01 a ${lastTransactionExpensives}`;

    const total = entriesTotal - expensivesTotal;

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: lastTransactionEntries === 0 
        ? 'Não há transações' 
        : `Última entrada dia ${lastTransactionEntries}`,
      },
      expensives: {
        amount: expensivesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: lastTransactionExpensives === 0
        ? 'Não há transações'
        : `Última saída dia ${lastTransactionExpensives}`,
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: totalInterval
      }
    })

    setLoading(false);
  }

  /* UseEffect para remover TODOS os itens da lista 
    useEffect(() => {
  
      loadTransactions();
      
      
      async function removeItems(){
        const dataKey = '@gofinance:transactions';
        await AsyncStorage.removeItem(dataKey);
      }
      removeItems();
    }, []);
  */

  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, []));

  return (
    <Container>
      {
        isLoading ?
          <LoadContainer>
            <ActivityIndicator
              color={theme.colors.primary}
              size="large"
            />
          </LoadContainer> :
          <>
            <Header>
              <UserWrapper>
                <UserInfo>
                  <Photo source={{ uri: user.photo }} />
                  <User>
                    <UserGreeeting>Olá,</UserGreeeting>
                    <UserName>{user.name}</UserName>
                  </User>
                </UserInfo>
                <GestureHandlerRootView>
                  <LogoutButton onPress={signOut}>
                    <Icon name="power" />
                  </LogoutButton>
                </GestureHandlerRootView>
              </UserWrapper>
            </Header>

            <HighlightCards>
              <HighlightCard
                type="up"
                title="Entradas"
                amount={highlightData.entries.amount}
                lastTransaction={highlightData.entries.lastTransaction}
              />
              <HighlightCard
                type="down"
                title="Saídas"
                amount={highlightData.expensives.amount}
                lastTransaction={highlightData.expensives.lastTransaction}
              />
              <HighlightCard
                type="total"
                title="Total"
                amount={highlightData.total.amount}
                lastTransaction={highlightData.total.lastTransaction}
              />
            </HighlightCards>

            <Transactions>
              <Title>Listagem</Title>

              <TransactionList
                data={transactions}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <TransactionCard data={item} />}
              />

            </Transactions>
          </>
      }
    </Container>
  )
}
