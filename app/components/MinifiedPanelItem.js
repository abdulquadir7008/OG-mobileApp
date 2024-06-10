import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { 
    Dimensions, 
    Image, 
    Platform, 
    StyleSheet, 
    Text, 
    TouchableHighlight, 
    View,
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
    const containerStyles = [styles.container, styles.containerWrapper];
    const textStyles = [{ display: 'flex' }, { flexDirection: 'row' }];
    const titleStyles = [styles.title];
    const subTitleTextStyles = [styles.subtext];
    const imageStyles = [styles.image, styles.imageRecent];
    const contentWrapperStyle = [styles.contentWrapper];
    const contentStyle = [styles.contentStyle];
    const site = "https://opengovasiatest.com";
    const imageUrl = props._embedded['wp:featuredmedia'][0].media_details.sizes.medium_large.source_url && props._embedded['wp:featuredmedia'][0].media_details.sizes.medium_large.source_url;
    // const postDescription = props.content.rendered;
    // const { width } = useWindowDimensions();
    // console.log(postDescription)
    const navigation = useNavigation();
    const handlePostPress = (postId) => {
        // Navigate to the post details screen when a post is pressed
        navigation.navigate('Review', { postId });
    };

    const decodedData = postTitle.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec));
    return (
        <View style={containerStyles}>
            <TouchableHighlight style={styles.imageWrapper} onPress={() => handlePostPress(props.id)}>
                <View>
                    <View style={contentWrapperStyle}>
                        <Image style={[imageStyles]} source={{ uri: site+imageUrl }} />
                        <View style={[contentStyle]}>
                            <View style={textStyles}>
                                <Text style={titleStyles}>{decodedData}</Text>
                                
                            </View>
                            <View style={textStyles}>
                                <Text style={subTitleTextStyles}>{authorName}</Text>
                            </View>
                            <View style={textStyles}>
                                <Text style={styles.dataFloat}>{postCreated}</Text>
                            </View>
                            <View>
                                {/* <RenderHTML style={titleStyles} contentWidth={width} source={{ postDescription }} />                                */}
                                {/* <Text style={titleStyles}>{postDescription}</Text> */}
                                {/* <WebView source={{html: postDescription}} /> */}
                            </View>
                        </View>                        
                    </View>                    
                </View>
            </TouchableHighlight>
        </View>
    );
};
PanelItem.defaultProps = defaultProps;

const MIN_HEIGHT = 200;
const font = Platform.OS === 'ios' ? 'HelveticaNeue' : 'Roboto';

const styles = StyleSheet.create({
    container: {
        borderRadius: 8, 
        backgroundColor: "#fff",
        borderRadius: 4,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    contentWrapper: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: "#fff",
    },
    imageWrapper: {
        height: 'auto',
    },
    imageWrapperModified: {
        height: 'auto'
    },
    containerWrapper: {
        backgroundColor: "#fff",
    },
    imageContainer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
    },
    image: {
        height: MIN_HEIGHT,
        borderRadius: 4,
    },
    imageOverrided: {
        height: 100
    },
    info: {
        justifyContent: "center", flex: 1,
        paddingTop: 8
    },
    context: {
        color: '#D66215',
        marginBottom: 4,
        fontSize: 14,
        fontWeight: '400',
        fontFamily: font,
    },
    title: {
        fontSize: 15,
        fontWeight: '500',
        fontFamily: font,
        color: '#363434',
        marginBottom: 6,
        flex: 1,
    },
    subtext: {
        fontSize: 12,
        fontWeight: '400',
        fontFamily: font,
        color: '#333',
        marginRight: 5,
        marginBottom:3,
    },
    overlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: "flex-end",
        borderRadius: 8,
    },
    columns: {
        flexDirection: "row",
        alignItems: "center"
    },
    imageRecent: {
        height: MIN_HEIGHT / 2,
        width: '40%',
        margin:5
    },
    contentStyle: {
        width: '60%',
        paddingLeft: 5,
        paddingRight: 5
    },
    dataFloat:{
        textAlign:'right',
        fontSize: 12,
        fontWeight: '400',
        fontFamily: font,
        color: '#333',
    }
 
});