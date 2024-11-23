import {View, Text, StyleSheet, FlatList} from 'react-native';
import React from 'react';

const MyFlatList = props => {
  const {
    data,
    renderItem,
    keyExtractor,
    numColumns,
    horizontal,
    bottomComponents,
    scrollEnabled,
    ItemSeparatorComponent,
    columnWrapperStyle
  } = props;
  return (
    <View style={styles.flatListView}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={numColumns}
        horizontal={horizontal}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={bottomComponents}
        scrollEnabled={scrollEnabled}
        // scrollEnabled={false}
        ItemSeparatorComponent={ItemSeparatorComponent}
        columnWrapperStyle={columnWrapperStyle}
      />
    </View>
  );
};

export const styles = StyleSheet.create({
  flatListView: {},
});

export default MyFlatList;
