import Menu, { MenuItem } from 'react-native-material-menu';
import React, { } from 'react';
const { ViewPropTypes, Platform } = ReactNative = require('react-native');
const PropTypes = require('prop-types');
const createReactClass = require('create-react-class');
const {
 StyleSheet,
 Text,
 View,
 Animated,
 Dimensions
} = ReactNative;
const Button = require('./Button');
const { text } = require('cheerio/lib/static');
 
 
const screenHeight = Math.round(Dimensions.get('window').height);
const heightRatio = screenHeight / 740;
 
const screenWidth = Math.round(Dimensions.get('window').width);
const widthRatio = screenWidth / 360;
 
const DefaultTabBar = createReactClass({
 propTypes: {
   goToPage: PropTypes.func,
   activeTab: PropTypes.number,
   tabs: PropTypes.array,
   backgroundColor: PropTypes.string,
   activeTextColor: PropTypes.string,
   inactiveTextColor: PropTypes.string,
   textStyle: Text.propTypes.style,
   tabStyle: ViewPropTypes.style,
   renderTab: PropTypes.func,
   underlineStyle: ViewPropTypes.style,
 },
 getDefaultProps() {
   return {
     activeTextColor: 'navy',
     inactiveTextColor: 'black',
     backgroundColor: null,
   };
 },
 renderTabOption(name, page) {
 },
 
 processMoreAction(page, MENU_REF, showMenu) {
   showMenu();
 },
 
 renderTab(name, page, isTabActive, onPressHandler) {
   const { activeTextColor, inactiveTextColor, textStyle, showMenu, menuBar = () => { }, moreTabs, moreTabsStyle, itemStyle, tabClicked = () => { } } = this.props;
   const textColor = isTabActive ? activeTextColor : inactiveTextColor;
   const fontWeight = isTabActive ? 'bold' : 'normal';
   const containerWidth = this.props.containerWidth;
   const numberOfTabs = this.props.tabs.length;
   const MENU_REF = React.createRef();
   const tabUnderlineStyle = {
     position: 'absolute',
     width: containerWidth / numberOfTabs,
     height: 4,
     backgroundColor: 'navy',
     bottom: 0,
   };
   return <Button
     style={{ flex: 1, }}
     key={name}
     accessible={true}
     accessibilityLabel={name}
     accessibilityTraits='button'
     onPress={() => {
       if (name === '...') {
         this.processMoreAction(page, MENU_REF, showMenu)
 
       } else {
         onPressHandler(page)
         tabClicked(name);
       }
 
     }
 
     }
   >
     <View style={[styles.tab, this.props.tabStyle,]}>
       {name === '...' ? (<View
       >
         <Text style={[{ color: textColor, fontWeight, textAlign: "center", height: Platform.OS === 'android' ? 50 * heightRatio : 43 * heightRatio }, textStyle, { fontSize: name === '...' ? 30 : 14 }]}>
           {name}
         </Text>
       </View>
       ) : (<Text style={[{ color: textColor, fontWeight }, textStyle, { fontSize: name === '...' ? 30 : 14 }]}>
         {name}
       </Text>)
       }
       {menuBar(moreTabs, moreTabsStyle, itemStyle, onPressHandler, page)}
       {isTabActive && <View
         style={[
           tabUnderlineStyle,
           this.props.underlineStyle,
         ]}
       />}
     </View>
   </Button>;
 },
 render() {
   return (
     <View style={[styles.tabs, { backgroundColor: this.props.backgroundColor, }, this.props.style,]}>
       {this.props.tabs.map((name, page) => {
         const isTabActive = this.props.activeTab === page;
         const renderTab = this.props.renderTab || this.renderTab;
         return renderTab(name, page, isTabActive, this.props.goToPage);
       })}
     </View>
   );
 },
});
const styles = StyleSheet.create({
 tab: {
   flex: 1,
   alignItems: 'center',
   justifyContent: 'center',
   paddingBottom: 10,
 },
 tabs: {
   height: 50,
   flexDirection: 'row',
   justifyContent: 'space-around',
   borderWidth: 1,
   borderTopWidth: 0,
   borderLeftWidth: 0,
   borderRightWidth: 0,
   borderColor: '#ccc',
 },
});
module.exports = DefaultTabBar;

