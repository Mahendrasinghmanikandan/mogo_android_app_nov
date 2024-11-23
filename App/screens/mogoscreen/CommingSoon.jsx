import {View, Text} from 'react-native';
import React from 'react';
import StatusBarComponents from '../../components/statusBarComponent';
import {styles} from './styles';

const CommingSoon = () => {
  return (
    <View
      style={[
        styles.viewContainer,
        {backgroundColor: activeColors.FLEX_VIEW_COLOR},
      ]}>
      <View>
        <Image
          source={{uri: _.get(route, 'params.state.category_image', '')}}
          style={{width: '100%', height: 300, objectFit: 'cover'}}
        />
        <View style={styles.nameView}>
          <Text style={styles.nameText}>
            {_.get(route, 'params.state.category_name', '')}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.iconView} onPress={backPress}>
        <Image source={assets.back} style={styles.arrowImg} />
      </TouchableOpacity>
    </View>
  );
};

export default CommingSoon;
