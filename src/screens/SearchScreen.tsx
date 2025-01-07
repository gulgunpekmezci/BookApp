import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  RefreshControl,
  Image,
} from 'react-native';
import usePagination from '../hooks/usePagination';
import BookListItem from '../components/BookListItem';
import SomethingWentWrongImage from '../assets/SomethingWentWrong.png';
import {normalize} from '../helpers/helpers';

type Book = {
  key: string;
  title: string;
  author_name?: string[];
};

type BookDetail = {
  title: string;
  authors: {name: string}[];
  number_of_pages?: number;
  publish_date?: string;
};

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const flatListRef = useRef(null);
  const exampleImageUri = Image.resolveAssetSource(SomethingWentWrongImage).uri;
  const [isSearch, setIsSearch] = useState(false);

  const {data, refreshing, handleRefresh, loadMore, loading, hasError} =
    usePagination(query);

  const toTop = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({animated: true, offset: 0});
    }
  };

  // Search Button
  const handlePressButton = () => {
    toTop();
    handleRefresh(query);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Enter book title or author"
          value={query}
          onChangeText={setQuery}
        />
        <Pressable style={styles.button} onPress={handlePressButton}>
          <Text>Search</Text>
        </Pressable>
      </View>
      {hasError ? (
        <View>
          <Image source={{uri: exampleImageUri}} style={styles.image} />
          <Text style={styles.errorText}>Something went wrong!</Text>
        </View>
      ) : (
        <View style={styles.searchResultWrapper}>
          <FlatList
            data={data}
            testID="flatlist"
            ref={flatListRef}
            keyExtractor={(item, index) => String(index)}
            renderItem={({item}) => <BookListItem bookItem={item} />}
            persistentScrollbar
            onEndReached={loadMore}
            onEndReachedThreshold={0}
            scrollEventThrottle={16}
            contentContainerStyle={{paddingBottom: 20}}
            refreshing={loading}
            ItemSeparatorComponent={() => (
              <View style={styles.seperator} />
            )}></FlatList>
        </View>
      )}

      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: '100%',
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  searchWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: normalize(10),
  },
  input: {
    width: '70%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: normalize(4),
    padding: normalize(8),
  },
  button: {
    marginLeft: normalize(5),
    padding: normalize(8),
    backgroundColor: '#F4F1EA',
    borderWidth: normalize(1),
    borderColor: '#D6D0C4',
    borderStyle: 'solid',
  },
  buttonTitle: {
    color: '#33333',
    textAlign: 'center',
  },
  searchResultWrapper: {},
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    opacity: 0.7,
  },
  image: {
    width: normalize(400),
    height: normalize(400),
    resizeMode: 'contain',
    borderRadius: normalize(5),
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    textAlign: 'center',
    fontSize: 24,
    color: '#777',
    fontWeight: 700,
  },
  seperator: {backgroundColor: 'lightgrey', height: 1},
});

export default SearchScreen;
