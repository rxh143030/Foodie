import {StyleSheet, Dimensions} from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  homeButtonContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 100,
  },
  randomButton: {
    padding: 60,
    borderRadius: 100,
    backgroundColor: '#D9D9D9',
  },
  overlay: {
    position: 'absolute',
    top: 75,
    zIndex: 2,
    padding: 10,
    borderRadius: 15,

    width: Dimensions.get('window').width - 35,
    height: Dimensions.get('window').height - 150,
    backgroundColor: '#FF6A5B'
  },
  exitOverlay: {
    alignItems: 'flex-end',
    marginBottom: 5,
  },
  refreshOverlay: {
  },
  resultOverlay: {

  }
});
