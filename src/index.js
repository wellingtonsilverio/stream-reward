import React, {useEffect, useState} from 'react';
import {Dimensions, View, Text, StatusBar} from 'react-native';
import {WebView} from 'react-native-webview';

import {getStreams} from './services/helix';

const windowsDimensions = Dimensions.get('window');

const Twitch = () => {
  const [stream, setStream] = useState(null);

  useEffect(() => {
    getChannel();
  }, []);

  const getChannel = async () => {
    const random = Math.random();

    const streams = await getStreams();
    const channelNames = streams.data.map(({user_name}) => user_name);

    if (random >= 1) {
      return setStream(channelNames[channelNames.length - 1]);
    }

    return setStream(channelNames[Math.floor(channelNames.length * random)]);
  };

  return (
    <>
      <StatusBar hidden />
      {stream ? (
        <>
          <View
            style={{
              marginHorizontal: 8 * 2,
              marginVertical: 8,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text>STREAM REWARD</Text>
            <View>
              <Text>H</Text>
            </View>
          </View>
          <View
            style={{
              width: windowsDimensions.width,
              height: windowsDimensions.width * 0.5625,
            }}>
            <WebView
              style={{flex: 1}}
              originWhitelist={['*']}
              source={{
                uri: `https://player.twitch.tv/?channel=${stream}&parent=moneta.io&autoplay=true&muted=false`,
              }}
              javaScriptEnabled={true}
              domStorageEnabled={true}
            />
          </View>
          <View style={{flex: 1}}>
            <WebView
              style={{flex: 1}}
              originWhitelist={['*']}
              source={{
                uri: `https://www.twitch.tv/embed/${stream}/chat?parent=moneta.io`,
              }}
              javaScriptEnabled={true}
              domStorageEnabled={true}
            />
          </View>
        </>
      ) : null}
    </>
  );
};

export default Twitch;
