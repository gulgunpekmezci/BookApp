import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import defaultImage from '../assets/NoImageAvailable.jpg';
import {getImageUrl, normalize} from '../helpers/helpers';

// Types
type Book = {
  edition_key: string[];
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year: number;
};

type BookListItemProps = {
  bookItem: Book;
};

const BookListItem: React.FC<BookListItemProps> = ({bookItem}) => {
  const navigation = useNavigation();
  const [imageError, setImageError] = useState(false);
  const exampleImageUri = Image.resolveAssetSource(defaultImage).uri;

  // Press Detail
  const handlePress = () => {
    navigation.navigate('BookInfo', {
      bookName: bookItem?.title,
      author: bookItem?.author_name,
      firstPublishYear: bookItem?.first_publish_year,
      imageUrl: getImageUrl(bookItem?.edition_key?.[0], 'L'),
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.listContainer}>
        <Image
          source={
            imageError
              ? {uri: exampleImageUri}
              : {uri: getImageUrl(bookItem?.edition_key?.[0], 'S')}
          }
          onError={() => setImageError(true)}
          style={styles.image}
        />
        <View style={styles.infoContainer}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
            {bookItem?.title}
          </Text>
          {bookItem?.author_name?.length > 0 && (
            <Text ellipsizeMode="tail" numberOfLines={1} style={styles.author}>
              Author: {bookItem?.author_name.join(', ')}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
    paddingLeft: normalize(10),
  },
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: normalize(10),
  },
  image: {
    width: normalize(30),
    height: normalize(50),
    resizeMode: 'cover',
    borderRadius: 5,
  },
  infoContainer: {
    width: '85%',
    marginLeft: normalize(10),
  },
  title: {
    width: '100%',
    fontSize: normalize(16),
    fontWeight: 'bold',
    color: '#333',
  },
  author: {
    width: '95%',
    fontSize: normalize(14),
    color: '#666',
    overflow: 'hidden',
  },
});
export default BookListItem;
