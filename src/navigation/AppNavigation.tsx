import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SearchScreen from '../screens/SearchScreen';
import BookInfoScreen from '../screens/BookInfoScreen';

// Define route params types
export type RootStackParamList = {
  Home: undefined;
  BookList: undefined;
  BookInfo: {
    bookName: string;
    author: string;
    firstPublishYear: number;
    imageUrl: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={SearchScreen}
        options={{title: 'Books'}}
      />
      <Stack.Screen
        name="BookInfo"
        component={BookInfoScreen}
        options={{title: 'Book Details'}}
        initialParams={{
          bookName: '',
          author: '',
          firstPublishYear: 0,
          imageUrl: '',
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
