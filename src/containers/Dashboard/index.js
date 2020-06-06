import React, {useEffect, useState, useRef} from 'react';
import {Dimensions, View, Text as NativeText} from 'react-native';
import {WebView} from 'react-native-webview';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';

import playerHTML from './player';
import styles from './styles';

import {getStreams} from '../../services/helix';
import colors from '../../utils/colors';

const Text = (props) => (
  <NativeText {...props} style={[props.style, {color: colors.white}]}>
    {props.children}
  </NativeText>
);

const windowsDimensions = Dimensions.get('window');

const Dashboard = () => {
  const playerRef = useRef();

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

  const getInjectScript = () => {
    const width = windowsDimensions.width * windowsDimensions.scale;
    const height = windowsDimensions.width * 0.5625 * windowsDimensions.scale;

    return `
      (function ready() {
        var options = {
          width: ${width},
          height: ${height},
          channel: "${stream}",
        };
        var player = new Twitch.Player('player', options);
        player.addEventListener(Twitch.Player.PLAY, e => window.ReactNativeWebView.postMessage('PLAY'))
        player.addEventListener(Twitch.Player.PAUSE, e => window.ReactNativeWebView.postMessage('PAUSE'))
        player.addEventListener(Twitch.Player.ENDED, e => window.ReactNativeWebView.postMessage('ENDED'))
        player.addEventListener(Twitch.Player.READY, e => {
          player.setVolume(0.2);
          player.setMuted(false);
        })
        window.ReactNativeWebView.postMessage('INIT');
      })();`;
  };

  const handleOnMessage = ({nativeEvent}) => {
    console.log(nativeEvent.data);

    switch (nativeEvent.data) {
      case 'ENDED':
        getChannel();
        break;

      default:
        break;
    }
  };

  if (!stream) {
    return (
      <View>
        <Text>Carregando</Text>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>STREAM REWARD</Text>
        <View style={styles.topBarContainer}>
          <View style={styles.topBarContainerMonetas}>
            <Text style={styles.topBarContainerMonetasCoin}>M</Text>
            <Text style={styles.topBarContainerMonetasValue}>100.21</Text>
          </View>
          <FontAwesomeIcon icon={faBars} size={8 * 3} color={colors.white} />
        </View>
      </View>
      <View
        style={{
          width: windowsDimensions.width,
          height: windowsDimensions.width * 0.5625,
        }}>
        <WebView
          allowsFullscreenVideo
          javaScriptEnabled
          injectedJavaScript={getInjectScript()}
          originWhitelist={['*']}
          source={{
            html: playerHTML,
          }}
          style={styles.container}
          ref={playerRef}
          onMessage={handleOnMessage}
        />
      </View>
      <View style={styles.container}>
        <WebView
          style={styles.container}
          originWhitelist={['*']}
          source={{
            uri: `https://www.twitch.tv/embed/${stream}/chat`,
          }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
      </View>
    </View>
  );
};

export default Dashboard;
