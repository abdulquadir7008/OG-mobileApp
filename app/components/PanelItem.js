import { useNavigation } from '@react-navigation/native';
import React from 'react';
import HTML from 'react-native-render-html';
import { 
    Dimensions, 
    Image, 
    Platform, 
    StyleSheet, 
    Text, 
    TouchableHighlight, 
    View 
} from 'react-native';
export const windowWidth = Dimensions.get('window').width;
export const dividerColor = StyleSheet.hairlineWidth < 1 ? '#bcbbc1' : 'rgba(0, 0, 0, 0.12)';
export const dividerStyle = {
    borderBottomWidth: StyleSheet.hairlineWidth, 
    borderColor:dividerColor
};

let defaultProps = {
    style: {},
    imageStyle: {},
    infoStyle: {},
    contextStyle: {},
    titleStyle: {},
    subtextStyle: {},
    size: null,
    horizontal: false,
    right: false,
    grid: false,
    wrapper: false
};

export default function PanelItem(props) {
    const postTitle = props.title.rendered;
    const postCreated = new Date(props.date).toDateString();
    const authorName = props._embedded.author[0].name;
    const containerStyles = [styles.containerWrapper];
    const wrapperStyles = [{ height: 300}];
    const textStyles = [{ display: 'flex' }, { flexDirection: 'row' }];
    const titleStyles = [styles.title];
    const subTitleTextStyles = [styles.subtext];
    const imageContainerStyles = [styles.imageContainer];
    const imageStyles = [styles.image];
    const site = "https://opengovasiatest.com";
    const imageUrl = props._embedded['wp:featuredmedia'][0].media_details.sizes.medium_large.source_url && props._embedded['wp:featuredmedia'][0].media_details.sizes.medium_large.source_url;
    const navigation = useNavigation();
    const handlePostPress = (postId) => {
        // Navigate to the post details screen when a post is pressed
        navigation.navigate('Review', { postId });
    };
    return (
        <View style={containerStyles}>
            <TouchableHighlight onPress={() => handlePostPress(props.id)}>
                <View style={wrapperStyles}>
                    <View style={[imageContainerStyles]}>
                        <Image style={[imageStyles]} source={{ uri: site+imageUrl }} />

                        <View style={styles.overlapContent}>
                            <View style={textStyles}>
                                <Text style={titleStyles}>{postTitle}</Text>
                            </View>
                        </View>
                        <View style={textStyles}>

                            <Text style={subTitleTextStyles}>{authorName}</Text>
                            <Text style={subTitleTextStyles}>{'-'}</Text>
                            <Text style={subTitleTextStyles}>{postCreated}</Text>
                        </View>                        
                    </View>                    
                </View>
            </TouchableHighlight>
        </View>
    );
};
PanelItem.defaultProps = defaultProps;

const MIN_HEIGHT = 250;
const font = Platform.OS === 'ios' ? 'HelveticaNeue' : 'Roboto';

const styles = StyleSheet.create({
    containerWrapper: {
        position:'relative',
    },
    imageContainer: {
        margin:3,
        borderRadius: 4,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        padding:3,
        
    },
    image: {
        height: MIN_HEIGHT,
        marginBottom: 0,
        borderRadius: 3,
        overflow:'hidden'
        
    },
    title: {
        fontSize: 25,
        fontFamily: font,
        color: '#fff',
        marginBottom: 6,
        flex: 1,
        fontWeight:'bold',
        lineHeight:35
    },
    subtext: {
        fontSize: 13,
        fontWeight: '400',
        fontFamily: font,
        color: '#333',
        marginRight: 5,
        padding:8,
    },
    overlapContent:{
        position:'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        width:'99%',
        left:4,
        right:0,
        bottom:40,
        padding:20,
    },
    contentBoxShadow:{
        borderRadius: 8,
        elevation: 5, // Adjust the elevation for the desired shadow effect
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    }
});