import React, {useState} from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import  defaultImage from '../assets/NoImageAvailable.jpg';
import { normalize } from '../helpers/helpers';

export type BookInfoScreenRouteProp = RouteProp<
  {
    BookInfo: {
      bookName: string;
      author: string[];
      firstPublishYear: number;
      imageUrl?: string;
    };
  },
  'BookInfo'
>;

const BookInfoScreen = () => {
  const route = useRoute<BookInfoScreenRouteProp>();
  const {bookName, author, firstPublishYear, imageUrl} = route.params;
  const [imageError, setImageError] = useState(false);
  const exampleImageUri = Image.resolveAssetSource(defaultImage).uri

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {imageUrl ? (
          <Image
            source={imageError ? {uri: exampleImageUri} : {uri: imageUrl}}
            style={styles.image}
            onError={() => setImageError(true)}
            accessibilityLabel={`${bookName} cover`}
          />
        ) : (
          <Text style={styles.placeholder}>No Image Available</Text>
        )}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{bookName}</Text>

        <FlatList
          data={author}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderItem={({item}) => <Text style={styles.author}>by {item}</Text>}
        />

        <Text style={styles.publishYear}>
          First Published: {firstPublishYear}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: normalize(16),
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  imageContainer: {
    padding: normalize(10),
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  placeholder: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginVertical: normalize(16),
  },
  infoContainer: {
    marginTop: normalize(20),
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: normalize(8),
  },
  author: {
    fontSize: 18,
    color: '#555',
    marginBottom: normalize(4),
  },
  publishYear: {
    fontSize: 16,
    color: '#777',
    marginTop: normalize(8),
  },
});

export default BookInfoScreen;
