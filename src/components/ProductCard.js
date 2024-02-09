import {View, Text, Pressable, Image, StyleSheet} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import Loader from './Loader';

export default function ProductCard({products, loading}) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View>
        {loading ? (
          <Loader size="large" style={{marginTop: hp(10)}} color={'#FFC107'} />
        ) : products && products.length == 0 ? (
          <Text style={styles.empty}>No Products Found</Text>
        ) : (
          <MasonryList
            data={products}
            keyExtractor={item => item.id_product.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              <Card item={item} index={index} navigation={navigation} />
            )}
            onEndReachedThreshold={0.1}
          />
        )}
      </View>
    </View>
  );
}

const Card = ({item, index, navigation}) => {
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()
        .damping(12)}>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('ProductDetail', {...item})}>
        <Image source={{uri: item.image}} style={styles.image} />
        <Text style={styles.description}>
          {item.description.length > 20
            ? item.description.slice(0, 18) + '...'
            : item.description}
        </Text>
        <Text style={styles.price}>&#8377;{item.price}</Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: hp(3),
    marginBottom: hp(3),
  },
  empty: {
    alignSelf: 'center',
    marginTop: hp('1%'),
  },
  image: {
    width: '100%',
    height: hp(25),
    borderRadius: hp(1),
    resizeMode: 'cover',
  },
  description: {
    fontSize: hp(1.6),
    fontWeight: 'bold',
    color: '#333',
    marginTop: hp(1),
  },
  price: {
    fontSize: hp(1.6),
    fontWeight: 'bold',
    color: '#333',
    marginTop: hp(1),
  },
  button: {
    width: '100%',
    padding: 10,
    justifyContent: 'center',
    marginBottom: hp(2),
  },
});
